"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Save } from "lucide-react"
import { BlockEditor, type Block } from "../components/block-editor/block-editor"
import { HeaderSelector } from "../components/journal-headers/header-selector"
import type { HeaderType } from "../components/journal-headers/animated-headers"
import { saveJournalToStorage, calculateReadTime, type StoredJournal } from "@/lib/journal-storage"
import { generateId } from "@/lib/utils"

const categories = ["Project", "Research", "Guide", "Reflection"]
const visibilityOptions = [
  { value: "public", label: "Public", description: "Anyone can see this journal" },
  { value: "connections", label: "Connections", description: "Only your connections can see this" },
  { value: "private", label: "Private", description: "Only you can see this journal" },
]

export default function CreateJournalView() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [blocks, setBlocks] = useState<Block[]>([])
  const [category, setCategory] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [headerType, setHeaderType] = useState<HeaderType>("gradient")
  const [headerImageUrl, setHeaderImageUrl] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)

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
    if (!title.trim()) {
      alert("Please enter a title for your journal")
      return
    }

    if (!category) {
      alert("Please select a category")
      return
    }

    const journalData: StoredJournal = {
      id: generateId(),
      title: title.trim(),
      blocks: blocks,
      category,
      visibility,
      tags,
      headerType,
      headerImageUrl: headerType === "image" ? headerImageUrl : undefined,
      author: {
        name: "Current User", // This would come from your auth system
        avatar: "/placeholder.svg?height=40&width=40",
        username: "currentuser",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: calculateReadTime(blocks),
      likes: 0,
      comments: 0,
      isLiked: false,
      content: JSON.stringify(blocks), // Serialize blocks for storage
    }

    // Save to localStorage
    saveJournalToStorage(journalData)

    // Redirect to journals page
    router.push("/journals")
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/journals"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journals
            </Link>
            <h1 className="text-3xl font-bold">Create New Journal</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-2 bg-muted/50"
            >
              <Eye className="w-4 h-4" />
              {isPreviewMode ? "Edit" : "Preview"}
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Publish
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
                <div className="text-xs text-muted-foreground mt-2">
                  Choose the category that best describes your journal
                </div>
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

                <div className="text-xs text-muted-foreground">Add tags to help others discover your journal</div>
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

            {/* Block Editor Tips */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Editor Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>• Drag blocks to reorder them</div>
                <div>• Use headings to structure your content</div>
                <div>• Add code blocks for technical examples</div>
                <div>• Include images to illustrate your points</div>
                <div>• Use quotes for important insights</div>
                <div>• Preview your content in real-time</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
