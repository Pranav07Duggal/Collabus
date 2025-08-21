"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Trophy, Users, Target, Gift, Calendar, DollarSign, FileText, Shield } from "lucide-react"

interface Benefit {
  id: string
  icon: string
  title: string
  description: string
}

interface ContestFormData {
  title: string
  type: string
  startDate: string
  endDate: string
  registrationDeadline: string
  description: string
  shortDescription: string
  benefits: Benefit[]
  eligibility: string[]
  prizePool: string
  firstPrize: string
  secondPrize: string
  thirdPrize: string
  maxTeamSize: string
  minTeamSize: string
  rules: string[]
  tags: string[]
  difficultyLevel: string
  contactEmail: string
  organizerName: string
  organizerOrganization: string
  requiresApproval: boolean
  isPublic: boolean
}

const iconOptions = [
  { value: "trophy", label: "Trophy", icon: Trophy },
  { value: "users", label: "Users", icon: Users },
  { value: "target", label: "Target", icon: Target },
  { value: "gift", label: "Gift", icon: Gift },
  { value: "calendar", label: "Calendar", icon: Calendar },
  { value: "dollar-sign", label: "Dollar Sign", icon: DollarSign },
  { value: "file-text", label: "File Text", icon: FileText },
  { value: "shield", label: "Shield", icon: Shield },
]

