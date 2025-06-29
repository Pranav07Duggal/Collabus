"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LikeButton } from "../components/like-button";

type ProjectsData = {
  id: string;
  userId: string;
  title: string;
  description: string;
  githubUrl: string;
  visibility: "PUBLIC" | "PRIVATE" | "COMPETITION";
  createdAt: string;
  updatedAt: string;
};

interface MyProjectsClientProps {
  initialProjects: ProjectsData[];
}

export function MyProjectsView({ initialProjects }: MyProjectsClientProps) {
  const [projects, setProjects] = useState(initialProjects);

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">My Projects</h1>

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

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="destructive">Delete</Button>
                </div>
                {project.visibility === "PUBLIC" && (
  <LikeButton projectId={project.id} />
)}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
