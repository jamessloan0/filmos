import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Loader2, Copy, Check, LayoutGrid, FileText, MessageSquare, Receipt, ThumbsUp, Presentation, Archive, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

import OverviewTab from "@/components/workspace/OverviewTab";
import FilesTab from "@/components/workspace/FilesTab";
import MessagesTab from "@/components/workspace/MessagesTab";
import InvoicesTab from "@/components/workspace/InvoicesTab";
import FeedbackTab from "@/components/workspace/FeedbackTab";
import ProposalTab from "@/components/workspace/ProposalTab";
import DeliverablesTab from "@/components/workspace/DeliverablesTab";

export default function ProjectWorkspace() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {
      base44.auth.redirectToLogin();
    });
  }, []);

  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const projects = await base44.entities.Project.filter({ id: projectId });
      return projects[0];
    },
    enabled: !!projectId,
  });

  const { data: files = [] } = useQuery({
    queryKey: ["files", projectId],
    queryFn: () => base44.entities.ProjectFile.filter({ project_id: projectId }, "-created_date"),
    enabled: !!projectId,
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", projectId],
    queryFn: () => base44.entities.Message.filter({ project_id: projectId }, "created_date"),
    enabled: !!projectId,
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices", projectId],
    queryFn: () => base44.entities.Invoice.filter({ project_id: projectId }, "-created_date"),
    enabled: !!projectId,
  });

  const { data: activities = [] } = useQuery({
    queryKey: ["activities", projectId],
    queryFn: () => base44.entities.Activity.filter({ project_id: projectId }, "-created_date"),
    enabled: !!projectId,
  });

  const { data: feedbackItems = [] } = useQuery({
    queryKey: ["feedback", projectId],
    queryFn: () => base44.entities.Feedback.filter({ project_id: projectId }, "-created_date"),
    enabled: !!projectId,
  });

  const { data: proposals = [] } = useQuery({
    queryKey: ["proposals", projectId],
    queryFn: () => base44.entities.Proposal.filter({ project_id: projectId }, "-created_date"),
    enabled: !!projectId,
  });

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ["files", projectId] });
    queryClient.invalidateQueries({ queryKey: ["messages", projectId] });
    queryClient.invalidateQueries({ queryKey: ["invoices", projectId] });
    queryClient.invalidateQueries({ queryKey: ["activities", projectId] });
    queryClient.invalidateQueries({ queryKey: ["feedback", projectId] });
    queryClient.invalidateQueries({ queryKey: ["proposals", projectId] });
    queryClient.invalidateQueries({ queryKey: ["project", projectId] });
  };

  const handleArchive = async () => {
    if (!window.confirm("Archive this project? It will be moved to the archived section.")) return;
    await base44.entities.Project.update(project.id, { archived: true });
    window.location.href = createPageUrl("Dashboard");
  };

  const handleStatusChange = async (newStatus) => {
    await base44.entities.Project.update(project.id, { status: newStatus });
    await base44.entities.Activity.create({
      project_id: projectId,
      type: "status_change",
      description: `Status changed to ${newStatus.replace("_", " ")}`,
      actor_name: user?.full_name || user?.email || "Filmmaker",
    });
    refreshAll();
  };

  const clientLink = project
    ? `${window.location.origin}${createPageUrl("ClientPortal")}?token=${project.access_token}`
    : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(clientLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loadingProject || !project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link
            to={createPageUrl("Dashboard")}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Projects
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button
            variant="outline"
            size="sm"
            onClick={handleArchive}
            className="rounded-lg text-zinc-500 hover:text-zinc-700"
          >
            <Archive className="w-3.5 h-3.5 mr-1.5" />
            Archive
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="rounded-lg"
          >
            {copied ? <Check className="w-3.5 h-3.5 mr-2" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
            {copied ? "Copied!" : "Copy Client Link"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white border border-zinc-100 shadow-sm p-1 mb-8 rounded-xl">
          <TabsTrigger value="overview" className="gap-2">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="files" className="gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Files</span>
            {files.length > 0 && (
              <span className="ml-1 text-[10px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded-full">
                {files.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="messages" className="gap-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Messages</span>
            {messages.length > 0 && (
              <span className="ml-1 text-[10px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded-full">
                {messages.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="invoices" className="gap-2">
            <Receipt className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Invoices</span>
            {invoices.length > 0 && (
              <span className="ml-1 text-[10px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded-full">
                {invoices.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-2">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Feedback</span>
            {feedbackItems.filter(f => f.decision === "pending").length > 0 && (
              <span className="ml-1 text-[10px] bg-sky-200 text-sky-700 px-1.5 py-0.5 rounded-full">
                {feedbackItems.filter(f => f.decision === "pending").length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="proposal" className="gap-2">
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Proposal</span>
          </TabsTrigger>
          <TabsTrigger value="deliverables" className="gap-2">
            <PackageCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Deliverables</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            project={project}
            activities={activities}
            onStatusChange={handleStatusChange}
            isClient={false}
          />
        </TabsContent>
        <TabsContent value="files">
          <FilesTab
            files={files}
            projectId={projectId}
            isClient={false}
            onFileUploaded={refreshAll}
          />
        </TabsContent>
        <TabsContent value="messages">
          <MessagesTab
            messages={messages}
            projectId={projectId}
            senderName={user?.full_name || user?.email || "Filmmaker"}
            senderType="filmmaker"
            onMessageSent={refreshAll}
          />
        </TabsContent>
        <TabsContent value="invoices">
          <InvoicesTab
            invoices={invoices}
            projectId={projectId}
            projectName={project.name}
            clientName={project.client_name}
            clientEmail={project.client_email}
            isClient={false}
            onInvoiceCreated={refreshAll}
            filmmakerName={user?.full_name || user?.email}
            filmmakerEmail={user?.email}
          />
        </TabsContent>
        <TabsContent value="feedback">
          <FeedbackTab
            feedbackItems={feedbackItems}
            projectId={projectId}
            isClient={false}
            onUpdated={refreshAll}
            files={files}
          />
        </TabsContent>
        <TabsContent value="proposal">
          <ProposalTab
            proposals={proposals}
            projectId={projectId}
            isClient={false}
            onUpdated={refreshAll}
          />
        </TabsContent>
        <TabsContent value="deliverables">
          <DeliverablesTab
            projectId={projectId}
            authorName={user?.full_name || user?.email || "Filmmaker"}
            authorType="filmmaker"
            isClient={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}