export default function CreateContestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContestFormData>({
    title: "",
    type: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    description: "",
    shortDescription: "",
    benefits: [],
    eligibility: [],
    prizePool: "",
    firstPrize: "",
    secondPrize: "",
    thirdPrize: "",
    maxTeamSize: "4",
    minTeamSize: "1",
    rules: [],
    tags: [],
    difficultyLevel: "",
    contactEmail: "",
    organizerName: "",
    organizerOrganization: "",
    requiresApproval: false,
    isPublic: true,
  })

  const [newBenefit, setNewBenefit] = useState({ icon: "trophy", title: "", description: "" })
  const [newEligibility, setNewEligibility] = useState("")
  const [newRule, setNewRule] = useState("")
  const [newTag, setNewTag] = useState("")

  const handleInputChange = (field: keyof ContestFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addBenefit = () => {
    if (newBenefit.title && newBenefit.description) {
      const benefit: Benefit = {
        id: Date.now().toString(),
        icon: newBenefit.icon,
        title: newBenefit.title,
        description: newBenefit.description,
      }
      setFormData((prev) => ({ ...prev, benefits: [...prev.benefits, benefit] }))
      setNewBenefit({ icon: "trophy", title: "", description: "" })
    }
  }

  const removeBenefit = (id: string) => {
    setFormData((prev) => ({ ...prev, benefits: prev.benefits.filter((b) => b.id !== id) }))
  }

  const addEligibility = () => {
    if (newEligibility.trim()) {
      setFormData((prev) => ({ ...prev, eligibility: [...prev.eligibility, newEligibility.trim()] }))
      setNewEligibility("")
    }
  }

  const removeEligibility = (index: number) => {
    setFormData((prev) => ({ ...prev, eligibility: prev.eligibility.filter((_, i) => i !== index) }))
  }

  const addRule = () => {
    if (newRule.trim()) {
      setFormData((prev) => ({ ...prev, rules: [...prev.rules, newRule.trim()] }))
      setNewRule("")
    }
  }

  const removeRule = (index: number) => {
    setFormData((prev) => ({ ...prev, rules: prev.rules.filter((_, i) => i !== index) }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to contest listing or the newly created contest
    router.push("/contests")
  }

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find((opt) => opt.value === iconName)
    return iconOption ? iconOption.icon : Trophy
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/contests">
            <Button variant="ghost" className="mb-6 rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contests
            </Button>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Create New Contest</h1>
            <p className="text-muted-foreground text-lg">Set up your competition and engage with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Contest Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter contest title"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Contest Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select contest type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="ideathon">Ideathon</SelectItem>
                        <SelectItem value="kaggle-competition">Kaggle Competition</SelectItem>
                        <SelectItem value="design-challenge">Design Challenge</SelectItem>
                        <SelectItem value="coding-contest">Coding Contest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={formData.difficultyLevel}
                      onValueChange={(value) => handleInputChange("difficultyLevel", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Input
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      placeholder="Brief description for card display"
                      className="rounded-xl"
                      maxLength={100}
                      required
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {formData.shortDescription.length}/100 characters
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="rounded-xl"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline" className="rounded-xl bg-transparent">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Provide a detailed description of your contest..."
                    className="rounded-xl min-h-32"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Contest Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="registrationDeadline">Registration Deadline *</Label>
                    <Input
                      id="registrationDeadline"
                      type="datetime-local"
                      value={formData.registrationDeadline}
                      onChange={(e) => handleInputChange("registrationDeadline", e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Configuration */}
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="minTeamSize">Minimum Team Size</Label>
                    <Select
                      value={formData.minTeamSize}
                      onValueChange={(value) => handleInputChange("minTeamSize", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} {size === 1 ? "member" : "members"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
                    <Select
                      value={formData.maxTeamSize}
                      onValueChange={(value) => handleInputChange("maxTeamSize", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} {size === 1 ? "member" : "members"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prizes */}
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Prize Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="prizePool">Total Prize Pool *</Label>
                  <Input
                    id="prizePool"
                    value={formData.prizePool}
                    onChange={(e) => handleInputChange("prizePool", e.target.value)}
                    placeholder="e.g., $50,000"
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="firstPrize">1st Place Prize</Label>
                    <Input
                      id="firstPrize"
                      value={formData.firstPrize}
                      onChange={(e) => handleInputChange("firstPrize", e.target.value)}
                      placeholder="e.g., $25,000"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="secondPrize">2nd Place Prize</Label>
                    <Input
                      id="secondPrize"
                      value={formData.secondPrize}
                      onChange={(e) => handleInputChange("secondPrize", e.target.value)}
                      placeholder="e.g., $15,000"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="thirdPrize">3rd Place Prize</Label>
                    <Input
                      id="thirdPrize"
                      value={formData.thirdPrize}
                      onChange={(e) => handleInputChange("thirdPrize", e.target.value)}
                      placeholder="e.g., $10,000"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Contest Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Icon</Label>
                    <Select
                      value={newBenefit.icon}
                      onValueChange={(value) => setNewBenefit((prev) => ({ ...prev, icon: value }))}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <option.icon className="h-4 w-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Benefit Title</Label>
                    <Input
                      value={newBenefit.title}
                      onChange={(e) => setNewBenefit((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Cash Prizes"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Input
                      value={newBenefit.description}
                      onChange={(e) => setNewBenefit((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="e.g., Win up to $50,000"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <Button type="button" onClick={addBenefit} variant="outline" className="rounded-xl bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.benefits.map((benefit) => {
                    const IconComponent = getIconComponent(benefit.icon)
                    return (
                      <div key={benefit.id} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBenefit(benefit.id)}
                          className="h-8 w-8 p-0 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    value={newEligibility}
                    onChange={(e) => setNewEligibility(e.target.value)}
                    placeholder="Add eligibility requirement"
                    className="rounded-xl"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEligibility())}
                  />
                  <Button
                    type="button"
                    onClick={addEligibility}
                    variant="outline"
                    className="rounded-xl bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.eligibility.map((criterion, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <div className="flex-1">{criterion}</div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEligibility(index)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Contest Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    placeholder="Add contest rule"
                    className="rounded-xl"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRule())}
                  />
                  <Button type="button" onClick={addRule} variant="outline" className="rounded-xl bg-transparent">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.rules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <div className="flex-1">{rule}</div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRule(index)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organizer Information */}
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle>Organizer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="organizerName">Organizer Name *</Label>
                    <Input
                      id="organizerName"
                      value={formData.organizerName}
                      onChange={(e) => handleInputChange("organizerName", e.target.value)}
                      placeholder="Your name"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="organizerOrganization">Organization</Label>
                    <Input
                      id="organizerOrganization"
                      value={formData.organizerOrganization}
                      onChange={(e) => handleInputChange("organizerOrganization", e.target.value)}
                      placeholder="Your organization (optional)"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="contact@example.com"
                      className="rounded-xl"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1 rounded-xl bg-transparent"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-xl">
                {isSubmitting ? "Creating Contest..." : "Create Contest"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
