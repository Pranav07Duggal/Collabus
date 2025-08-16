import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, team: "AI Innovators", score: 2450, members: ["Alex J.", "Sarah C.", "Mike R."], status: "leading" },
  { rank: 2, team: "Code Crushers", score: 2380, members: ["Emily D.", "David K."], status: "close" },
  { rank: 3, team: "Tech Titans", score: 2290, members: ["Lisa W.", "John S.", "Amy L."], status: "competitive" },
  { rank: 4, team: "Data Dynamos", score: 2150, members: ["Chris P.", "Maya T."], status: "competitive" },
  { rank: 5, team: "Innovation Squad", score: 2080, members: ["Ryan B.", "Zoe M.", "Nick F."], status: "competitive" },
  { rank: 6, team: "Future Builders", score: 1950, members: ["Kate H.", "Tom W."], status: "competitive" },
  { rank: 7, team: "Smart Solutions", score: 1890, members: ["Ben L.", "Grace K.", "Sam D."], status: "competitive" },
  { rank: 8, team: "Code Warriors", score: 1820, members: ["Mia R.", "Jake T."], status: "competitive" },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />
    default:
      return (
        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
          {rank}
        </div>
      )
  }
}

interface LeaderboardPageProps {
  params: {
    contestId: string
  }
}

export default function LeaderboardPage({ params }: LeaderboardPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href={`/contests/${params.contestId}`}>
            <Button variant="ghost" className="mb-6 rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contest
            </Button>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Contest Leaderboard</h1>
            <p className="text-muted-foreground">Live rankings updated every 5 minutes</p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {leaderboardData.slice(0, 3).map((team, index) => (
              <Card
                key={team.rank}
                className={`rounded-2xl border-muted ${index === 0 ? "md:order-2 ring-2 ring-yellow-500/20" : index === 1 ? "md:order-1" : "md:order-3"}`}
              >
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">{getRankIcon(team.rank)}</div>
                  <CardTitle className="text-lg">{team.team}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">{team.score}</div>
                  <div className="text-sm text-muted-foreground">{team.members.join(", ")}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="rounded-2xl border-muted">
            <CardHeader>
              <CardTitle>Full Rankings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {leaderboardData.map((team, index) => (
                  <div
                    key={team.rank}
                    className={`flex items-center gap-4 p-4 border-b border-muted last:border-b-0 ${
                      team.rank <= 3 ? "bg-muted/20" : ""
                    } ${team.rank === 42 ? "bg-primary/10 border-primary/20" : ""}`}
                  >
                    <div className="flex items-center justify-center w-12">{getRankIcon(team.rank)}</div>

                    <div className="flex-1">
                      <div className="font-semibold">{team.team}</div>
                      <div className="text-sm text-muted-foreground">{team.members.join(", ")}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold">{team.score}</div>
                      <Badge variant="outline" className="text-xs rounded-full">
                        {team.status}
                      </Badge>
                    </div>
                  </div>
                ))}

                {/* Your team position if not in top 8 */}
                <div className="flex items-center gap-4 p-4 bg-primary/10 border-primary/20 border-2 rounded-b-2xl">
                  <div className="flex items-center justify-center w-12">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      42
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold">Your Team</div>
                    <div className="text-sm text-muted-foreground">You, Alex J., Sarah C.</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold">1250</div>
                    <Badge variant="outline" className="text-xs rounded-full">
                      climbing
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
