"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

// Expanded mock data with 15 contests
const contests = [
  {
    id: "1",
    title: "AI Innovation Challenge 2024",
    type: "Hackathon",
    status: "ongoing",
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    description: "Build innovative AI solutions for real-world problems",
    participants: 245,
    prize: "$50,000",
  },
  {
    id: "2",
    title: "Sustainable Tech Ideas",
    type: "Ideathon",
    status: "upcoming",
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    description: "Generate ideas for sustainable technology solutions",
    participants: 89,
    prize: "$25,000",
  },
  {
    id: "3",
    title: "Data Science Championship",
    type: "Kaggle Competition",
    status: "ended",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    description: "Compete in advanced data science challenges",
    participants: 1250,
    prize: "$100,000",
  },
  {
    id: "4",
    title: "Mobile App Development Sprint",
    type: "Hackathon",
    status: "upcoming",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    description: "48-hour mobile app development challenge",
    participants: 156,
    prize: "$30,000",
  },
  {
    id: "5",
    title: "Climate Change Solutions",
    type: "Ideathon",
    status: "ongoing",
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    description: "Brainstorm innovative solutions for climate challenges",
    participants: 78,
    prize: "$40,000",
  },
  {
    id: "6",
    title: "Machine Learning Mastery",
    type: "Kaggle Competition",
    status: "ended",
    startDate: "2023-11-15",
    endDate: "2023-12-15",
    description: "Advanced machine learning competition",
    participants: 890,
    prize: "$75,000",
  },
  {
    id: "7",
    title: "Blockchain Innovation Hub",
    type: "Hackathon",
    status: "upcoming",
    startDate: "2024-02-20",
    endDate: "2024-02-25",
    description: "Build decentralized applications for the future",
    participants: 234,
    prize: "$60,000",
  },
  {
    id: "8",
    title: "Healthcare Tech Revolution",
    type: "Ideathon",
    status: "ongoing",
    startDate: "2024-01-25",
    endDate: "2024-02-10",
    description: "Innovative healthcare technology solutions",
    participants: 167,
    prize: "$45,000",
  },
  {
    id: "9",
    title: "Cybersecurity Challenge",
    type: "Kaggle Competition",
    status: "upcoming",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    description: "Advanced cybersecurity problem solving",
    participants: 445,
    prize: "$80,000",
  },
  {
    id: "10",
    title: "IoT Smart Cities",
    type: "Hackathon",
    status: "ended",
    startDate: "2023-12-10",
    endDate: "2023-12-15",
    description: "Internet of Things solutions for smart cities",
    participants: 312,
    prize: "$55,000",
  },
  {
    id: "11",
    title: "EdTech Innovation Lab",
    type: "Ideathon",
    status: "upcoming",
    startDate: "2024-02-28",
    endDate: "2024-03-15",
    description: "Revolutionary educational technology concepts",
    participants: 123,
    prize: "$35,000",
  },
  {
    id: "12",
    title: "Quantum Computing Quest",
    type: "Kaggle Competition",
    status: "ongoing",
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    description: "Explore quantum computing algorithms",
    participants: 567,
    prize: "$90,000",
  },
  {
    id: "13",
    title: "Green Energy Hackathon",
    type: "Hackathon",
    status: "upcoming",
    startDate: "2024-03-10",
    endDate: "2024-03-12",
    description: "Renewable energy solutions development",
    participants: 189,
    prize: "$40,000",
  },
  {
    id: "14",
    title: "FinTech Future Forum",
    type: "Ideathon",
    status: "ended",
    startDate: "2023-11-20",
    endDate: "2023-12-05",
    description: "Financial technology innovation ideas",
    participants: 298,
    prize: "$50,000",
  },
  {
    id: "15",
    title: "Space Tech Challenge",
    type: "Kaggle Competition",
    status: "upcoming",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    description: "Space exploration technology solutions",
    participants: 678,
    prize: "$120,000",
  },
]

function getStatusVariant(status: string) {
  switch (status) {
    case "upcoming":
      return "secondary"
    case "ongoing":
      return "default"
    case "ended":
      return "destructive"
    default:
      return "secondary"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "ongoing":
      return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
    default:
      return ""
  }
}

const ITEMS_PER_PAGE = 9

export default function ContestsView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter contests based on search and filters
  const filteredContests = contests.filter((contest) => {
    const matchesSearch =
      contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contest.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contest.status === statusFilter
    const matchesType = typeFilter === "all" || contest.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination
  const totalPages = Math.ceil(filteredContests.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedContests = filteredContests.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-cyan-900/30" />
        <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] opacity-10 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-foreground">Discover Amazing Contests</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of innovators, creators, and problem-solvers in exciting competitions
            </p>
          </div>
        </div>
      </div>

      {/* Floating Navigation Bar */}
      <div className="sticky top-4 z-10 container mx-auto px-4 -mt-8">
        <Card className="backdrop-blur-sm bg-background/80 border-muted rounded-2xl shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search contests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/50 border-muted rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-muted/50 border-muted rounded-xl">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40 bg-muted/50 border-muted rounded-xl">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Hackathon">Hackathon</SelectItem>
                    <SelectItem value="Ideathon">Ideathon</SelectItem>
                    <SelectItem value="Kaggle Competition">Kaggle Competition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contest Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedContests.map((contest) => (
            <Link key={contest.id} href={`/contests/${contest.id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer bg-card border-muted rounded-2xl group hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{contest.title}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="rounded-full">
                      {contest.type}
                    </Badge>
                    <Badge
                      variant={getStatusVariant(contest.status)}
                      className={`rounded-full ${contest.status === "ongoing" ? getStatusColor(contest.status) : ""}`}
                    >
                      {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">{contest.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-muted-foreground">
                      <div>{contest.participants} participants</div>
                      <div className="font-semibold text-primary">{contest.prize} prize</div>
                    </div>
                    <div className="text-right text-muted-foreground">
                      <div>Ends: {new Date(contest.endDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="rounded-xl min-w-10"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
