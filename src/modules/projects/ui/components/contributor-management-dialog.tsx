"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, UserPlus, Mail, Calendar } from "lucide-react"

interface ContributorManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: any
}

export function ContributorManagementDialog({ open, onOpenChange, project }: ContributorManagementDialogProps) {
  const [activeTab, setActiveTab] = useState("requests")

  const handleAcceptRequest = (requestId: string) => {
    console.log("[v0] Accepting join request:", requestId)
    // Handle accepting request
  }

  const handleRejectRequest = (requestId: string) => {
    console.log("[v0] Rejecting join request:", requestId)
    // Handle rejecting request
  }

  const handleInviteContributor = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Inviting contributor")
    // Handle inviting contributor
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Team</DialogTitle>
          <DialogDescription>Review join requests and manage your project contributors.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {[
              { id: "requests", label: `Join Requests (${project.pendingRequests.length})` },
              { id: "team", label: "Current Team" },
              { id: "invite", label: "Invite Contributors" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Join Requests Tab */}
          {activeTab === "requests" && (
            <div className="space-y-4">
              {project.pendingRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending join requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {project.pendingRequests.map((request: any) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                            <AvatarFallback>
                              {request.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{request.name}</h4>
                                <p className="text-sm text-muted-foreground">{request.role}</p>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {request.requestedAt}
                              </div>
                            </div>

                            <p className="text-sm">{request.message}</p>

                            <div className="flex gap-2 pt-2">
                              <Button
                                size="sm"
                                onClick={() => handleAcceptRequest(request.id)}
                                className="flex items-center gap-1"
                              >
                                <Check className="h-4 w-4" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectRequest(request.id)}
                                className="flex items-center gap-1"
                              >
                                <X className="h-4 w-4" />
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Current Team Tab */}
          {activeTab === "team" && (
            <div className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-semibold">Contributors</h4>
                {project.contributors.map((contributor: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                        <AvatarFallback>
                          {contributor.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contributor.name}</p>
                        <p className="text-sm text-muted-foreground">{contributor.role}</p>
                      </div>
                    </div>
                    {contributor.role === "Project Lead" && <Badge variant="secondary">Lead</Badge>}
                  </div>
                ))}
              </div>

              {project.mentors.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-semibold">Mentors</h4>
                    {project.mentors.map((mentor: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                          <AvatarFallback>
                            {mentor.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{mentor.name}</p>
                          <p className="text-sm text-muted-foreground">{mentor.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Invite Contributors Tab */}
          {activeTab === "invite" && (
            <div className="space-y-4">
              <form onSubmit={handleInviteContributor} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inviteEmail">Email Address</Label>
                    <Input id="inviteEmail" type="email" placeholder="contributor@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inviteRole">Role</Label>
                    <Input id="inviteRole" placeholder="e.g., Frontend Developer" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inviteMessage">Personal Message (Optional)</Label>
                  <Textarea id="inviteMessage" placeholder="Add a personal message to your invitation..." rows={3} />
                </div>

                <Button type="submit" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Invitation
                </Button>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
