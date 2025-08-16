"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project
  isUserProject?: boolean
}

const phaseConfig = {
  "idea/brainstorming": {
    label: "💡 Idea",
    className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20",
  },
  planning: {
    label: "📋 Planning",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
  },
  "designing architecture": {
    label: "🏗️ Architecture",
    className: "bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500/20",
  },
  mvp: {
    label: "⚡ MVP",
    className: "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20",
  },
  "testing/feedback": {
    label: "🧪 Testing",
    className: "bg-pink-500/10 text-pink-600 border-pink-500/20 hover:bg-pink-500/20",
  },
  "deployment/demo": {
    label: "🚀 Deploy",
    className: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20",
  },
  iteration: {
    label: "🔄 Iteration",
    className: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 hover:bg-indigo-500/20",
  },
  LIVE: {
    label: "✅ LIVE",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20",
  },
}

export function ProjectCard({ project, isUserProject = false }: ProjectCardProps) {
  const router = useRouter()
  const phaseStyle = phaseConfig[project.phase]

  const handleClick = () => {
    router.push(`/projects/${project.id}`)
  }

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-md border-muted bg-background",
        isUserProject && "border-primary/20 bg-primary/5",
      )}
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.tagline}</p>
          </div>
          <Badge variant="outline" className={phaseStyle.className}>
            {phaseStyle.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.contributors.slice(0, 3).map((contributor, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-background">
                <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                  {contributor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.contributors.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">+{project.contributors.length - 3}</span>
              </div>
            )}
          </div>

          <div className="flex gap-1">
            {project.techStack.slice(0, 2).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 2 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                +{project.techStack.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
