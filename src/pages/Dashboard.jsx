import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, FolderOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/dashboard/ProjectCard";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {
      base44.auth.redirectToLogin();
    });
  }, []);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", user?.email],
    queryFn: () => base44.entities.Project.filter({ owner_email: user.email }, "-updated_date"),
    enabled: !!user?.email,
    initialData: [],
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Projects</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link to={createPageUrl("CreateProject")}>
          <Button className="bg-zinc-900 hover:bg-zinc-800">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
            <FolderOpen className="w-7 h-7 text-zinc-400" />
          </div>
          <h3 className="font-semibold text-zinc-700 mb-1">No projects yet</h3>
          <p className="text-sm text-zinc-400 mb-6 max-w-xs">
            Create your first project to start collaborating with your client.
          </p>
          <Link to={createPageUrl("CreateProject")}>
            <Button className="bg-zinc-900 hover:bg-zinc-800">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}