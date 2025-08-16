"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Calendar, Plus, X, ExternalLink } from "lucide-react"

interface ProjectUpdateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: any
}

export function ProjectUpdateDialog({ open, onOpenChange, project }: ProjectUpdateDialogProps) {
  const [activeTab, setActiveTab] = useState("progress")
  const [formData, setFormData] = useState({
    phase: project.phase,
    progress: project.progress,
    recentUpdate: "",
    milestoneDate: "",
    milestoneDescription: "",
    resourceName: "",
    resourceUrl: "",
    techStack: project.techStack,
    resources: project.resources || [],
    updates: project.updates || [],
    milestones: project.milestones || [],
  })
  const [newTech, setNewTech] = useState("")

  const phases = [
    "idea/brainstorming",
    "planning",
    "designing architecture",
    "mvp",
    "testing/feedback",
    "deployment/demo",
    "iteration",
    "LIVE",
  ]

  const getAvailablePhases = () => {
    const currentPhaseIndex = phases.indexOf(project.phase)
    return phases.slice(currentPhaseIndex)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedProject = {
      ...project,
      phase: formData.phase,
      progress: formData.progress,
      techStack: formData.techStack,
      resources: formData.resources,
      updates: formData.recentUpdate
        ? [{ date: new Date().toLocaleDateString(), description: formData.recentUpdate }, ...formData.updates]
        : formData.updates,
      milestones:
        formData.milestoneDate && formData.milestoneDescription
          ? [...formData.milestones, { date: formData.milestoneDate, description: formData.milestoneDescription }]
          : formData.milestones,
    }

    console.log("[v0] Project update submitted:", updatedProject)

    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]")
    const updatedProjects = existingProjects.map((p: any) => (p.id === project.id ? updatedProject : p))

    if (!existingProjects.find((p: any) => p.id === project.id)) {
      updatedProjects.push(updatedProject)
    }

    localStorage.setItem("projects", JSON.stringify(updatedProjects))
    console.log("[v0] Projects saved to localStorage:", updatedProjects)

    onOpenChange(false)
    window.location.reload()
  }

  const addTechStack = () => {
    if (newTech && !formData.techStack.includes(newTech)) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTech],
      }))
      setNewTech("")
    }
  }

  const removeTechStack = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t:string) => t !== tech),
    }))
  }

  const addResource = () => {
    if (formData.resourceName && formData.resourceUrl) {
      const newResource = {
        name: formData.resourceName,
        url: formData.resourceUrl,
        id: Date.now().toString(),
      }
      setFormData((prev) => ({
        ...prev,
        resources: [...prev.resources, newResource],
        resourceName: "",
        resourceUrl: "",
      }))
    }
  }

  const removeResource = (resourceId: string) => {
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.filter((r: any) => r.id !== resourceId),
    }))
  }

  useEffect(() => {
    setFormData({
      phase: project.phase,
      progress: project.progress,
      recentUpdate: "",
      milestoneDate: "",
      milestoneDescription: "",
      resourceName: "",
      resourceUrl: "",
      techStack: project.techStack,
      resources: project.resources || [],
      updates: project.updates || [],
      milestones: project.milestones || [],
    })
  }, [project])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>Update your project's progress, timeline, resources, and milestones.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {[
              { id: "progress", label: "Progress & Phase" },
              { id: "updates", label: "Updates" },
              { id: "resources", label: "Resources" },
              { id: "milestones", label: "Milestones" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "progress" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phase">Project Phase</Label>
                  <Select
                    value={formData.phase}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, phase: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailablePhases().map((phase) => (
                        <SelectItem key={phase} value={phase}>
                          {phase}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, progress: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Current Progress</Label>
                <Progress value={formData.progress} className="h-3" />
                <p className="text-sm text-muted-foreground">{formData.progress}% complete</p>
              </div>

              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.techStack.map((tech:string) => (
                    <Badge key={tech} variant="outline" className="flex items-center gap-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechStack(tech)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechStack())}
                  />
                  <Button type="button" onClick={addTechStack} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "updates" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recentUpdate">Add Recent Update</Label>
                <Textarea
                  id="recentUpdate"
                  placeholder="Describe what you've accomplished recently..."
                  value={formData.recentUpdate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, recentUpdate: e.target.value }))}
                  rows={4}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Recent Updates</h4>
                {formData.updates.length > 0 ? (
                  formData.updates.slice(0, 5).map((update: any, index: number) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">{update.date}</p>
                        <p className="text-sm">{update.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No updates yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resourceName">Button Name</Label>
                  <Input
                    id="resourceName"
                    placeholder="e.g., GitHub"
                    value={formData.resourceName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, resourceName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resourceUrl">Resource Link</Label>
                  <Input
                    id="resourceUrl"
                    placeholder="github.com/xxxx.git"
                    value={formData.resourceUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, resourceUrl: e.target.value }))}
                  />
                </div>
              </div>

              <Button type="button" onClick={addResource} size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Current Resources</h4>
                <div className="space-y-2">
                  {formData.resources.length > 0 ? (
                    formData.resources.map((resource: any) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{resource.name}</span>
                          <span className="text-sm text-muted-foreground">{resource.url}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={resource.url.startsWith("http") ? resource.url : `https://${resource.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeResource(resource.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No resources added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="milestoneDate">Milestone Date</Label>
                  <Input
                    id="milestoneDate"
                    type="date"
                    value={formData.milestoneDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, milestoneDate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="milestoneDescription">Description</Label>
                  <Input
                    id="milestoneDescription"
                    placeholder="Milestone description"
                    value={formData.milestoneDescription}
                    onChange={(e) => setFormData((prev) => ({ ...prev, milestoneDescription: e.target.value }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Current Milestones</h4>
                {formData.milestones.length > 0 ? (
                  formData.milestones.map((milestone: any, index: number) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">{milestone.date}</p>
                        <p className="text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No milestones set yet.</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
