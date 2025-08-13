"use client"

import { useState, useCallback } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { BlockItem } from "./block-item"
import { BlockPreview } from "./block-preview"
import { generateId } from "@/lib/utils"

export interface Block {
  id: string
  type: "h1" | "h2" | "paragraph" | "quote" | "code" | "image" | "divider"
  content: string
  imageUrl?: string
}

interface BlockEditorProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

const blockTypes = [
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "paragraph", label: "Paragraph" },
  { value: "quote", label: "Quote" },
  { value: "code", label: "Code Block" },
  { value: "image", label: "Image" },
  { value: "divider", label: "Divider" },
]

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [selectedBlockType, setSelectedBlockType] = useState<string>("paragraph")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const addBlock = useCallback(
    (type: Block["type"]) => {
      const newBlock: Block = {
        id: generateId(),
        type,
        content: type === "divider" ? "" : "",
        ...(type === "image" && { imageUrl: "" }),
      }
      onChange([...blocks, newBlock])
    },
    [blocks, onChange],
  )

  const updateBlock = useCallback(
    (id: string, updates: Partial<Block>) => {
      onChange(blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)))
    },
    [blocks, onChange],
  )

  const deleteBlock = useCallback(
    (id: string) => {
      onChange(blocks.filter((block) => block.id !== id))
    },
    [blocks, onChange],
  )

  const moveBlock = useCallback(
    (id: string, direction: "up" | "down") => {
      const index = blocks.findIndex((block) => block.id === id)
      if (index === -1) return

      const newIndex = direction === "up" ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= blocks.length) return

      const newBlocks = [...blocks]
      ;[newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]]
      onChange(newBlocks)
    },
    [blocks, onChange],
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id)
      const newIndex = blocks.findIndex((block) => block.id === over.id)

      onChange(arrayMove(blocks, oldIndex, newIndex))
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto">
      {/* Editor Panel */}
      <Card className="flex flex-col max-h-[1500px] h-auto min-h-[100px]">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Content Editor</CardTitle>
          <div className="flex gap-2">
            <Select value={selectedBlockType} onValueChange={setSelectedBlockType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select block type" />
              </SelectTrigger>
              <SelectContent>
                {blockTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => addBlock(selectedBlockType as Block["type"])}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Block
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 p-0">
          <div className="max-h-[1330px] overflow-y-auto min-h-[600px] h-auto">
            {blocks.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <div className="mb-4">No content blocks yet</div>
                <Button
                  onClick={() => addBlock("paragraph")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Block
                </Button>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2 p-4">
                    {blocks.map((block, index) => (
                      <BlockItem
                        key={block.id}
                        block={block}
                        index={index}
                        totalBlocks={blocks.length}
                        onUpdate={updateBlock}
                        onDelete={deleteBlock}
                        onMove={moveBlock}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <Card className="flex flex-col max-h-[1500px] h-auto min-h-[400px]">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Live Preview</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 p-0">
          <div className="max-h-[600px] overflow-y-auto">
            <BlockPreview blocks={blocks} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
