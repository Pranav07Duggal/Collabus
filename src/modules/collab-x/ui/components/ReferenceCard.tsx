import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { mockReferences } from "@/modules/collab-x/server/mockData"

export function ReferenceCard({ reference, index }: { reference: (typeof mockReferences)[0]; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }}>
      <Card className="h-full hover:shadow-md transition-all duration-300 border-0 shadow-sm shadow-muted-foreground bg-muted from-white to-green-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-2 flex-1 leading-tight dark:text-gray-200 dark:hover:text-green-400"
              >
                {reference.title}
              </a>
              <ExternalLink className="w-4 h-4 text-gray-800 flex-shrink-0 mt-1 hover:text-green-600 transition-colors dark:text-gray-200" />
            </div>

            <Badge className="w-fit bg-green-100 text-green-700 hover:bg-green-200 dark:text-green-900 dark:bg-green-200">{reference.tag}</Badge>

            {reference.description && (
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed dark:text-gray-200">{reference.description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
