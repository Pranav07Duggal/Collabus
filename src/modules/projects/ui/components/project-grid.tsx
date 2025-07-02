"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { ProjectSheetForm } from "./project-sheet-form";
import { ConfirmDialog } from "./confirm-dialog";
import { LikeButton } from "./like-button";
import GeneratedGradient from "@/components/generated-gradient";
import { GithubIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

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

interface ProjectGridProps {
  projects: ProjectsData[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectsData[]>>;
  deleteProject: {
    mutate: (data: { id: string }) => void;
  };
}

export function ProjectGrid({
  projects,
  setProjects,
  deleteProject,
}: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectsData | null>(
    null
  );
  const isMobile = useIsMobile();

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full">
        {projects.map((project) => {
          const cardContent = (
            <Card
              key={project.id}
              className="flex flex-col flex-1 border rounded-xl shadow max-w-sm h-auto max-h-65"
              onClick={() => {
                if (isMobile) setSelectedProject(project);
              }}
            >
              <CardHeader className="-m-4">
                <GeneratedGradient
                  seed={project.title}
                  className="object-cover flex justify-between "
                >
                  <h3 className="text-white text-lg font-semibold opacity-100 dark:text-gray-950">
                    {project.title}
                  </h3>
                  {project.visibility === "PUBLIC" && (
                    <LikeButton projectId={project.id} />
                  )}
                  <a href={project.githubUrl}>
                    <GithubIcon className="hover:size-10 duration-200 ease dark:text-gray-700" />
                  </a>
                </GeneratedGradient>
              </CardHeader>

              <CardContent className="space-y-2 p-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <Badge className="border-accent-foreground" variant="outline">
                  {project.visibility}
                </Badge>

                {project.skills?.length! > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.skills!.slice(0, 3).map((s) => (
                      <Badge key={s.name} className="bg-slate-600 text-sm dark:bg-emerald-300">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );

          return isMobile ? (
            cardContent
          ) : (
            <ContextMenu key={project.id}>
              <ContextMenuTrigger>{cardContent}</ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                <ContextMenuItem onSelect={(e) => e.preventDefault()} asChild>
                  <div className="w-full text-left">
                    <ProjectSheetForm
                      initialValues={project}
                      triggerButton={<div>Edit</div>}
                      onSuccess={(updated) =>
                        setProjects((prev) =>
                          prev.map((p) => (p.id === updated.id ? updated : p))
                        )
                      }
                    />
                  </div>
                </ContextMenuItem>

                <ContextMenuItem onSelect={(e) => e.preventDefault()} asChild>
                  <div className="w-full text-left text-red-600">
                    <ConfirmDialog
                      title="Delete Project"
                      description="Are you sure you want to delete this project? This action cannot be undone."
                      onConfirm={() => deleteProject.mutate({ id: project.id })}
                      triggerButton={<div>Delete</div>}
                    />
                  </div>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>

      {/* Drawer for mobile */}
      <Drawer
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DrawerContent className="p-4 space-y-1">
          <DrawerTitle className="font-bold text-black">
            {selectedProject?.title}
          </DrawerTitle>
          {selectedProject && (
            <>
              <ProjectSheetForm
                initialValues={selectedProject}
                triggerButton={
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                }
                onSuccess={(updated) => {
                  setProjects((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p))
                  );
                  setSelectedProject(null);
                }}
              />

              <ConfirmDialog
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
                onConfirm={() => {
                  deleteProject.mutate({ id: selectedProject.id });
                  setSelectedProject(null);
                }}
                triggerButton={
                  <Button variant="destructive" className="w-full">
                    Delete
                  </Button>
                }
              />
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
