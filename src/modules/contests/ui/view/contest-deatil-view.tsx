"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Users, Trophy, Target, Shield, Gift } from "lucide-react"

// Static dummy data (same as in listing page)
const contests = [
  {
    id: "1",
    title: "AI Innovation Challenge 2024",
    type: "Hackathon",
    status: "ongoing",
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    description:
      "Build innovative AI solutions for real-world problems. This challenge focuses on creating practical applications that can solve everyday challenges using artificial intelligence. Participants will have access to mentors, datasets, and cloud computing resources to bring their ideas to life.",
    participants: 245,
    prize: "$50,000",
    benefits: [
      { icon: Trophy, title: "Cash Prizes", description: "Win up to $50,000 in prizes" },
      { icon: Users, title: "Networking", description: "Connect with industry experts" },
      { icon: Target, title: "Skill Building", description: "Enhance your AI development skills" },
      { icon: Gift, title: "Swag & Goodies", description: "Exclusive merchandise for participants" },
    ],
  },
  {
    id: "2",
    title: "Sustainable Tech Ideas",
    type: "Ideathon",
    status: "upcoming",
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    description:
      "Generate ideas for sustainable technology solutions that can help address environmental challenges. This ideathon encourages creative thinking around green technology, renewable energy, waste reduction, and sustainable living practices.",
    participants: 150,
    prize: "$30,000",
    benefits: [
      { icon: Trophy, title: "Cash Prizes", description: "Win up to $30,000 in prizes" },
      { icon: Users, title: "Networking", description: "Connect with industry experts" },
      { icon: Target, title: "Skill Building", description: "Enhance your sustainable tech skills" },
      { icon: Gift, title: "Swag & Goodies", description: "Exclusive merchandise for participants" },
    ],
  },
  {
    id: "3",
    title: "Data Science Championship",
    type: "Kaggle Competition",
    status: "ended",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    description:
      "Compete in advanced data science challenges featuring real-world datasets and complex analytical problems. Participants will work with large datasets to build predictive models and extract meaningful insights.",
    participants: 300,
    prize: "$75,000",
    benefits: [
      { icon: Trophy, title: "Cash Prizes", description: "Win up to $75,000 in prizes" },
      { icon: Users, title: "Networking", description: "Connect with industry experts" },
      { icon: Target, title: "Skill Building", description: "Enhance your data science skills" },
      { icon: Gift, title: "Swag & Goodies", description: "Exclusive merchandise for participants" },
    ],
  },
  {
    id: "4",
    title: "Mobile App Development Sprint",
    type: "Hackathon",
    status: "upcoming",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    description:
      "48-hour mobile app development challenge where teams build innovative mobile applications from scratch. Focus on user experience, functionality, and creative problem-solving.",
    participants: 180,
    prize: "$40,000",
    benefits: [
      { icon: Trophy, title: "Cash Prizes", description: "Win up to $40,000 in prizes" },
      { icon: Users, title: "Networking", description: "Connect with industry experts" },
      { icon: Target, title: "Skill Building", description: "Enhance your mobile app development skills" },
      { icon: Gift, title: "Swag & Goodies", description: "Exclusive merchandise for participants" },
    ],
  },
  {
    id: "5",
    title: "Climate Change Solutions",
    type: "Ideathon",
    status: "ongoing",
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    description:
      "Brainstorm innovative solutions for climate challenges including carbon reduction, renewable energy adoption, and sustainable agriculture practices. Collaborate with experts and researchers in the field.",
    participants: 200,
    prize: "$60,000",
    benefits: [
      { icon: Trophy, title: "Cash Prizes", description: "Win up to $60,000 in prizes" },
      { icon: Users, title: "Networking", description: "Connect with industry experts" },
      { icon: Target, title: "Skill Building", description: "Enhance your climate change solutions skills" },
      { icon: Gift, title: "Swag & Goodies", description: "Exclusive merchandise for participants" },
    ],
  },
  {
    id: "6",
    title: "Machine Learning Mastery",
    type: "Kaggle Competition",
    status: "ended",
    startDate: "2023-11-15",
    endDate: "2023-12-15",
    description:
      "Advanced machine learning competition featuring complex datasets and challenging prediction tasks. Test your skills against data scientists from around the world.",
    participants: 220,
    prize: "$55,000",
    benefits: [
      { icon: Trophy, title: "Cash Prizes", description: "Win up to $55,000 in prizes" },
      { icon: Users, title: "Networking", description: "Connect with industry experts" },
      { icon: Target, title: "Skill Building", description: "Enhance your machine learning skills" },
      { icon: Gift, title: "Swag & Goodies", description: "Exclusive merchandise for participants" },
    ],
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

interface ContestDetailPageProps {
    contestId: string;
}

export default function ContestDetailView({ contestId }: ContestDetailPageProps) {
  console.log("ContestId:", contestId);

  const [activeTab, setActiveTab] = useState("overview")

  const contest = contests.find((c) => c.id === contestId)

  if (!contest) {
    notFound()
  }

  const getActionButton = () => {
    switch (contest.status) {
      case "upcoming":
        return (
          <Link href={`/contests/${contest.id}/register`}>
            <Button size="lg" className="w-full rounded-xl">
              Join Contest
            </Button>
          </Link>
        )
      case "ongoing":
        return (
          <Link href={`/contests/${contest.id}/leaderboard`}>
            <Button size="lg" className="w-full rounded-xl">
              View Leaderboard
            </Button>
          </Link>
        )
      case "ended":
        return (
          <Link href={`/contests/${contest.id}/results`}>
            <Button variant="outline" size="lg" className="w-full rounded-xl bg-transparent">
              View Results
            </Button>
          </Link>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Large Header Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-cyan-600/30 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-cyan-900/40" />
        <div className="absolute inset-0 bg-[url('/tech-competition-background.png')] opacity-20 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-16">
          <Link href="/contests">
            <Button variant="ghost" className="mb-6 rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contests
            </Button>
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6 text-foreground">{contest.title}</h1>
            <div className="flex gap-3 flex-wrap mb-6">
              <Badge variant="secondary" className="text-sm px-4 py-2 rounded-full">
                {contest.type}
              </Badge>
              <Badge
                variant={getStatusVariant(contest.status)}
                className={`text-sm px-4 py-2 rounded-full ${contest.status === "ongoing" ? getStatusColor(contest.status) : ""}`}
              >
                {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <Card className="rounded-2xl border-muted">
                <CardHeader>
                  <CardTitle>Contest Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{contest.description}</p>
                </CardContent>
              </Card>

              {/* Benefits Section */}
              <Card className="rounded-2xl border-muted">
                <CardHeader>
                  <CardTitle>Why Participate?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contest.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs Section */}
              <Card className="rounded-2xl border-muted">
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 rounded-t-2xl">
                      <TabsTrigger value="participants">Participants</TabsTrigger>
                      <TabsTrigger value="rules">Rules</TabsTrigger>
                      <TabsTrigger value="position">My Position</TabsTrigger>
                    </TabsList>
                    <div className="p-6">
                      <TabsContent value="participants" className="mt-0">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Contest Participants</h3>
                          <p className="text-muted-foreground">
                            {contest.participants} participants have joined this contest
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.from({ length: 6 }, (_, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium">Team {i + 1}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {Math.floor(Math.random() * 5) + 1} members
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="rules" className="mt-0">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Contest Rules</h3>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Shield className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Fair Play</h4>
                                <p className="text-sm text-muted-foreground">All submissions must be original work</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Users className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Team Size</h4>
                                <p className="text-sm text-muted-foreground">Maximum 4 members per team</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Calendar className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Submission Deadline</h4>
                                <p className="text-sm text-muted-foreground">
                                  All submissions must be made before the end date
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="position" className="mt-0">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">My Position</h3>
                          {contest.status === "upcoming" ? (
                            <p className="text-muted-foreground">
                              Contest hasn't started yet. Register to participate!
                            </p>
                          ) : (
                            <div className="text-center py-8">
                              <div className="text-3xl font-bold text-primary mb-2">#42</div>
                              <p className="text-muted-foreground">Your current ranking</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="rounded-2xl border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Contest Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Start Date</div>
                    <div className="text-lg">
                      {new Date(contest.startDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">End Date</div>
                    <div className="text-lg">
                      {new Date(contest.endDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Contest Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="font-semibold">{contest.participants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prize Pool</span>
                    <span className="font-semibold text-primary">{contest.prize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span>{contest.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant={getStatusVariant(contest.status)}
                      className={`rounded-full ${contest.status === "ongoing" ? getStatusColor(contest.status) : ""}`}
                    >
                      {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {getActionButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
