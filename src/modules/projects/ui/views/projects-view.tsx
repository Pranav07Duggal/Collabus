"use client"

import { useState, useEffect } from "react"
import { ProjectsGrid } from "../components/projects-grid"
import { ProjectsHeader } from "../components/projects-header"
import { ProjectsFilters } from "../components/projects-filter"

export default function ProjectsPage() {
  const [filters, setFilters] = useState({
    phase: "all",
    category: "All Categories",
    tech: "All Tech",
    search: "",
  })
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects)
      setProjects(parsedProjects)
      console.log("[v0] Loaded projects from localStorage:", parsedProjects)
    }
  }, [])

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ProjectsHeader onSearchChange={handleSearchChange} />
        <ProjectsFilters onFiltersChange={setFilters} />
        <ProjectsGrid filters={filters} savedProjects={projects} />
      </div>
    </div>
  )
}
