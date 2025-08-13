"use client"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  GradientHeader,
  CodingHeader,
  ResearchHeader,
  ProjectHeader,
  ReflectionHeader,
  ImageHeader,
  type HeaderType,
} from "./animated-headers"

interface HeaderSelectorProps {
  selectedHeader: HeaderType
  onHeaderChange: (header: HeaderType) => void
  imageUrl?: string
  onImageUrlChange?: (url: string) => void
}

const headerOptions = [
  { type: "gradient" as const, name: "Gradient", component: GradientHeader },
  { type: "coding" as const, name: "Coding", component: CodingHeader },
  { type: "research" as const, name: "Research", component: ResearchHeader },
  { type: "project" as const, name: "Project", component: ProjectHeader },
  { type: "reflection" as const, name: "Reflection", component: ReflectionHeader },
  { type: "image" as const, name: "Custom Image", component: ImageHeader },
]

export function HeaderSelector({ selectedHeader, onHeaderChange, imageUrl, onImageUrlChange }: HeaderSelectorProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Journal Header</Label>

      <div className="grid grid-cols-2 gap-3">
        {headerOptions.map((option) => {
          const HeaderComponent = option.component
          return (
            <div key={option.type} className="space-y-2">
              <Button
                variant={selectedHeader === option.type ? "default" : "outline"}
                size="sm"
                onClick={() => onHeaderChange(option.type)}
                className="w-full"
              >
                {option.name}
              </Button>
              <Card
                className={cn(
                  "overflow-hidden cursor-pointer transition-all py-0",
                  selectedHeader === option.type ? "ring-2 ring-primary" : "opacity-40",
                )}
              >
                <div className=" origin-top-left transform">
                  <HeaderComponent imageUrl={option.type === "image" ? imageUrl : undefined} title="Preview" />
                </div>
              </Card>
            </div>
          )
        })}
      </div>

      {selectedHeader === "image" && (
        <div className="space-y-2">
          <Label htmlFor="header-image">Header Image URL</Label>
          <Input
            id="header-image"
            placeholder="Enter image URL for header..."
            value={imageUrl || ""}
            onChange={(e) => onImageUrlChange?.(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}
