import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function CollaborationModal({
  teamMate,
  isOpen,
  onClose,
}: {
  teamMate: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (teamMate) {
      setMessage(`Hi ${teamMate.name.split(" ")[0]},
I'm working on a Smart Campus Navigator project and would love your collaboration as a team member. Your expertise in 
${teamMate.expertise} would be incredibly valuable for our project.
Could we schedule a brief call to discuss potential colaboration opportunities?
Best regards,
[Your Name]`);
    }
  }, [teamMate]);

  if (!isOpen || !teamMate) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Collaboration</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>

          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={teamMate.avatar || "/placeholder.svg"}
                alt={teamMate.name}
              />
              <AvatarFallback>
                {teamMate.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{teamMate.name}</h4>
              <p className="text-sm text-gray-600">
                {teamMate.role} at {teamMate.company}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Message to {teamMate.name.split(" ")[0]}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600">
                Send Request
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
