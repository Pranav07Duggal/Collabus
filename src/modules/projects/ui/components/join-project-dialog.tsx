"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Send } from "lucide-react"
import { toast } from "sonner"

interface JoinProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectTitle: string
  projectLead: string
}

export function JoinProjectDialog({ open, onOpenChange, projectTitle, projectLead }: JoinProjectDialogProps) {
  const [message, setMessage] = useState(`Hi ${projectLead},

I'm interested in joining the ${projectTitle} project. I have experience with web development and would love to contribute to this initiative.

I'm particularly excited about the environmental impact this project could have and believe my skills in React and TypeScript would be valuable to the team.

Looking forward to hearing from you!

Best regards`)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMobile = useIsMobile()

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast("Request Sent!",{
        description: "Your request has been sent to project lead."
    })

    setIsSubmitting(false)
    onOpenChange(false)
  }

  const content = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Message to Project Lead</Label>
        <Textarea
          id="message"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          className="resize-none"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        This message will be sent to {projectLead} along with your profile information.
      </p>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Request to Join Project</DrawerTitle>
            <DrawerDescription>Send a message to the project lead to request joining {projectTitle}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{content}</div>
          <DrawerFooter>
            <Button onClick={handleSubmit} disabled={isSubmitting || !message.trim()}>
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request to Join Project</DialogTitle>
          <DialogDescription>Send a message to the project lead to request joining {projectTitle}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !message.trim()}>
            {isSubmitting ? (
              <>Sending...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
