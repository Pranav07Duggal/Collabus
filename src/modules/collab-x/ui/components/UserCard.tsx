import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, GraduationCap, MessageCircle, User } from "lucide-react";
export function UserCard({
  user,
  index,
  type = "team",
  onRequestMentorship,
  onRequestCollaboration,
}: {
  user: any;
  index: number;
  type?: "team" | "mentor";
  onRequestMentorship?: (mentor: any) => void;
  onRequestCollaboration?: (team: any) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-md transition-all duration-300 border-0 shadow-sm bg-muted shadow-muted-foreground transition-ease-in-out">
        <CardContent className="p-3">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                  {user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {type === "mentor" && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200">
                {user.name}
              </h3>
              <p className="text-sm font-medium text-blue-200">{user.role}</p>
              {type === "team" ? (
                <p className="text-xs text-gray-500 dark:text-gray-100">
                  {user.year} • {user.major}
                </p>
              ) : (
                <p className="text-xs text-gray-600 font-medium dark:text-pink-200">
                  {user.company}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-200">
                {user.experience} experience
              </p>
              {type === "mentor" && user.expertise && (
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  {user.expertise}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-1 justify-center">
              {user.skills.map((skill: string) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-red-300 dark:text-red-800"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 w-full">
              {type === "mentor" ? (
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  onClick={() => onRequestMentorship?.(user)}
                >
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Request Mentorship
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    className="flex-1 bg-transparent"
                    variant="outline"
                    onClick={() => onRequestCollaboration?.(user)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-transparent"
                    variant="outline"
                  >
                    <User className="w-4 h-4 mr-1" />
                    Profile
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
