"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Medal } from "lucide-react"

const proficiencyLevels = [
  { level: 1, name: "Novice", color: "bg-red-500" },
  { level: 2, name: "Beginner", color: "bg-orange-500" },
  { level: 3, name: "Intermediate", color: "bg-yellow-500" },
  { level: 4, name: "Advanced", color: "bg-blue-500" },
  { level: 5, name: "Proficient", color: "bg-green-500" },
  { level: 6, name: "Expert", color: "bg-purple-500" },
  { level: 7, name: "Master", color: "bg-pink-500" },
]

const mockSkills = [
  { name: "React", level: 6 },
  { name: "TypeScript", level: 6 },
  { name: "Node.js", level: 5 },
  { name: "Python", level: 5 },
  { name: "AWS", level: 4 },
  { name: "Docker", level: 4 },
  { name: "PostgreSQL", level: 5 },
  { name: "GraphQL", level: 4 },
  { name: "Next.js", level: 6 },
  { name: "Tailwind CSS", level: 5 },
]

const mockAchievements = [
  {
    title: "React Global Summit 2023",
    type: "winner",
    description: "1st Place - Best Innovation Award",
    date: "2023",
  },
  {
    title: "HackTheNorth 2022",
    type: "runner-up",
    description: "2nd Place - Best Technical Implementation",
    date: "2022",
  },
  {
    title: "AWS Certified Solutions Architect",
    type: "certification",
    description: "Professional Level Certification",
    date: "2023",
  },
  {
    title: "Google Developer Challenge",
    type: "winner",
    description: "Winner - Best Mobile App",
    date: "2021",
  },
]

export function SkillsSection() {
  const getProficiencyInfo = (level: number) => {
    return proficiencyLevels.find((p) => p.level === level) || proficiencyLevels[0]
  }

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "winner":
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case "runner-up":
        return <Medal className="h-5 w-5 text-gray-400" />
      default:
        return <Award className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Technical Skills */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {mockSkills.map((skill) => {
              const proficiency = getProficiencyInfo(skill.level)
              return (
                <div key={skill.name} className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {proficiency.name}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Achievements & Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="mt-1">{getAchievementIcon(achievement.type)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {achievement.date}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
