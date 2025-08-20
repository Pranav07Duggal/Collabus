"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditProfileDialog } from "../components/edit-profile-dialog"
import { EditSocialsDialog } from "../components/edit-socials-dialog"
import { Edit, Github, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react"

const mockProfile = {
  name: "Alex Johnson",
  title: "Senior Full Stack Developer",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
  avatar: "/placeholder.svg?height=120&width=120",
  socials: {
    github: "alexjohnson",
    linkedin: "alex-johnson-dev",
    instagram: "alexjohnson_dev",
  },
}

export function ProfileHeader() {
  const [profile, setProfile] = useState(mockProfile)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showEditSocials, setShowEditSocials] = useState(false)

  return (
    <Card className="bg-card">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image and Basic Info */}
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="text-2xl">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={() => setShowEditProfile(true)} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          {/* Main Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h1>
              <p className="text-xl text-primary font-medium mb-4">{profile.title}</p>
              <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 max-w-md">
              <div className="flex gap-3 max-w-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Github />
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowEditSocials(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Dialogs */}
        <EditProfileDialog
          open={showEditProfile}
          onOpenChange={setShowEditProfile}
          profile={profile}
          onSave={setProfile}
        />
        <EditSocialsDialog
          open={showEditSocials}
          onOpenChange={setShowEditSocials}
          socials={profile.socials}
          onSave={(socials) => setProfile((prev) => ({ ...prev, socials }))}
        />
      </CardContent>
    </Card>
  )
}
