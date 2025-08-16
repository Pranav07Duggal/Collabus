"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X, Lightbulb } from "lucide-react"
import { toast } from "sonner"
const categories = [
  "Web Development",
  "Mobile Development",
  "AI/ML",
  "Data Science",
  "DevOps",
  "Blockchain",
  "IoT",
  "Game Development",
  "Desktop Apps",
]

const techOptions = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Django",
  "Flask",
  "Node.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "Flutter",
  "React Native",
  "Swift",
  "Kotlin",
  "Java",
  "C++",
  "Go",
  "Rust",
]

export default function NewProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    problemStatement: "",
    impact: "",
    category: "",
    techStack: [] as string[],
    targetAudience: "",
    successMetrics: "",
    timeline: "",
    resources: "",
  })

  const [newTech, setNewTech] = useState("")

  const handleTechAdd = (tech: string) => {
    if (tech && !formData.techStack.includes(tech)) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, tech],
      }))
    }
    setNewTech("")
  }

  const handleTechRemove = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast("Project has been created", {
          description: "You can view it in Projects page",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })

    // Redirect to the new project (in real app, use the actual project ID)
    router.push("/projects/new-project-id")
  }

  const isFormValid =
    formData.title &&
    formData.tagline &&
    formData.problemStatement &&
    formData.impact &&
    formData.category &&
    formData.techStack.length > 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </div>

        {/* Page Title */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create New Project</h1>
              <p className="text-muted-foreground">Start your ideation phase by filling out the details below</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your project title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline *</Label>
                <Input
                  id="tagline"
                  placeholder="A brief one-liner describing your project"
                  value={formData.tagline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Problem & Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Problem & Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problemStatement">Problem Statement *</Label>
                <Textarea
                  id="problemStatement"
                  placeholder="What problem does your project solve? Be specific about the pain points."
                  value={formData.problemStatement}
                  onChange={(e) => setFormData((prev) => ({ ...prev, problemStatement: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact">Expected Impact *</Label>
                <Textarea
                  id="impact"
                  placeholder="What positive change will your project bring? Who will benefit and how?"
                  value={formData.impact}
                  onChange={(e) => setFormData((prev) => ({ ...prev, impact: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="Who is your primary target audience?"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tech Stack *</Label>
                <div className="flex gap-2">
                  <Select value={newTech} onValueChange={setNewTech}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select technologies" />
                    </SelectTrigger>
                    <SelectContent>
                      {techOptions
                        .filter((tech) => !formData.techStack.includes(tech))
                        .map((tech) => (
                          <SelectItem key={tech} value={tech}>
                            {tech}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={() => handleTechAdd(newTech)}
                    disabled={!newTech || formData.techStack.includes(newTech)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleTechRemove(tech)}
                      >
                        {tech} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Planning Details */}
          <Card>
            <CardHeader>
              <CardTitle>Planning Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="successMetrics">Success Metrics</Label>
                <Textarea
                  id="successMetrics"
                  placeholder="How will you measure the success of your project?"
                  value={formData.successMetrics}
                  onChange={(e) => setFormData((prev) => ({ ...prev, successMetrics: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Estimated Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., 3 months, 6 weeks"
                  value={formData.timeline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resources">Required Resources</Label>
                <Textarea
                  id="resources"
                  placeholder="What resources, tools, or help do you need to complete this project?"
                  value={formData.resources}
                  onChange={(e) => setFormData((prev) => ({ ...prev, resources: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? "Creating Project..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
