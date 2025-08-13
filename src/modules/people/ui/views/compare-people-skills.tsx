"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bot, Award, GraduationCap, Loader2, Settings, Zap, LineChart, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Checkbox } from "@/components/ui/checkbox"

// Proficiency bands mapping
const PROFICIENCY_BANDS = {
  Novice: { min: 0, max: 20, color: "#ef4444", level: 1 },
  Beginner: { min: 21, max: 35, color: "#f97316", level: 2 },
  Intermediate: { min: 36, max: 50, color: "#eab308", level: 3 },
  Proficient: { min: 51, max: 65, color: "#22c55e", level: 4 },
  Advanced: { min: 66, max: 80, color: "#3b82f6", level: 5 },
  Expert: { min: 81, max: 95, color: "#8b5cf6", level: 6 },
  Master: { min: 96, max: 100, color: "#ec4899", level: 7 },
}

// Function to get proficiency band from score
const getProficiencyBand = (score: number): string => {
  for (const [band, range] of Object.entries(PROFICIENCY_BANDS)) {
    if (score >= range.min && score <= range.max) {
      return band
    }
  }
  return "Novice"
}

// Function to get band level (1-7)
const getBandLevel = (score: number): number => {
  const band = getProficiencyBand(score)
  return PROFICIENCY_BANDS[band as keyof typeof PROFICIENCY_BANDS].level
}

// Mock user data (same as main page)
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "sarahc_dev",
    avatar: "/professional-woman-developer.png",
    role: "Frontend Engineer",
    techStack: ["React", "TypeScript", "Next.js"],
    competitionWinner: true,
    recentCompetition: "React Hackathon 2024",
    academicYear: "Final Year",
    proficiencyLevel: "Advanced",
    bio: "Passionate frontend developer with 3+ years of experience in React ecosystem.",
    skills: {
      React: 95,
      TypeScript: 90,
      "Next.js": 85,
      JavaScript: 92,
      CSS: 88,
      "Node.js": 70,
      Python: 45,
      Design: 75,
    },
  },
  {
    id: 2,
    name: "Marcus Johnson",
    username: "marcus_data",
    avatar: "/professional-data-scientist.png",
    role: "Data Scientist",
    techStack: ["Python", "TensorFlow", "SQL"],
    competitionWinner: false,
    academicYear: "3rd Year",
    proficiencyLevel: "Intermediate",
    bio: "Data enthusiast working on machine learning and predictive analytics.",
    skills: {
      Python: 92,
      TensorFlow: 85,
      SQL: 88,
      "Machine Learning": 90,
      Statistics: 85,
      R: 75,
      JavaScript: 40,
      React: 30,
    },
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    username: "elena_fullstack",
    avatar: "/professional-woman-engineer.png",
    role: "Full Stack Developer",
    techStack: ["Node.js", "React", "MongoDB"],
    competitionWinner: true,
    recentCompetition: "Code Challenge 2024",
    academicYear: "Final Year",
    proficiencyLevel: "Advanced",
    bio: "Full-stack developer specializing in modern web applications.",
    skills: {
      React: 88,
      "Node.js": 92,
      MongoDB: 85,
      JavaScript: 90,
      TypeScript: 80,
      Python: 70,
      AWS: 75,
      Docker: 65,
    },
  },
  {
    id: 4,
    name: "David Kim",
    username: "david_mobile",
    avatar: "/professional-mobile-developer.png",
    role: "Mobile Developer",
    techStack: ["React Native", "Swift", "Kotlin"],
    competitionWinner: false,
    academicYear: "2nd Year",
    proficiencyLevel: "Intermediate",
    bio: "Mobile app developer creating cross-platform solutions.",
    skills: {
      "React Native": 85,
      Swift: 80,
      Kotlin: 78,
      JavaScript: 82,
      "iOS Development": 85,
      "Android Development": 80,
      React: 75,
      Firebase: 70,
    },
  },
  {
    id: 5,
    name: "Priya Patel",
    username: "priya_backend",
    avatar: "/professional-woman-backend-developer.png",
    role: "Backend Engineer",
    techStack: ["Java", "Spring", "PostgreSQL"],
    competitionWinner: true,
    recentCompetition: "API Design Contest",
    academicYear: "3rd Year",
    proficiencyLevel: "Advanced",
    bio: "Backend engineer focused on scalable system architecture.",
    skills: {
      Java: 92,
      Spring: 88,
      PostgreSQL: 85,
      "System Design": 90,
      Microservices: 85,
      Docker: 80,
      Kubernetes: 75,
      AWS: 78,
    },
  },
  {
    id: 6,
    name: "Alex Thompson",
    username: "alex_devops",
    avatar: "/professional-devops-engineer.png",
    role: "DevOps Engineer",
    techStack: ["Docker", "Kubernetes", "AWS"],
    competitionWinner: false,
    academicYear: "Final Year",
    proficiencyLevel: "Intermediate",
    bio: "DevOps specialist passionate about automation and cloud infrastructure.",
    skills: {
      Docker: 90,
      Kubernetes: 85,
      AWS: 88,
      "CI/CD": 85,
      Linux: 90,
      Python: 75,
      Terraform: 80,
      Monitoring: 82,
    },
  },
  {
    id: 7,
    name: "Lisa Wang",
    username: "lisa_ui",
    avatar: "/professional-woman-developer.png",
    role: "UI/UX Designer",
    techStack: ["Figma", "React", "CSS"],
    competitionWinner: true,
    recentCompetition: "Design Sprint 2024",
    academicYear: "2nd Year",
    proficiencyLevel: "Advanced",
    bio: "Creative designer with a passion for user-centered design.",
    skills: {
      Figma: 95,
      "UI Design": 92,
      "UX Research": 88,
      CSS: 85,
      React: 70,
      Prototyping: 90,
      "User Testing": 85,
      "Design Systems": 88,
    },
  },
  {
    id: 8,
    name: "James Wilson",
    username: "james_security",
    avatar: "/professional-data-scientist.png",
    role: "Security Engineer",
    techStack: ["Python", "Cybersecurity", "Linux"],
    competitionWinner: false,
    academicYear: "Final Year",
    proficiencyLevel: "Advanced",
    bio: "Cybersecurity expert focused on application security.",
    skills: {
      Cybersecurity: 92,
      Python: 85,
      Linux: 90,
      "Penetration Testing": 88,
      "Network Security": 85,
      Cryptography: 80,
      "Risk Assessment": 85,
      Compliance: 78,
    },
  },
]

