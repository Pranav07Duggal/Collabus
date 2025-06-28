"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import SkillLevelGuide from "./skill-level-guide";
import { Button } from "@/components/ui/button";
import { BookOpenTextIcon } from 'lucide-react';
import UserSkillList from "./user-skill-list";

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
  
//   const getCompetitionBadge = (status: string) => {
//     switch (status) {
//       case "Winner":
//         return "bg-yellow-100 text-yellow-800 border-yellow-300";
//       case "Runner-up":
//         return "bg-gray-100 text-gray-800 border-gray-300";
//       case "Participant":
//         return "border-gray-300 text-gray-600";
//       default:
//         return "border-gray-300 text-gray-600";
//     }
//   };
  

interface Props {
  userId: string,
}

const SkillAndAchivementSection = ({userId}:Props) => {
  const [OpenSkillGuide, setOpenSkillGuide] = useState(false);

  return (
    <>
      <SkillLevelGuide
        open={OpenSkillGuide}
        onOpenChange={() => setOpenSkillGuide(false)}
      />
      <div className="space-y-6">
        <div className="flex gap-y-5 flex-col">
          <h2 className="text-2xl font-bold mb-4">Skills & Achievements</h2>
          <Button
            onClick={() => {
              setOpenSkillGuide(true);
            }}
          >
            <BookOpenTextIcon/>
            Open Skill Level Guide
          </Button>
          {/* Skills */}
          <UserSkillList
            userId={userId}
          />

          

          {/* Achievements */}
          {/* <Card>
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
                      <span className="font-medium">{achievement.name}</span>
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
          </Card> */}
        </div>
      </div>
    </>
  );
};

export default SkillAndAchivementSection;
