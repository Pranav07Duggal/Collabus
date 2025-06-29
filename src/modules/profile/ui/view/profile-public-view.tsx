"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
} from "lucide-react";
import ProfileSectionOne from "../components/profile-section-one";
import React, { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { queryOptions, useQuery } from "@tanstack/react-query";

// Sample data - replace with real data
const profileData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  bio: "Full-stack developer passionate about creating innovative solutions. I love working with modern technologies and participating in coding competitions.",
  avatar: "/placeholder.svg?height=120&width=120",
  location: "San Francisco, CA",
  github: "https://github.com/alexjohnson",
  linkedin: "https://linkedin.com/in/alexjohnson",
  skills: [
    { name: "JavaScript", level: "ADVANCED" },
    { name: "React", level: "ADVANCED" },
    { name: "Node.js", level: "INTERMEDIATE" },
    { name: "Python", level: "INTERMEDIATE" },
    { name: "TypeScript", level: "ADVANCED" },
    { name: "Docker", level: "BEGINNER" },
    { name: "AWS", level: "INTERMEDIATE" },
    { name: "GraphQL", level: "BEGINNER" },
  ],
  achievements: [
    { name: "HackTech 2024", status: "Winner", type: "🥇" },
    { name: "CodeJam Global", status: "Runner-up", type: "🥈" },
    { name: "DevFest Hackathon", status: "Participant", type: "🏅" },
    { name: "AI Challenge 2023", status: "Winner", type: "🥇" },
    { name: "Open Source Contest", status: "Participant", type: "🏅" },
  ],
  projects: [
    {
      name: "TaskFlow Pro",
      description:
        "A comprehensive project management tool with real-time collaboration features.",
      github: "https://github.com/alexjohnson/taskflow-pro",
      techStack: ["React", "Node.js", "MongoDB", "Socket.io"],
      competition: "Winner - HackTech 2024",
    },
    {
      name: "Weather Analytics",
      description:
        "Machine learning-powered weather prediction dashboard with interactive visualizations.",
      github: "https://github.com/alexjohnson/weather-analytics",
      techStack: ["Python", "TensorFlow", "React", "D3.js"],
      competition: "Runner-up - CodeJam Global",
    },
    {
      name: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration and admin dashboard.",
      github: "https://github.com/alexjohnson/ecommerce-platform",
      techStack: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      competition: null,
    },
    {
      name: "Code Snippet Manager",
      description:
        "Developer tool for organizing and sharing code snippets with syntax highlighting.",
      github: "https://github.com/alexjohnson/snippet-manager",
      techStack: ["Vue.js", "Firebase", "Prism.js"],
      competition: null,
    },
  ],
};

const getSkillColor = (level: string) => {
  switch (level) {
    case "BEGINNER":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    case "INTERMEDIATE":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "ADVANCED":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const getCompetitionBadge = (status: string) => {
  switch (status) {
    case "Winner":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Runner-up":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "Participant":
      return "border-gray-300 text-gray-600";
    default:
      return "border-gray-300 text-gray-600";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};
interface Props {
  userName: string;
  userHandle: string;
  userBio: string;
  userImage: string;
  userGithubURL: string;
  userId: string;
}
export default function UserProfileView({
  userName,
  userHandle,
  userBio,
  userImage,
  userGithubURL,
  userId,
}: Props) {
  return (
    <>
      <div className="h-max bg-muted py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
            <Card className="overflow-hidden">
              <ProfileSectionOne
                userName={userName}
                userBio={userBio}
                userImage={userImage}
                userHandle={userHandle}
                userGithubURL={userGithubURL}
              />
            </Card>
            
          <Separator />

          {/* Skills & Achievements Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Skills & Achievements</h2>

              {/* Skills */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Technical Skills</CardTitle>
                  <CardDescription>
                    Proficiency levels: Beginner • Intermediate • Advanced
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        //   initial={{ opacity: 0, scale: 0.8 }}
                        //   animate={{ opacity: 1, scale: 1 }}
                        //   transition={{ delay: index * 0.1 }}
                      >
                        <Badge
                          variant="secondary"
                          className={`${getSkillColor(
                            skill.level
                          )} transition-colors`}
                        >
                          {skill.name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Competition Achievements
                  </CardTitle>
                  <CardDescription>
                    Recent competition participations and results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profileData.achievements.map((achievement, index) => (
                      <div
                        key={achievement.name}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        //   initial={{ opacity: 0, x: -20 }}
                        //   animate={{ opacity: 1, x: 0 }}
                        //   transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{achievement.type}</span>
                          <span className="font-medium">
                            {achievement.name}
                          </span>
                        </div>
                        <Badge
                          variant={
                            achievement.status === "Participant"
                              ? "outline"
                              : "secondary"
                          }
                          className={getCompetitionBadge(achievement.status)}
                        >
                          {achievement.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Projects Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.projects.map((project, index) => (
                <div
                  key={project.name}
                  // initial={{ opacity: 0, y: 20 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">
                          {project.name}
                        </CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      {project.competition && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          🏆 {project.competition}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
