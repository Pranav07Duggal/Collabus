"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Instagram } from "lucide-react"

interface SocialsData {
  github: string
  linkedin: string
  instagram: string
}

interface EditSocialsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  socials: SocialsData
  onSave: (socials: SocialsData) => void
}

export function EditSocialsDialog({ open, onOpenChange, socials, onSave }: EditSocialsDialogProps) {
  const [formData, setFormData] = useState(socials)

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
  }

  const handleChange = (field: keyof SocialsData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Social Links</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub Username
            </Label>
            <Input
              id="github"
              value={formData.github}
              onChange={(e) => handleChange("github", e.target.value)}
              placeholder="your-username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn Username
            </Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="your-profile-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              Instagram Username
            </Label>
            <Input
              id="instagram"
              value={formData.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="your_username"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
