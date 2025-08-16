"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const phases = [
  { id: "all", label: "All Projects", count: 24 },
  {
    id: "idea/brainstorming",
    label: "💡 Idea",
    count: 8,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  { id: "planning", label: "📋 Planning", count: 3, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  {
    id: "designing architecture",
    label: "🏗️ Architecture",
    count: 2,
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  { id: "mvp", label: "⚡ MVP", count: 6, color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  { id: "testing/feedback", label: "🧪 Testing", count: 2, color: "bg-pink-500/10 text-pink-600 border-pink-500/20" },
  { id: "deployment/demo", label: "🚀 Deploy", count: 2, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  { id: "iteration", label: "🔄 Iteration", count: 1, color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" },
  { id: "LIVE", label: "✅ LIVE", count: 0, color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
]

const categories = [
  "All Categories",
  "Web Development",
  "Mobile Development",
  "AI/ML",
  "Data Science",
  "DevOps",
  "Blockchain",
  "IoT",
  "Game Development",
]

const techStack = [
  "All Tech",
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Django",
  "Flutter",
  "React Native",
]

interface ProjectsFiltersProps {
  onFiltersChange?: (filters: {
    phase: string
    category: string
    tech: string
    search: string
  }) => void
}

export function ProjectsFilters({ onFiltersChange }: ProjectsFiltersProps) {
  const [activePhase, setActivePhase] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedTech, setSelectedTech] = useState("All Tech")
  const [searchQuery, setSearchQuery] = useState("")

  const handleFilterChange = (
    newFilters: Partial<{
      phase: string
      category: string
      tech: string
      search: string
    }>,
  ) => {
    const updatedFilters = {
      phase: newFilters.phase ?? activePhase,
      category: newFilters.category ?? selectedCategory,
      tech: newFilters.tech ?? selectedTech,
      search: newFilters.search ?? searchQuery,
    }

    if (newFilters.phase !== undefined) setActivePhase(newFilters.phase)
    if (newFilters.category !== undefined) setSelectedCategory(newFilters.category)
    if (newFilters.tech !== undefined) setSelectedTech(newFilters.tech)
    if (newFilters.search !== undefined) setSearchQuery(newFilters.search)

    onFiltersChange?.(updatedFilters)
  }

  return (
    <div className="mb-8 space-y-4">
      {/* <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="pl-10"
        />
      </div> */}

      <div className="flex flex-wrap gap-4">
        <Select value={selectedCategory} onValueChange={(value) => handleFilterChange({ category: value })}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTech} onValueChange={(value) => handleFilterChange({ tech: value })}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {techStack.map((tech) => (
              <SelectItem key={tech} value={tech}>
                {tech}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {phases.map((phase) => (
          <Button
            key={phase.id}
            variant={phase.id === activePhase ? "default" : "outline"}
            size="sm"
            className={phase.id !== "all" && phase.id !== activePhase ? phase.color : ""}
            onClick={() => handleFilterChange({ phase: phase.id })}
          >
            {phase.label}
            <Badge variant="secondary" className="ml-2 text-xs">
              {phase.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  )
}
