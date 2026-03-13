import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { ChevronRight, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG = {
  proposal: { label: "Proposal", className: "bg-amber-50 text-amber-700 border-amber-200" },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  in_progress: { label: "In Progress", className: "bg-blue-50 text-blue-700 border-blue-200" },
  delivered: { label: "Delivered", className: "bg-zinc-100 text-zinc-700 border-zinc-200" },
};

export default function ProjectCard({ project }) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.proposal;

  return (
    <Link
      to={createPageUrl("ProjectWorkspace") + `?id=${project.id}`}
      className="block group"
    >
      <div className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-zinc-900 group-hover:text-sky-600 transition-colors truncate">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-500">
              <User className="w-3.5 h-3.5" />
              <span className="truncate">{project.client_name || project.client_email}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors mt-1 flex-shrink-0" />
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100">
          <Badge variant="outline" className={`${status.className} text-xs font-medium`}>
            {status.label}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Clock className="w-3 h-3" />
            {format(new Date(project.updated_date || project.created_date), "MMM d, yyyy")}
          </div>
        </div>
      </div>
    </Link>
  );
}