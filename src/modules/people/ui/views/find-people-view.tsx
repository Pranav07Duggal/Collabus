"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  MessageCircle,
  User,
  Award,
  GraduationCap,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Settings2,
  X,
  BarChart3,
  ToggleRightIcon as Toggle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

// Mock user data (expanded for pagination demo)
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "sarahc_dev",
    avatar: "/hakla.png",
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
    avatar: "/hakla.png",
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
    avatar: "/hakla.png",
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
    avatar: "/hakla.png",
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
    avatar: "/hakla.png",
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
    avatar: "/hakla.png",
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
    avatar: "/hakla.png",
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
    avatar: "/hakla.png",
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

const roles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Developer",
  "Data Scientist",
  "Mobile Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Security Engineer",
]

const techOptions = [
  "React",
  "TypeScript",
  "Next.js",
  "Python",
  "TensorFlow",
  "SQL",
  "Node.js",
  "MongoDB",
  "React Native",
  "Swift",
  "Kotlin",
  "Java",
  "Spring",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Figma",
  "CSS",
  "Cybersecurity",
  "Linux",
]

const academicYears = ["1st Year", "2nd Year", "3rd Year", "Final Year"]
const proficiencyLevels = ["Beginner", "Intermediate", "Advanced"]

interface Filters {
  role: string
  techStack: string[]
  competitionWinner: string
  academicYear: string
  proficiencyLevel: string
}

type ViewMode = "card" | "list"

const ITEMS_PER_PAGE = 4

