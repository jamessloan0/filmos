import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, MessageSquare, ThumbsUp, Presentation, X, CheckCheck } from "lucide-react";
import { format } from "date-fns";

const TYPE_CONFIG = {
  message: { icon: MessageSquare, color: "text-sky-400" },
  feedback: { icon: ThumbsUp, color: "text-orange-400" },
  proposal: { icon: Presentation, color: "text-purple-400" },
};

export default function NotificationHub({ user }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: () => base44.entities.Notification.filter({}, "-created_date", 50),
    enabled: !!user?.email,
    refetchInterval: 60000,
  });

  // Real-time updates
  useEffect(() => {
    if (!user?.email) return;
    const unsubscribe = base44.entities.Notification.subscribe((event) => {
      if (event.type === "create" && event.data?.recipient_email === user.email) {
        queryClient.setQueryData(["notifications", user.email], (old = []) => {
          return old.some(n => n.id === event.data.id) ? old : [event.data, ...old];
        });
      }
    });
    return unsubscribe;
  }, [user?.email, queryClient]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = async (id) => {
    await base44.entities.Notification.update(id, { read: true });
    queryClient.setQueryData(["notifications", user?.email], (old = []) =>
      old.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllRead = async () => {
    const unread = notifications.filter(n => !n.read);
    await Promise.all(unread.map(n => base44.entities.Notification.update(n.id, { read: true })));
    queryClient.setQueryData(["notifications", user?.email], (old = []) =>
      old.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <div className="relative px-3 py-1">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
      >
        <Bell className="w-4 h-4" />
        <span>Notifications</span>
        {unreadCount > 0 && (
          <span className="ml-auto bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="fixed left-64 top-0 h-full w-80 bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800 flex-shrink-0">
              <span className="text-sm font-semibold text-white">Notifications</span>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-16 text-center">
                  <Bell className="w-10 h-10 text-zinc-800 mx-auto mb-3" />
                  <p className="text-sm text-zinc-500">No notifications yet</p>
                  <p className="text-xs text-zinc-600 mt-1">You'll be notified of client activity here.</p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const conf = TYPE_CONFIG[notif.type] || TYPE_CONFIG.message;
                  const Icon = conf.icon;
                  return (
                    <div
                      key={notif.id}
                      onClick={() => markRead(notif.id)}
                      className={`flex gap-3 px-4 py-3.5 border-b border-zinc-800/60 hover:bg-zinc-900/60 transition-colors cursor-pointer ${!notif.read ? "bg-zinc-900/40" : ""}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className={`w-4 h-4 ${conf.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-zinc-200 leading-snug">{notif.title}</p>
                          {!notif.read && <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0 mt-1" />}
                        </div>
                        {notif.body && (
                          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{notif.body}</p>
                        )}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] text-zinc-600 font-medium">{notif.project_name}</span>
                          <span className="text-[10px] text-zinc-700">·</span>
                          <span className="text-[10px] text-zinc-600">{format(new Date(notif.created_date), "MMM d, h:mm a")}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}