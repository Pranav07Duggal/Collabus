"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ProfileData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  bio: string
  avatar: string
  socials: {
    github: string
    linkedin: string
    instagram: string
  }
}

interface EditProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: ProfileData
  onSave: (profile: ProfileData) => void
}

export function EditProfileDialog({ open, onOpenChange, profile, onSave }: EditProfileDialogProps) {
  const [formData, setFormData] = useState(profile)

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
  }

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
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
