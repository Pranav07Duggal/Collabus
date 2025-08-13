"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, ChevronDown, Trash2, GripVertical } from "lucide-react"
import type { Block } from "./block-editor"

interface BlockItemProps {
  block: Block
  index: number
  totalBlocks: number
  onUpdate: (id: string, updates: Partial<Block>) => void
  onDelete: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
}

export function BlockItem({ block, index, totalBlocks, onUpdate, onDelete, onMove }: BlockItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getBlockTypeLabel = (type: Block["type"]) => {
    switch (type) {
      case "h1":
        return "Heading 1"
      case "h2":
        return "Heading 2"
      case "paragraph":
        return "Paragraph"
      case "quote":
        return "Quote"
      case "code":
        return "Code Block"
      case "image":
        return "Image"
      case "divider":
        return "Divider"
      default:
        return type
    }
  }

  const getBlockTypeColor = (type: Block["type"]) => {
    switch (type) {
      case "h1":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "h2":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "paragraph":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "quote":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "code":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "image":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "divider":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const renderEditor = () => {
    switch (block.type) {
      case "h1":
      case "h2":
        return (
          <Input
            placeholder={`Enter ${block.type === "h1" ? "main" : "sub"} heading...`}
            value={block.content}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
            className="font-semibold text-lg"
          />
        )
      case "paragraph":
        return (
          <Textarea
            placeholder="Enter paragraph content..."
            value={block.content}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
            className="min-h-[100px] resize-none"
          />
        )
      case "quote":
        return (
          <Textarea
            placeholder="Enter quote text..."
            value={block.content}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
            className="min-h-[80px] resize-none italic"
          />
        )
      case "code":
        return (
          <Textarea
            placeholder="Enter code..."
            value={block.content}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
            className="min-h-[120px] resize-none font-mono text-sm"
          />
        )
      case "image":
        return (
          <div className="space-y-3">
            <Input
              placeholder="Enter image URL..."
              value={block.imageUrl || ""}
              onChange={(e) => onUpdate(block.id, { imageUrl: e.target.value })}
            />
            <Input
              placeholder="Enter image caption (optional)..."
              value={block.content}
              onChange={(e) => onUpdate(block.id, { content: e.target.value })}
            />
            {block.imageUrl && (
              <div className="relative">
                <img
                  src={block.imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded border"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            )}
          </div>
        )
      case "divider":
        return (
          <div className="py-4 text-center text-muted-foreground">
            <div className="border-t border-dashed" />
            <span className="text-xs mt-2 block">Divider Block</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card ref={setNodeRef} style={style} className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="flex flex-col items-center gap-1 pt-2 cursor-grab active:cursor-grabbing opacity-50 group-hover:opacity-100 transition-opacity"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Badge className={`${getBlockTypeColor(block.type)} text-xs`}>{getBlockTypeLabel(block.type)}</Badge>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove(block.id, "up")}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove(block.id, "down")}
                  disabled={index === totalBlocks - 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(block.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Editor */}
            {renderEditor()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
