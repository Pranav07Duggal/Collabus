import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Medal, Award, Download, ExternalLink } from "lucide-react"

// Mock results data
const finalResults = [
  {
    rank: 1,
    team: "AI Innovators",
    finalScore: 2450,
    members: ["Alex Johnson", "Sarah Chen", "Mike Rodriguez"],
    project: "Smart City Traffic Optimizer",
    prize: "$25,000",
  },
  {
    rank: 2,
    team: "Code Crushers",
    finalScore: 2380,
    members: ["Emily Davis", "David Kim"],
    project: "AI-Powered Healthcare Assistant",
    prize: "$15,000",
  },
  {
    rank: 3,
    team: "Tech Titans",
    finalScore: 2290,
    members: ["Lisa Wang", "John Smith", "Amy Lee"],
    project: "Sustainable Energy Predictor",
    prize: "$10,000",
  },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-8 w-8 text-yellow-500" />
    case 2:
      return <Medal className="h-8 w-8 text-gray-400" />
    case 3:
      return <Award className="h-8 w-8 text-amber-600" />
    default:
      return (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-lg font-semibold">
          {rank}
        </div>
      )
  }
}

interface ResultsPageProps {
  params: {
    contestId: string
  }
}

export default function ResultsPage({ params }: ResultsPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link href={`/contests/${params.contestId}`}>
            <Button variant="ghost" className="mb-6 rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contest
            </Button>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Contest Results</h1>
            <p className="text-muted-foreground text-lg">
              Congratulations to all participants! Here are the final results.
            </p>
          </div>

          {/* Winners Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {finalResults.map((team, index) => (
              <Card
                key={team.rank}
                className={`rounded-2xl border-muted ${index === 0 ? "md:order-2 ring-2 ring-yellow-500/20 scale-105" : index === 1 ? "md:order-1" : "md:order-3"}`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">{getRankIcon(team.rank)}</div>
                  <CardTitle className="text-xl">{team.team}</CardTitle>
                  <Badge variant="outline" className="mx-auto rounded-full">
                    {team.rank === 1 ? "Winner" : team.rank === 2 ? "1st Runner-up" : "2nd Runner-up"}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-3xl font-bold text-primary">{team.finalScore}</div>
                  <div className="text-lg font-semibold text-green-600">{team.prize}</div>
                  <div className="text-sm font-medium">{team.project}</div>
                  <div className="text-sm text-muted-foreground">{team.members.join(", ")}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle>Winning Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {finalResults.map((team) => (
                  <div key={team.rank} className="border-l-4 border-primary/20 pl-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getRankIcon(team.rank)}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{team.project}</h3>
                        <p className="text-muted-foreground mb-2">by {team.team}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Project
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-muted">
              <CardHeader>
                <CardTitle>Contest Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <div className="text-2xl font-bold text-primary">245</div>
                    <div className="text-sm text-muted-foreground">Total Participants</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <div className="text-2xl font-bold text-primary">67</div>
                    <div className="text-sm text-muted-foreground">Teams Formed</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <div className="text-2xl font-bold text-primary">52</div>
                    <div className="text-sm text-muted-foreground">Projects Submitted</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-sm text-muted-foreground">Days Duration</div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <h4 className="font-semibold">Your Performance</h4>
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Final Rank</span>
                      <span className="text-xl font-bold">#8</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Final Score</span>
                      <span className="text-xl font-bold">1820</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Team</span>
                      <span>Code Warriors</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificate Download */}
          <Card className="rounded-2xl border-muted mt-8">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">Download Your Certificate</h3>
              <p className="text-muted-foreground mb-6">
                Congratulations on completing the contest! Download your participation certificate.
              </p>
              <Button size="lg" className="rounded-xl">
                <Download className="h-5 w-5 mr-2" />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
