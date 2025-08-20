"use client"

import { useState } from "react"
import { ProfileHeader } from "../components/profile-header"
import { SkillsSection } from "../components/skills-section"
import { ProjectsSection } from "../components/projects-section"
import { ResumeUpload } from "../components/resume-upload"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function ProfilePage() {
  const [showResumeUpload, setShowResumeUpload] = useState(false)

  return (
    <div className="min-h-screen bg-background h-full w-full">
      {/* Header with theme toggle and resume upload toggle */}
      <div className="top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className=" mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-foreground">Professional Profile</h1>
          <div className="flex items-center gap-3">
            <Button
              variant={showResumeUpload ? "default" : "outline"}
              size="sm"
              onClick={() => setShowResumeUpload(!showResumeUpload)}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {showResumeUpload ? "Hide Upload" : "Upload Resume"}
            </Button>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-6 py-8 space-y-8">
        {/* Resume Upload Section */}
        {showResumeUpload && (
          <div className="animate-in slide-in-from-top-2 duration-500">
            <ResumeUpload />
          </div>
        )}

        {/* Profile Header */}
        <ProfileHeader />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />
      </div>
    </div>
  )
}
