
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RotateCcw, Settings, Users, Plus, Save } from "lucide-react"


export function QuickActionChips({
  onRefineIdea,
  onChangeSkills,
  onRegenerateTeam,
  onFindReferences,
  onScreenshot
}: {
  onRefineIdea: () => void
  onChangeSkills: () => void
  onRegenerateTeam: () => void
  onFindReferences: () => void
  onScreenshot: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-4 z-10 bg-muted/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border mb-6"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        <Button size="sm" variant="outline" onClick={onRefineIdea} className="h-8 text-xs bg-transparent">
          <RotateCcw className="w-3 h-3 mr-1" />
          Refine Idea Again
        </Button>
        <Button size="sm" variant="outline" onClick={onChangeSkills} className="h-8 text-xs bg-transparent">
          <Settings className="w-3 h-3 mr-1" />
          Change Skills
        </Button>
        <Button size="sm" variant="outline" onClick={onRegenerateTeam} className="h-8 text-xs bg-transparent">
          <Users className="w-3 h-3 mr-1" />
          Regenerate Team
        </Button>
        <Button size="sm" variant="outline" onClick={onFindReferences} className="h-8 text-xs bg-transparent">
          <Plus className="w-3 h-3 mr-1" />
          More References
        </Button>
        <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700 dark:text-white" onClick={() => onScreenshot()}>
          <Save className="w-3 h-3 mr-1 dark:text-white" />
          Save Project Plan
        </Button>
      </div>
    </motion.div>
  )
}
