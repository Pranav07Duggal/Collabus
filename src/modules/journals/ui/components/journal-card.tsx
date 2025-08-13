import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface JournalCardProps {
  journal: {
    id: number
    title: string
    content: string
    author: {
      name: string
      avatar: string
      username: string
    }
    category: string
    tags: string[]
    visibility: string
    createdAt: string
    readTime: string
  }
}

export function JournalCard({ journal }: JournalCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Project":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Research":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Guide":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Reflection":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Badge className={`mb-2 ${getCategoryColor(journal.category)}`}>{journal.category}</Badge>
            <Link href={`/journals/${journal.id}`}>
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                {journal.title}
              </h3>
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-3 mt-2">{journal.content}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {journal.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Link
            href={`/profile/${journal.author.username}`}
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src={journal.author.avatar || "/placeholder.svg"} alt={journal.author.name} />
              <AvatarFallback className="text-xs">
                {journal.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{journal.author.name}</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(journal.createdAt).toLocaleDateString()}
            </span>
            <span>{journal.readTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
