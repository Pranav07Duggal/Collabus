"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LikeButton } from "../components/like-button";
import { ProjectSheetForm } from "../components/project-sheet-form";
// import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

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

const mockData = {

}



export function MyProjectsView({ initialProjects }: MyProjectsClientProps) {
  const trpc = useTRPC();
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState<ProjectsData | null>(null);

  const deleteProject = useMutation(
    trpc.projects.deleteProject.mutationOptions({
      onSuccess: () => {
        toast.success("Project deleted");
      },
      onError: (err) => toast.error(err.message),
    })
  );

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <ProjectSheetForm
          triggerButton={<Button>Add Project</Button>}
          onSuccess={(project) => setProjects((prev) => [project, ...prev])}
        />
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground text-sm">No projects added yet.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            
            <Card key={project.id} className="border rounded-xl shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="text-blue-600 underline text-sm"
                >
                  {project.githubUrl}
                </Link>

                <Badge variant="outline">{project.visibility}</Badge>

                {/* Tech tags */}
              
                {project.skills?.length! > 0 && (
  <div className="flex flex-wrap gap-2 pt-1">
    {project.skills!.slice(0, 5).map((s) => (
      <Badge key={s.name} className="bg-black text-sm text">{s.name}</Badge>
    ))}
  </div>
)}

                <div className="flex gap-2 pt-3">
                  <ProjectSheetForm
                    initialValues={project}
                    triggerButton={
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    }
                    onSuccess={(updated) =>
                      setProjects((prev) =>
                        prev.map((p) => (p.id === updated.id ? updated : p))
                      )
                    }
                  />

                  {/* <ConfirmDialog
                    title="Delete Project"
                    description="Are you sure you want to delete this project? This action cannot be undone."
                    onConfirm={() => deleteProject.mutate({ projectId: project.id })}
                    triggerButton={<Button size="sm" variant="destructive">Delete</Button>}
                  /> */}

                  {project.visibility === "PUBLIC" && (
                    <LikeButton projectId={project.id} />
                  )}
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
