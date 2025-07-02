"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { ProjectSheetForm } from "../components/project-sheet-form";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import NoProjects from "../components/no-project";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProjectGrid } from "../components/project-grid";

type ProjectsData = {
  id: string;
  userId: string;
  title: string;
  description: string;
  githubUrl: string;
  visibility: "PUBLIC" | "PRIVATE" | "COMPETITION";
  createdAt: string;
  updatedAt: string;
  skills?: { name: string }[]; // tech stack
};

interface MyProjectsClientProps {
  initialProjects: ProjectsData[];
}

export function MyProjectsView({ initialProjects }: MyProjectsClientProps) {
  const trpc = useTRPC();
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState<ProjectsData | null>(
    null
  );
  const isMobile = useIsMobile();
  const deleteProject = useMutation(
    trpc.projects.deleteProject.mutationOptions({
      onSuccess: () => {
        toast.success("Project deleted");
      },
      onError: (err) => toast.error(err.message),
    })
  );

  return (
    <div className="space-y-6 p-4 w-full h-full mx-auto">
      <h1 className="text-2xl font-medium">My Projects</h1>
      <ProjectSheetForm
        triggerButton={
          <Button className="capitalize">
            <PlusIcon />
            {projects.length === 0
              ? `add your first project`
              : `Add New Project`}
          </Button>
        }
        onSuccess={(project) => setProjects((prev) => [project, ...prev])}
      />

      {projects.length === 0 ? (
        <>
          <NoProjects />
        </>
      ) : (
        <ProjectGrid
          projects={projects}
          setProjects={setProjects}
          deleteProject={deleteProject}
        />
      )}
    </div>
  );
}