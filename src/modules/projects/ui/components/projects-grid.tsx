"use client"

import { useMemo } from "react"
import { ProjectCard } from "./projects-card"
import { UserProjectsSection } from "./user-projects-section"

const mockProjects = [
  {
    id: "1",
    title: "AI-Powered Task Manager",
    tagline: "Smart productivity app with natural language processing",
    phase: "mvp" as const,
    progress: 75,
    contributors: [
      { name: "Alice Johnson", avatar: "/diverse-woman-portrait.png" },
      { name: "Bob Smith", avatar: "/thoughtful-man.png" },
    ],
    techStack: ["React", "Node.js", "OpenAI"],
    isOwner: true,
    category: "AI/ML",
  },
  {
    id: "2",
    title: "Sustainable Fashion Marketplace",
    tagline: "Connecting eco-conscious consumers with sustainable brands",
    phase: "idea/brainstorming" as const,
    progress: 25,
    contributors: [{ name: "Carol Davis", avatar: "/woman-2.png" }],
    techStack: ["Next.js", "Stripe", "PostgreSQL"],
    isOwner: true,
    category: "Web Development",
  },
  {
    id: "3",
    title: "Virtual Reality Learning Platform",
    tagline: "Immersive educational experiences for remote learning",
    phase: "LIVE" as const,
    progress: 100,
    contributors: [
      { name: "David Wilson", avatar: "/man-2.png" },
      { name: "Eva Brown", avatar: "/woman-2.png" },
      { name: "Frank Miller", avatar: "/thoughtful-man.png" },
    ],
    techStack: ["Unity", "WebXR", "Firebase"],
    isOwner: false,
    category: "Game Development",
  },
  {
    id: "4",
    title: "Blockchain Voting System",
    tagline: "Secure and transparent digital voting platform",
    phase: "testing/feedback" as const,
    progress: 60,
    contributors: [
      { name: "Grace Lee", avatar: "/woman-2.png" },
      { name: "Henry Taylor", avatar: "/thoughtful-man.png" },
    ],
    techStack: ["Solidity", "React", "Web3.js"],
    isOwner: false,
    category: "Blockchain",
  },
  {
    id: "5",
    title: "Mental Health Companion App",
    tagline: "AI-driven support for mental wellness and mindfulness",
    phase: "planning" as const,
    progress: 15,
    contributors: [{ name: "Ivy Chen", avatar: "/diverse-woman-portrait.png" }],
    techStack: ["Flutter", "TensorFlow", "Firebase"],
    isOwner: false,
    category: "Mobile Development",
  },
  {
    id: "6",
    title: "Smart Home Energy Manager",
    tagline: "IoT solution for optimizing household energy consumption",
    phase: "deployment/demo" as const,
    progress: 90,
    contributors: [
      { name: "Jack Robinson", avatar: "/thoughtful-man.png" },
      { name: "Kate Anderson", avatar: "/woman-2.png" },
    ],
    techStack: ["Python", "Raspberry Pi", "MQTT"],
    isOwner: false,
    category: "IoT",
  },
]

interface ProjectsGridProps {
  filters?: {
    phase: string
    category: string
    tech: string
    search: string
  }
  savedProjects?: any[]
}

export function ProjectsGrid({ filters, savedProjects = [] }: ProjectsGridProps) {
  const allProjects = useMemo(() => {
    const mergedProjects = [...mockProjects]

    // Update existing projects with saved data or add new ones
    savedProjects.forEach((savedProject) => {
      const existingIndex = mergedProjects.findIndex((p) => p.id === savedProject.id)
      if (existingIndex >= 0) {
        mergedProjects[existingIndex] = { ...mergedProjects[existingIndex], ...savedProject }
      } else {
        mergedProjects.push(savedProject)
      }
    })

    console.log("[v0] Merged projects data:", mergedProjects)
    return mergedProjects
  }, [savedProjects])

  const filteredProjects = useMemo(() => {
    if (!filters) return allProjects

    return allProjects.filter((project) => {
      // Phase filter
      if (filters.phase !== "all" && project.phase !== filters.phase) {
        return false
      }

      // Category filter
      if (filters.category !== "All Categories" && project.category !== filters.category) {
        return false
      }

      // Tech stack filter
      if (filters.tech !== "All Tech" && !project.techStack.includes(filters.tech)) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesTitle = project.title.toLowerCase().includes(searchLower)
        const matchesTagline = project.tagline.toLowerCase().includes(searchLower)
        const matchesTech = project.techStack.some((tech) => tech.toLowerCase().includes(searchLower))

        if (!matchesTitle && !matchesTagline && !matchesTech) {
          return false
        }
      }

      return true
    })
  }, [filters, allProjects])

  const userProjects = filteredProjects.filter((project) => project.isOwner)
  const otherProjects = filteredProjects.filter((project) => !project.isOwner)

  return (
    <div className="space-y-12">
      {userProjects.length > 0 && <UserProjectsSection projects={userProjects} />}

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          All Projects {filters && `(${filteredProjects.length} found)`}
        </h2>
        {otherProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