export default function ComparisonAnalyticsPage() {
  const router = useRouter()
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
  const [selectedUsers, setSelectedUsers] = useState<typeof mockUsers>([])
  const [aiCandidateLoading, setAiCandidateLoading] = useState(true)
  const [aiCandidate, setAiCandidate] = useState<any>(null)
  const [skillWeights, setSkillWeights] = useState<Record<string, number>>({})
  const [visibleUsers, setVisibleUsers] = useState<Record<string, boolean>>({})

  // Load selected users from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("selectedUsers")
    if (stored) {
      const ids = JSON.parse(stored)
      setSelectedUserIds(ids)
      const users = mockUsers.filter((user) => ids.includes(user.id))
      setSelectedUsers(users)

      // Initialize all users as visible
      const initialVisibility: Record<string, boolean> = {}
      users.forEach((user) => {
        initialVisibility[user.name] = true
      })
      setVisibleUsers(initialVisibility)
    }
  }, [])

  // Simulate AI candidate generation
  useEffect(() => {
    if (selectedUsers.length > 0) {
      const timer = setTimeout(() => {
        // Generate AI perfect candidate based on selected users
        const allSkills = new Set<string>()
        selectedUsers.forEach((user) => {
          Object.keys(user.skills).forEach((skill) => allSkills.add(skill))
        })

        const perfectSkills: Record<string, number> = {}
        allSkills.forEach((skill) => {
          const skillValues = selectedUsers.map((user) => user.skills[skill] || 0).filter((val) => val > 0)

          if (skillValues.length > 0) {
            // Take the maximum skill level + some improvement
            perfectSkills[skill] = Math.min(100, Math.max(...skillValues) + 5)
          }
        })

        const aiCandidateData = {
          name: "AI Perfect Candidate",
          role: "Ideal Match",
          skills: perfectSkills,
          competitionWinner: true,
          academicYear: "Final Year",
          proficiencyLevel: "Expert",
          bio: "AI-generated perfect candidate based on your selection criteria and requirements.",
        }

        setAiCandidate(aiCandidateData)

        // Initialize skill weights for relevant skills only
        const initialWeights: Record<string, number> = {}
        Object.keys(perfectSkills).forEach((skill) => {
          initialWeights[skill] = 50 // Default weight of 50%
        })
        setSkillWeights(initialWeights)

        // Add AI candidate to visibility
        setVisibleUsers((prev) => ({
          ...prev,
          "AI Perfect Candidate": true,
        }))

        setAiCandidateLoading(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [selectedUsers])

  // Get relevant skills (only those that AI candidate has)
  const relevantSkills = useMemo(() => {
    if (!aiCandidate) return []
    return Object.keys(aiCandidate.skills).sort()
  }, [aiCandidate])

  // Calculate area under curve for each user
  const calculateAreaUnderCurve = (skills: Record<string, number>, relevantSkills: string[]): number => {
    if (relevantSkills.length === 0) return 0

    const values = relevantSkills.map((skill) => getBandLevel(skills[skill] || 0))

    // Calculate area using trapezoidal rule
    let area = 0
    for (let i = 0; i < values.length - 1; i++) {
      area += (values[i] + values[i + 1]) / 2
    }

    // Normalize by maximum possible area (all skills at level 7)
    const maxArea = (relevantSkills.length - 1) * 7
    return maxArea > 0 ? (area / maxArea) * 100 : 0
  }

  // Calculate weighted scores based on area under curve
  const userScores = useMemo(() => {
    if (!aiCandidate || relevantSkills.length === 0) return []

    const candidates = [...selectedUsers, aiCandidate]

    const scores = candidates.map((candidate) => {
      const areaScore = calculateAreaUnderCurve(candidate.skills, relevantSkills)

      // Apply skill weights
      let weightedScore = 0
      let totalWeight = 0

      relevantSkills.forEach((skill) => {
        const skillLevel = getBandLevel(candidate.skills[skill] || 0)
        const weight = skillWeights[skill] || 50
        weightedScore += (skillLevel / 7) * weight
        totalWeight += weight
      })

      const finalScore = totalWeight > 0 ? (weightedScore / totalWeight) * 100 : areaScore

      return {
        candidate,
        areaScore,
        weightedScore: finalScore,
        rank: 0,
      }
    })

    // Assign ranks based on weighted score
    scores.sort((a, b) => b.weightedScore - a.weightedScore)
    scores.forEach((item, idx) => {
      item.rank = idx + 1
    })

    return scores
  }, [selectedUsers, aiCandidate, relevantSkills, skillWeights])

  // Prepare line chart data
  const lineChartData = useMemo(() => {
    if (relevantSkills.length === 0) return []

    return relevantSkills.map((skill, index) => {
      const dataPoint: any = {
        skill: skill.length > 10 ? skill.substring(0, 10) + "..." : skill,
        fullSkill: skill,
        index,
      }

      selectedUsers.forEach((user) => {
        if (visibleUsers[user.name]) {
          dataPoint[user.name] = getBandLevel(user.skills[skill] || 0)
        }
      })

      if (aiCandidate && visibleUsers["AI Perfect Candidate"]) {
        dataPoint["Perfect"] = getBandLevel(aiCandidate.skills[skill] || 0)
      }

      return dataPoint
    })
  }, [selectedUsers, aiCandidate, relevantSkills, visibleUsers])

  const UserCard = ({
    user,
    areaScore,
    weightedScore,
    rank,
    isAI = false,
  }: { user: any; areaScore?: number; weightedScore?: number; rank?: number; isAI?: boolean }) => (
    <Card className={`border-muted ${isAI ? "border-blue-200 bg-blue-50/50" : ""}`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            {isAI ? (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            ) : (
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{user.name}</h3>
                {isAI && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    AI Generated
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="text-xs mt-1">
                {user.role}
              </Badge>
            </div>
            {weightedScore !== undefined && (
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{weightedScore.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Rank #{rank}</div>
              </div>
            )}
          </div>

          {/* Academic Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              <span>{user.academicYear}</span>
            </div>
            {user.competitionWinner && (
              <div className="flex items-center gap-1 text-amber-600">
                <Award className="w-4 h-4" />
                <span>Winner</span>
              </div>
            )}
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground">{user.bio}</p>

          {/* Area Score */}
          {areaScore !== undefined && (
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">AREA COVERAGE</Label>
              <div className="flex items-center gap-2">
                <Progress value={areaScore} className="flex-1 h-2" />
                <span className="text-sm font-medium text-foreground">{areaScore.toFixed(1)}%</span>
              </div>
            </div>
          )}

          {/* Relevant Skills with Proficiency Bands */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">RELEVANT SKILLS</Label>
            <div className="space-y-1">
              {relevantSkills.slice(0, 5).map((skill) => {
                const score = user.skills[skill] || 0
                const band = getProficiencyBand(score)
                const bandColor = PROFICIENCY_BANDS[band as keyof typeof PROFICIENCY_BANDS].color

                return (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{skill}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs border-2"
                        style={{ borderColor: bandColor, color: bandColor }}
                      >
                        {band}
                      </Badge>
                      <span className="text-xs text-muted-foreground w-8">{score}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (selectedUsers.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No users selected for comparison</h2>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Proficiency Band Analysis</h1>
                <p className="text-sm text-muted-foreground">
                  Analyzing {selectedUsers.length} candidates with {relevantSkills.length} relevant skills
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <LineChart className="w-3 h-3" />
                Area Under Curve
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Proficiency Bands Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Proficiency Bands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {Object.entries(PROFICIENCY_BANDS).map(([band, config]) => (
                <div key={band} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.color }} />
                  <div className="text-sm">
                    <div className="font-medium">{band}</div>
                    <div className="text-muted-foreground text-xs">
                      {config.min}-{config.max}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userScores.map(({ candidate, areaScore, weightedScore, rank }) => (
            <UserCard
              key={candidate.name}
              user={candidate}
              areaScore={areaScore}
              weightedScore={weightedScore}
              rank={rank}
              isAI={candidate.name === "AI Perfect Candidate"}
            />
          ))}

          {/* AI Loading Card */}
          {aiCandidateLoading && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Generating Perfect Candidate...</h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 mt-1">
                        AI Processing
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Skill Weight Controls */}
        {relevantSkills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Skill Importance Weights (Relevant Skills Only)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relevantSkills.map((skill) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm font-medium">{skill}</Label>
                      <span className="text-sm text-muted-foreground">{skillWeights[skill] || 50}%</span>
                    </div>
                    <Slider
                      value={[skillWeights[skill] || 50]}
                      onValueChange={([value]) => setSkillWeights((prev) => ({ ...prev, [skill]: value }))}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Selection Toggles */}
        <Card>
          <CardHeader>
            <CardTitle>Select Users for Graph Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedUsers.map((user) => (
                <div key={user.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={visibleUsers[user.name] || false}
                    onCheckedChange={(checked) =>
                      setVisibleUsers((prev) => ({ ...prev, [user.name]: checked as boolean }))
                    }
                  />
                  <Label htmlFor={`user-${user.id}`} className="text-sm font-medium cursor-pointer">
                    {user.name}
                  </Label>
                </div>
              ))}
              {aiCandidate && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ai-candidate"
                    checked={visibleUsers["AI Perfect Candidate"] || false}
                    onCheckedChange={(checked) =>
                      setVisibleUsers((prev) => ({ ...prev, "AI Perfect Candidate": checked as boolean }))
                    }
                  />
                  <Label htmlFor="ai-candidate" className="text-sm font-medium cursor-pointer flex items-center gap-1">
                    <Bot className="w-4 h-4" />
                    AI Perfect Candidate
                  </Label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Proficiency Level Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  [selectedUsers[0]?.name || "User1"]: {
                    label: selectedUsers[0]?.name || "User1",
                    color: "#3b82f6",
                  },
                  [selectedUsers[1]?.name || "User2"]: {
                    label: selectedUsers[1]?.name || "User2",
                    color: "#ef4444",
                  },
                  [selectedUsers[2]?.name || "User3"]: {
                    label: selectedUsers[2]?.name || "User3",
                    color: "#22c55e",
                  },
                  [selectedUsers[3]?.name || "User4"]: {
                    label: selectedUsers[3]?.name || "User4",
                    color: "#f59e0b",
                  },
                  Perfect: { label: "Perfect Candidate", color: "#8b5cf6" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                    <YAxis
                      domain={[1, 7]}
                      ticks={[1, 2, 3, 4, 5, 6, 7]}
                      tickFormatter={(value) => {
                        const bands = Object.keys(PROFICIENCY_BANDS)
                        return bands[value - 1] || ""
                      }}
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = lineChartData.find((d) => d.skill === label)
                          return (
                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data?.fullSkill || label}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {entry.dataKey}: {Object.keys(PROFICIENCY_BANDS)[Number(entry.value) - 1] || "Novice"}
                                </p>
                              ))}
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    {selectedUsers.map((user, idx) => {
                      if (!visibleUsers[user.name]) return null
                      const colors = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b"]
                      return (
                        <Line
                          key={user.name}
                          type="monotone"
                          dataKey={user.name}
                          stroke={colors[idx] || "#6b7280"}
                          strokeWidth={3}
                          dot={{ r: 5, fill: colors[idx] || "#6b7280", strokeWidth: 2, stroke: "#ffffff" }}
                          activeDot={{ r: 7, fill: colors[idx] || "#6b7280" }}
                        />
                      )
                    })}
                    {aiCandidate && visibleUsers["AI Perfect Candidate"] && (
                      <Line
                        type="monotone"
                        dataKey="Perfect"
                        stroke="#8b5cf6"
                        strokeWidth={4}
                        strokeDasharray="8 4"
                        dot={{ r: 6, fill: "#8b5cf6", strokeWidth: 2, stroke: "#ffffff" }}
                        activeDot={{ r: 8, fill: "#8b5cf6" }}
                      />
                    )}
                  </RechartsLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Skill Proficiency Radar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  [selectedUsers[0]?.name || "User1"]: {
                    label: selectedUsers[0]?.name || "User1",
                    color: "#3b82f6",
                  },
                  [selectedUsers[1]?.name || "User2"]: {
                    label: selectedUsers[1]?.name || "User2",
                    color: "#ef4444",
                  },
                  [selectedUsers[2]?.name || "User3"]: {
                    label: selectedUsers[2]?.name || "User3",
                    color: "#22c55e",
                  },
                  [selectedUsers[3]?.name || "User4"]: {
                    label: selectedUsers[3]?.name || "User4",
                    color: "#f59e0b",
                  },
                  Perfect: { label: "Perfect Candidate", color: "#8b5cf6" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={lineChartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="fullSkill" tick={{ fontSize: 10 }} className="text-xs" />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 7]}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => {
                        const bands = Object.keys(PROFICIENCY_BANDS)
                        return bands[value - 1] || ""
                      }}
                    />
                    {selectedUsers.map((user, idx) => {
                      if (!visibleUsers[user.name]) return null
                      const colors = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b"]
                      return (
                        <Radar
                          key={user.name}
                          name={user.name}
                          dataKey={user.name}
                          stroke={colors[idx] || "#6b7280"}
                          fill={colors[idx] || "#6b7280"}
                          fillOpacity={0.1}
                          strokeWidth={2}
                          dot={{ r: 4, fill: colors[idx] || "#6b7280" }}
                        />
                      )
                    })}
                    {aiCandidate && visibleUsers["AI Perfect Candidate"] && (
                      <Radar
                        name="Perfect"
                        dataKey="Perfect"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.2}
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ r: 5, fill: "#8b5cf6" }}
                      />
                    )}
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{label}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {entry.dataKey}: {Object.keys(PROFICIENCY_BANDS)[Number(entry.value) - 1] || "Novice"}
                                </p>
                              ))}
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-semibold text-foreground mb-2">Top Performer</h4>
                <p className="text-sm text-muted-foreground">
                  {userScores[0]?.candidate.name} leads with {userScores[0]?.weightedScore.toFixed(1)}% weighted score
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-semibold text-foreground mb-2">Relevant Skills</h4>
                <p className="text-sm text-muted-foreground">
                  Analysis based on {relevantSkills.length} skills relevant to the AI-generated perfect candidate
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-semibold text-foreground mb-2">Average Coverage</h4>
                <p className="text-sm text-muted-foreground">
                  {userScores.length > 1
                    ? (
                        userScores.slice(0, -1).reduce((sum, s) => sum + s.areaScore, 0) /
                        (userScores.length - 1)
                      ).toFixed(1)
                    : 0}
                  % average area under curve for selected candidates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
