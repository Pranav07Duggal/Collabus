import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Target, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { mockRoadmap } from "@/modules/collab-x/server/mockData"

export function ProjectRoadmap() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mx-auto p-4">
      <Card className="border-0 shadow-sm bg-muted">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900 dark:text-gray-200">
            <div className="min-w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span>Project Roadmap</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {mockRoadmap.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-muted shadow-sm border"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {step.id}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-200">{step.title}</h4>
                    <Badge variant="outline" className="text-xs dark:text-gray-200">
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 dark:text-gray-200">{step.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-400 dark:text-gray-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
