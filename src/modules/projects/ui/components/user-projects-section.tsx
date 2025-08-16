import { ProjectCard } from "./projects-card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import type { Project } from "../../types"

interface UserProjectsSectionProps {
  projects: Project[]
}

export function UserProjectsSection({ projects }: UserProjectsSectionProps) {
  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-muted">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Your Projects</h2>
          <p className="text-muted-foreground text-sm">Projects you're currently working on</p>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isUserProject />
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Plus className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No projects yet</p>
              <p className="text-sm">Start your first project to see it here</p>
            </div>
            <Button>Create Project</Button>
          </div>
        )}
      </div>
    </div>
  )
}
