"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"

export function ResumeUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setUploadedFile(file)
      }
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Resume
        </CardTitle>
        <CardDescription>Upload your resume in PDF format to auto-populate your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop your resume here</p>
            <p className="text-muted-foreground mb-4">or click to browse files</p>
            <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" id="resume-upload" />
            <Button asChild variant="outline">
              <label htmlFor="resume-upload" className="cursor-pointer">
                Choose File
              </label>
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
