"use client"
import { Separator } from "@/components/ui/separator"
import type { Block } from "./block-editor"

interface BlockPreviewProps {
  blocks: Block[]
}

export function BlockPreview({ blocks }: BlockPreviewProps) {
  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "h1":
        return (
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {block.content || "Heading 1"}
          </h1>
        )
      case "h2":
        return (
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {block.content || "Heading 2"}
          </h2>
        )
      case "paragraph":
        return (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {block.content || "Your paragraph content will appear here..."}
          </p>
        )
      case "quote":
        return (
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {block.content || "Your quote will appear here..."}
          </blockquote>
        )
      case "code":
        return (
          <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted px-4 py-4">
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {block.content || "// Your code will appear here..."}
            </code>
          </pre>
        )
      case "image":
        return (
          <div className="my-6">
            {block.imageUrl ? (
              <div className="space-y-2">
                <img
                  src={block.imageUrl || "/placeholder.svg"}
                  alt={block.content || "Image"}
                  className="w-full rounded-lg border shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                  }}
                />
                {block.content && <p className="text-sm text-muted-foreground text-center italic">{block.content}</p>}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-lg border-2 border-dashed">
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p>Image will appear here</p>
                  {block.content && <p className="text-sm italic mt-1">{block.content}</p>}
                </div>
              </div>
            )}
          </div>
        )
      case "divider":
        return <Separator className="my-8" />
      default:
        return null
    }
  }

  if (blocks.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-lg font-semibold mb-2">Preview will appear here</h3>
        <p>Start adding content blocks to see your journal come to life!</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {blocks.map((block, index) => (
          <div key={block.id} className={index > 0 ? "mt-4" : ""}>
            {renderBlock(block)}
          </div>
        ))}
      </div>
    </div>
  )
}
