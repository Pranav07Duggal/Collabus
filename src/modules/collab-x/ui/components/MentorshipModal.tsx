import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button" 

export function MentorshipModal({ mentor, isOpen, onClose }: { mentor: any; isOpen: boolean; onClose: () => void }) {
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (mentor) {
      setMessage(`Hi ${mentor.name.split(" ")[0]},

I'm working on a Smart Campus Navigator project and would love your guidance as a mentor. Your expertise in ${mentor.expertise} would be incredibly valuable for our team.

Could we schedule a brief call to discuss potential mentorship opportunities?

Best regards,
[Your Name]`)
    }
  }, [mentor])

  if (!isOpen || !mentor) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Request Mentorship</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>

          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
              <AvatarFallback>
                {mentor.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{mentor.name}</h4>
              <p className="text-sm text-gray-600">
                {mentor.role} at {mentor.company}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Message to {mentor.name.split(" ")[0]}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600">Send Request</Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

