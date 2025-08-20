"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, ExternalLink, Github, BookOpen } from "lucide-react"

const mockHighlights = [
  {
    title: "E-Commerce Platform",
    type: "project",
    description:
      "Full-stack e-commerce solution built with Next.js, Stripe integration, and real-time inventory management. Features include user authentication, shopping cart, order tracking, and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    isWinner: true,
    award: "Best Commercial Application - TechCrunch Disrupt 2023",
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/alexjohnson/ecommerce-platform",
  },
  {
    title: "AI-Powered Task Manager",
    type: "project",
    description:
      "Intelligent task management application that uses machine learning to prioritize tasks and predict completion times. Built with React, Python backend, and integrated with multiple productivity tools.",
    technologies: ["React", "Python", "TensorFlow", "FastAPI", "MongoDB"],
    isWinner: false,
    liveUrl: "https://ai-taskmanager.com",
    githubUrl: "https://github.com/alexjohnson/ai-task-manager",
  },
  {
    title: "The Future of Web Development",
    type: "journal",
    description:
      "An in-depth exploration of emerging trends in web development, including the rise of edge computing, serverless architectures, and the impact of AI on developer workflows. Published in Tech Weekly.",
    technologies: ["Web Development", "Edge Computing", "AI", "Serverless"],
    isWinner: false,
    image: "/placeholder.svg?height=200&width=300",
    liveUrl: "https://techweekly.com/future-web-development",
  },
  {
    title: "Building Scalable React Applications",
    type: "journal",
    description:
      "A comprehensive guide to architecting large-scale React applications with best practices for state management, component design, and performance optimization. Featured in Developer's Digest.",
    technologies: ["React", "Architecture", "Performance", "Best Practices"],
    isWinner: true,
    award: "Editor's Choice - Developer's Digest 2023",
    image: "/placeholder.svg?height=200&width=300",
    liveUrl: "https://developersdigest.com/scalable-react-apps",
  },
]

export function ProjectsSection() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {mockHighlights.map((item, index) => (
            <div key={index} className="space-y-4 p-6 bg-muted/30 rounded-lg border border-border">
              {item.type === "journal" && (
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {item.isWinner && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-yellow-500 text-yellow-900 gap-1">
                        <Trophy className="h-3 w-3" />
                        Winner
                      </Badge>
                    </div>
                  )}
                </div>
              )}

              {/* Project/Journal Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  {item.type === "project" && item.isWinner && (
                    <Badge className="bg-yellow-500 text-yellow-900 gap-1">
                      <Trophy className="h-3 w-3" />
                      Winner
                    </Badge>
                  )}
                </div>

                {item.isWinner && item.award && <p className="text-sm text-primary font-medium">{item.award}</p>}

                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                      {item.type === "journal" ? (
                        <>
                          <BookOpen className="h-4 w-4" />
                          Read Article
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </>
                      )}
                    </a>
                  </Button>
                  {item.type === "project" && item.githubUrl && (
                    <Button variant="ghost" size="sm" className="gap-2" asChild>
                      <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