export default function UserSearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("card")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({
    role: "all",
    techStack: [],
    competitionWinner: "any",
    academicYear: "all",
    proficiencyLevel: "all",
  })

  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([])
  const MAX_COMPARISON_USERS = 4

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = filters.role === "all" || user.role === filters.role
      const matchesTechStack =
        filters.techStack.length === 0 || filters.techStack.some((tech) => user.techStack.includes(tech))
      const matchesCompetition =
        filters.competitionWinner === "any" ||
        (filters.competitionWinner === "yes" && user.competitionWinner) ||
        (filters.competitionWinner === "no" && !user.competitionWinner)
      const matchesAcademicYear = filters.academicYear === "all" || user.academicYear === filters.academicYear
      const matchesProficiency =
        filters.proficiencyLevel === "all" || user.proficiencyLevel === filters.proficiencyLevel

      return (
        matchesSearch &&
        matchesRole &&
        matchesTechStack &&
        matchesCompetition &&
        matchesAcademicYear &&
        matchesProficiency
      )
    })
  }, [searchQuery, filters])

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [filteredUsers.length])

  const handleTechStackChange = (tech: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      techStack: checked ? [...prev.techStack, tech] : prev.techStack.filter((t) => t !== tech),
    }))
  }

  const clearFilters = () => {
    setFilters({
      role: "all",
      techStack: [],
      competitionWinner: "any",
      academicYear: "all",
      proficiencyLevel: "all",
    })
    setSearchQuery("")
  }

  const activeFiltersCount = [
    filters.role !== "all" ? 1 : 0,
    filters.techStack.length,
    filters.competitionWinner !== "any" ? 1 : 0,
    filters.academicYear !== "all" ? 1 : 0,
    filters.proficiencyLevel !== "all" ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0)

  const toggleUserForComparison = (userId: number) => {
    setSelectedForComparison((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId)
      } else if (prev.length < MAX_COMPARISON_USERS) {
        return [...prev, userId]
      }
      return prev
    })
  }

  const clearComparison = () => {
    setSelectedForComparison([])
  }

  const handleCompareAnalytics = () => {
    if (selectedForComparison.length > 0) {
      // Store selected users in localStorage for the analytics page
      localStorage.setItem("selectedUsers", JSON.stringify(selectedForComparison))
      router.push("/people/comparison-analytics")
    }
  }

  const getSelectedUsers = () => {
    return mockUsers.filter((user) => selectedForComparison.includes(user.id))
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-3 block text-foreground">Role / Specialization</Label>
        <Select value={filters.role} onValueChange={(value) => setFilters((prev) => ({ ...prev, role: value }))}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block text-foreground">Tech Stack</Label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3 bg-background">
          {techOptions.map((tech) => (
            <div key={tech} className="flex items-center space-x-2">
              <Checkbox
                id={tech}
                checked={filters.techStack.includes(tech)}
                onCheckedChange={(checked) => handleTechStackChange(tech, checked as boolean)}
              />
              <Label htmlFor={tech} className="text-sm text-muted-foreground">
                {tech}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block text-foreground">Competition Winner</Label>
        <Select
          value={filters.competitionWinner}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, competitionWinner: value }))}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block text-foreground">Academic Year</Label>
        <Select
          value={filters.academicYear}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, academicYear: value }))}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {academicYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block text-foreground">Proficiency Level</Label>
        <Select
          value={filters.proficiencyLevel}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, proficiencyLevel: value }))}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {proficiencyLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )

  const UserCard = ({ user }: { user: (typeof mockUsers)[0] }) => {
    const isSelected = selectedForComparison.includes(user.id)
    const canSelect = selectedForComparison.length < MAX_COMPARISON_USERS || isSelected

    return (
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-muted relative">
        {comparisonMode && (
          <div className="absolute top-3 right-3 z-10">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleUserForComparison(user.id)}
              disabled={!canSelect}
              className="bg-background border-2"
            />
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                {user.role}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1 justify-center">
              {user.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs border-muted text-muted-foreground">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                <span>{user.academicYear}</span>
              </div>
              {user.competitionWinner && (
                <div className="flex items-center gap-1 text-amber-600">
                  <Award className="w-4 h-4" />
                  <span className="text-xs">Winner</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 w-full pt-2">
              <Button size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <User className="w-4 h-4 mr-1" />
                Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const UserListItem = ({ user }: { user: (typeof mockUsers)[0] }) => {
    const isSelected = selectedForComparison.includes(user.id)
    const canSelect = selectedForComparison.length < MAX_COMPARISON_USERS || isSelected

    return (
      <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-muted">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {comparisonMode && (
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleUserForComparison(user.id)}
                  disabled={!canSelect}
                  className="bg-background border-2"
                />
              )}
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground shrink-0">
                  {user.role}
                </Badge>
                {user.competitionWinner && (
                  <div className="flex items-center gap-1 text-amber-600 shrink-0">
                    <Award className="w-3 h-3" />
                    <span className="text-xs">Winner</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">@{user.username}</p>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{user.bio}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>{user.academicYear}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {user.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs border-muted text-muted-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <Button size="sm" variant="outline">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const Pagination = () => {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
      const pages = []
      const showPages = 5
      let start = Math.max(1, currentPage - Math.floor(showPages / 2))
      const end = Math.min(totalPages, start + showPages - 1)

      if (end - start + 1 < showPages) {
        start = Math.max(1, end - showPages + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }

    return (
      <div className="flex items-center justify-between mt-8">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
          {filteredUsers.length} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {getPageNumbers().map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo/Title */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-foreground">Find People</h1>
              <Separator orientation="vertical" className="h-6" />
              <p className="text-sm text-muted-foreground hidden sm:block">
                {filteredUsers.length} {filteredUsers.length === 1 ? "person" : "people"}
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name or username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-muted"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Comparison Toggle */}
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50">
                <Toggle className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="comparison-mode" className="text-sm text-muted-foreground cursor-pointer">
                  Compare
                </Label>
                <Switch
                  id="comparison-mode"
                  checked={comparisonMode}
                  onCheckedChange={(checked) => {
                    setComparisonMode(checked)
                    if (!checked) {
                      setSelectedForComparison([])
                    }
                  }}
                />
              </div>

              {/* Filters */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="relative bg-transparent">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Filter Users</DialogTitle>
                  </DialogHeader>
                  <FilterPanel />
                </DialogContent>
              </Dialog>

              {/* View Toggle */}
              <div className="flex border rounded-md bg-muted/50">
                <Button
                  variant={viewMode === "card" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("card")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.role !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Role: {filters.role}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters((prev) => ({ ...prev, role: "all" }))}
                  />
                </Badge>
              )}
              {filters.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="gap-1">
                  {tech}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleTechStackChange(tech, false)} />
                </Badge>
              ))}
              {filters.competitionWinner !== "any" && (
                <Badge variant="secondary" className="gap-1">
                  Winner: {filters.competitionWinner}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters((prev) => ({ ...prev, competitionWinner: "any" }))}
                  />
                </Badge>
              )}
              {filters.academicYear !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Year: {filters.academicYear}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters((prev) => ({ ...prev, academicYear: "all" }))}
                  />
                </Badge>
              )}
              {filters.proficiencyLevel !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Level: {filters.proficiencyLevel}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters((prev) => ({ ...prev, proficiencyLevel: "all" }))}
                  />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Comparison Bar */}
      {comparisonMode && selectedForComparison.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="border-muted shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {getSelectedUsers()
                      .slice(0, 3)
                      .map((user) => (
                        <Avatar key={user.id} className="w-8 h-8 border-2 border-background">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    {selectedForComparison.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">+{selectedForComparison.length - 3}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {selectedForComparison.length} selected for comparison
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearComparison}>
                    Clear
                  </Button>
                  <Button size="sm" onClick={handleCompareAnalytics}>
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Analyze ({selectedForComparison.length})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results */}
        {paginatedUsers.length > 0 ? (
          <>
            {viewMode === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedUsers.map((user) => (
                  <UserListItem key={user.id} user={user} />
                ))}
              </div>
            )}
            <Pagination />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              <User className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
