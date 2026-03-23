import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { event, data, old_data } = body;

    const entityName = event?.entity_name;
    const eventType = event?.type;

    console.log(`notificationHandler: ${entityName} ${eventType}`);

    if (!entityName || !eventType || !data) {
      return Response.json({ skipped: 'missing payload' });
    }

    const getProject = async (projectId) => {
      const projects = await base44.asServiceRole.entities.Project.filter({ id: projectId });
      return projects[0] || null;
    };

    const getSettings = async (projectId, ownerEmail) => {
      const settings = await base44.asServiceRole.entities.NotificationSettings.filter({
        project_id: projectId,
        user_email: ownerEmail
      });
      return settings[0] || null;
    };

    const createNotification = async (project, type, title, bodyText) => {
      await base44.asServiceRole.entities.Notification.create({
        project_id: project.id,
        project_name: project.name,
        type,
        title,
        body: bodyText || '',
        read: false,
        recipient_email: project.owner_email,
      });
      console.log(`Notification created: [${type}] ${title} → ${project.owner_email}`);
    };

    // --- Message created ---
    if (entityName === 'Message' && eventType === 'create') {
      if (data.sender_type !== 'client') return Response.json({ skipped: 'filmmaker message' });

      const project = await getProject(data.project_id);
      if (!project) return Response.json({ skipped: 'project not found' });

      const settings = await getSettings(data.project_id, project.owner_email);
      if (settings && settings.notify_on_message === false) return Response.json({ skipped: 'disabled' });

      await createNotification(project, 'message',
        `New message from ${data.sender_name}`,
        data.content?.substring(0, 120)
      );
    }

    // --- Feedback updated (client responded) ---
    else if (entityName === 'Feedback' && eventType === 'update') {
      const wasChanged = old_data?.decision === 'pending' && data.decision && data.decision !== 'pending';
      if (!wasChanged) return Response.json({ skipped: 'no decision change' });

      const project = await getProject(data.project_id);
      if (!project) return Response.json({ skipped: 'project not found' });

      const settings = await getSettings(data.project_id, project.owner_email);
      if (settings && settings.notify_on_feedback === false) return Response.json({ skipped: 'disabled' });

      const verb = data.decision === 'approved' ? 'approved' : 'requested changes on';
      await createNotification(project, 'feedback',
        `${data.client_name || 'Client'} ${verb} "${data.title}"`,
        data.client_note || ''
      );
    }

    // --- Proposal updated (client responded) ---
    else if (entityName === 'Proposal' && eventType === 'update') {
      const clientStatuses = ['approved', 'changes_requested'];
      const wasClientResponse = old_data?.status === 'sent' && clientStatuses.includes(data.status);
      if (!wasClientResponse) return Response.json({ skipped: 'not client response' });

      const project = await getProject(data.project_id);
      if (!project) return Response.json({ skipped: 'project not found' });

      const settings = await getSettings(data.project_id, project.owner_email);
      if (settings && settings.notify_on_proposal === false) return Response.json({ skipped: 'disabled' });

      const verb = data.status === 'approved' ? 'approved' : 'requested changes on';
      await createNotification(project, 'proposal',
        `${data.client_name || 'Client'} ${verb} proposal "${data.title}"`,
        data.client_decision || ''
      );
    }

    else {
      return Response.json({ skipped: `unhandled: ${entityName} ${eventType}` });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('notificationHandler error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});