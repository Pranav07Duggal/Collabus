"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Lightbulb,
  FileText,
  Wrench,
  Rocket,
  TestTube,
  Globe,
  RotateCcw,
  CheckCircle,
  Users,
  ExternalLink,
  Github,
  FileSliders,
  BookOpen,
  Calendar,
  UserPlus,
  Edit,
  Settings,
} from "lucide-react";
import { JoinProjectDialog } from "@/modules/projects/ui/components/join-project-dialog";
import { ProjectUpdateDialog } from "@/modules/projects/ui/components/projects-update-dialog";
import { ContributorManagementDialog } from "@/modules/projects/ui/components/contributor-management-dialog";

const phaseIcons = {
  "idea/brainstorming": Lightbulb,
  planning: FileText,
  "designing architecture": Wrench,
  mvp: Rocket,
  "testing/feedback": TestTube,
  "deployment/demo": Globe,
  iteration: RotateCcw,
  LIVE: CheckCircle,
};

const phaseColors = {
  "idea/brainstorming":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  planning: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  "designing architecture":
    "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  mvp: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  "testing/feedback":
    "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
  "deployment/demo":
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  iteration:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
  LIVE: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
};

// Mock data - in real app this would come from API
const mockProject = {
  id: "1",
  title: "EcoTrack - Carbon Footprint Tracker",
  tagline:
    "Track and reduce your environmental impact with AI-powered insights",
  phase: "mvp" as keyof typeof phaseIcons,
  progress: 65,
  problemStatement:
    "Many people want to reduce their carbon footprint but lack the tools and knowledge to track and understand their environmental impact effectively.",
  impact:
    "Help individuals and families reduce their carbon emissions by 20-30% through personalized tracking and actionable recommendations.",
  category: "Environmental Tech",
  techStack: ["React", "Next.js", "TypeScript", "Supabase", "TailwindCSS"],
  contributors: [
    {
      name: "Sarah Chen",
      role: "Project Lead",
      avatar: "/diverse-woman-portrait.png",
      github: "sarahchen",
      linkedin: "sarahchen",
    },
    {
      name: "Mike Johnson",
      role: "Full Stack Developer",
      avatar: "/thoughtful-man.png",
      github: "mikej",
      linkedin: "mikejohnson",
    },
    {
      name: "Lisa Wang",
      role: "UI/UX Designer",
      avatar: "/woman-2.png",
      github: "lisawang",
      linkedin: "lisawang",
    },
  ],
  mentors: [
    {
      name: "Dr. James Smith",
      role: "Environmental Advisor",
      avatar: "/man-2.png",
      linkedin: "drjamessmith",
    },
  ],
  resources: {
    github: "https://github.com/ecotrack/app",
    slides: "https://docs.google.com/presentation/d/ecotrack-pitch",
    documentation: "https://ecotrack.notion.site/docs",
    demo: "https://ecotrack-demo.vercel.app",
  },
  milestones: [
    {
      date: "2025-01-15",
      description: "Project ideation and team formation completed",
    },
    {
      date: "2025-02-01",
      description: "Technical architecture and design system finalized",
    },
    { date: "2025-02-20", description: "Core tracking features implemented" },
    { date: "2025-03-05", description: "AI recommendation engine integrated" },
  ],
  updates: [
    {
      date: "2025-03-10",
      description: "MVP completed and tested with 15 beta users",
    },
    {
      date: "2025-03-08",
      description: "AI recommendation accuracy improved to 85%",
    },
    {
      date: "2025-03-05",
      description: "User authentication and data sync implemented",
    },
  ],
  isOwner: true,
  pendingRequests: [
    {
      id: "1",
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Backend Developer",
      message:
        "I have 3 years of experience with Node.js and would love to contribute to this environmental project.",
      requestedAt: "2025-03-12",
    },
    {
      id: "2",
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Data Scientist",
      message:
        "I'm passionate about environmental data analysis and have experience with ML models for sustainability.",
      requestedAt: "2025-03-11",
    },
  ],
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showContributorDialog, setShowContributorDialog] = useState(false);

  const project = mockProject; // In real app, fetch by params.id
  const PhaseIcon = phaseIcons[project.phase];

  const phases = [
    "idea/brainstorming",
    "planning",
    "designing architecture",
    "mvp",
    "testing/feedback",
    "deployment/demo",
    "iteration",
    "LIVE",
  ];
  const currentPhaseIndex = phases.indexOf(project.phase);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </div>

        {/* Project Header */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground">{project.tagline}</p>

              <div className="flex items-center gap-4">
                <Badge className={`${phaseColors[project.phase]} border-0`}>
                  <PhaseIcon className="h-4 w-4 mr-2" />
                  {project.phase}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>
            </div>

            <div className="flex gap-2">
              {project.isOwner ? (
                <>
                  <Button
                    onClick={() => setShowUpdateDialog(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Update Project
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowContributorDialog(true)}
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Manage Team
                    {project.pendingRequests.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-1 h-5 w-5 p-0 text-xs"
                      >
                        {project.pendingRequests.length}
                      </Badge>
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setShowJoinDialog(true)}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Request to Join
                </Button>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="text-foreground font-medium">
                {project.progress}%
              </span>
            </div>
            <Progress value={project.progress} className="h-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Problem Statement
                  </h4>
                  <p className="text-muted-foreground">
                    {project.problemStatement}
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Expected Impact
                  </h4>
                  <p className="text-muted-foreground">{project.impact}</p>
                </div>
              </CardContent>
            </Card>

            {/* Phase Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {phases.map((phase, index) => {
                    const PhaseIcon =
                      phaseIcons[phase as keyof typeof phaseIcons];
                    const isCompleted = index < currentPhaseIndex;
                    const isCurrent = index === currentPhaseIndex;

                    return (
                      <div key={phase} className="flex items-center">
                        <div
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                            isCompleted
                              ? "bg-green-100 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                              : isCurrent
                              ? phaseColors[phase as keyof typeof phaseColors] +
                                " border-current"
                              : "bg-muted border-muted text-muted-foreground"
                          }`}
                        >
                          <PhaseIcon className="h-4 w-4" />
                          <span className="text-sm capitalize">{phase}</span>
                        </div>
                        {index < phases.length - 1 && (
                          <div
                            className={`w-4 h-px mx-2 ${
                              isCompleted ? "bg-green-400" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.updates.map((update, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {update.date}
                        </p>
                        <p className="text-foreground">{update.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team */}
            <Card>
              <CardHeader>
                <CardTitle>Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Contributors
                  </h4>
                  <div className="space-y-3">
                    {project.contributors.map((contributor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={contributor.avatar || "/placeholder.svg"}
                            alt={contributor.name}
                          />
                          <AvatarFallback>
                            {contributor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {contributor.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {contributor.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {project.mentors.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Mentors
                      </h4>
                      <div className="space-y-3">
                        {project.mentors.map((mentor, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={mentor.avatar || "/placeholder.svg"}
                                alt={mentor.name}
                              />
                              <AvatarFallback>
                                {mentor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">
                                {mentor.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {mentor.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.resources.github && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    asChild
                  >
                    <a
                      href={project.resources.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub Repository
                    </a>
                  </Button>
                )}
                {project.resources.slides && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    asChild
                  >
                    <a
                      href={project.resources.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileSliders className="h-4 w-4 mr-2" />
                      Presentation Slides
                    </a>
                  </Button>
                )}
                {project.resources.documentation && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    asChild
                  >
                    <a
                      href={project.resources.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Documentation
                    </a>
                  </Button>
                )}
                {project.resources.demo && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    asChild
                  >
                    <a
                      href={project.resources.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {milestone.date}
                        </p>
                        <p className="text-sm text-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <JoinProjectDialog
        open={showJoinDialog}
        onOpenChange={setShowJoinDialog}
        projectTitle={project.title}
        projectLead={project.contributors[0]?.name || "Project Lead"}
      />

      <ProjectUpdateDialog
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
        project={project}
      />

      <ContributorManagementDialog
        open={showContributorDialog}
        onOpenChange={setShowContributorDialog}
        project={project}
      />
    </div>
  );
}
