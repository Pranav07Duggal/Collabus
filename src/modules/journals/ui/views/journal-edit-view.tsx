"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save } from "lucide-react"
import { BlockEditor, type Block } from "../components/block-editor/block-editor"
import { HeaderSelector } from "../components/journal-headers/header-selector"
import type { HeaderType } from "../components/journal-headers/animated-headers"
import {
  getJournalFromStorage,
  saveJournalToStorage,
  calculateReadTime,
  type StoredJournal,
} from "@/lib/journal-storage"

const categories = ["Project", "Research", "Guide", "Reflection"]
const visibilityOptions = [
  { value: "public", label: "Public", description: "Anyone can see this journal" },
  { value: "connections", label: "Connections", description: "Only your connections can see this" },
  { value: "private", label: "Private", description: "Only you can see this journal" },
]

export default function EditJournalView() {
  const params = useParams()
  const router = useRouter()
  const journalId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [journal, setJournal] = useState<StoredJournal | null>(null)
  const [title, setTitle] = useState("")
  const [blocks, setBlocks] = useState<Block[]>([])
  const [category, setCategory] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [headerType, setHeaderType] = useState<HeaderType>("gradient")
  const [headerImageUrl, setHeaderImageUrl] = useState("")

  useEffect(() => {
    const loadJournal = () => {
      const storedJournal = getJournalFromStorage(journalId)

      if (storedJournal) {
        setJournal(storedJournal)
        setTitle(storedJournal.title)
        setBlocks(storedJournal.blocks || [])
        setCategory(storedJournal.category)
        setVisibility(storedJournal.visibility)
        setTags(storedJournal.tags)
        setHeaderType(storedJournal.headerType || "gradient")
        setHeaderImageUrl(storedJournal.headerImageUrl || "")
      }

      setIsLoading(false)
    }

    loadJournal()
  }, [journalId])

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSave = () => {
    if (!journal) return

    if (!title.trim()) {
      alert("Please enter a title for your journal")
      return
    }

    if (!category) {
      alert("Please select a category")
      return
    }

    const updatedJournal: StoredJournal = {
      ...journal,
      title: title.trim(),
      blocks: blocks,
      category,
      visibility,
      tags,
      headerType,
      headerImageUrl: headerType === "image" ? headerImageUrl : undefined,
      updatedAt: new Date().toISOString(),
      readTime: calculateReadTime(blocks),
    }

    // Save to localStorage
    saveJournalToStorage(updatedJournal)

    // Redirect to journal detail page
    router.push(`/journals/${journalId}`)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Project":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Research":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Guide":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Reflection":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-6"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!journal) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link
            href="/journals"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journals
          </Link>

          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Journal Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The journal you're trying to edit doesn't exist or cannot be edited.
            </p>
            <Link href="/journals">
              <Button>Browse All Journals</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={`/journals/${journalId}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </Link>
            <h1 className="text-3xl font-bold">Edit Journal</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="mb-6 bg-muted/30">
              <CardHeader>
                <CardTitle>Journal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your journal title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg bg-background"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Block Editor */}
            <BlockEditor blocks={blocks} onChange={setBlocks} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Header Selection */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Header Style</CardTitle>
              </CardHeader>
              <CardContent>
                <HeaderSelector
                  selectedHeader={headerType}
                  onHeaderChange={setHeaderType}
                  imageUrl={headerImageUrl}
                  onImageUrlChange={setHeaderImageUrl}
                />
              </CardContent>
            </Card>

            {/* Category */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getCategoryColor(cat)} text-xs`}>{cat}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-background"
                  />
                  <Button size="sm" onClick={handleAddTag} disabled={!tagInput.trim()}>
                    Add
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Visibility */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visibilityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
