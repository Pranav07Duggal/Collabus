"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import EditSkillForm from "./edit-skill-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BanIcon, EditIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const getSkillColor = (level: string) => {
  switch (level) {
    case "Novice":
      return "bg-red-100 text-red-800 ";
    case "Beginner":
      return "bg-orange-100 text-orange-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 ";
    case "Proficient":
      return "bg-blue-100 text-blue-800 ";
    case "Advanced":
      return "bg-green-100 text-green-800 ";
    case "Expert":
      return "bg-indigo-100 text-indigo-800 ";
    case "Master":
      return "bg-purple-200 text-purple-800 ";
    default:
      return "bg-gray-100 text-gray-800 ";
  }
};

const levelOrder = [
  "Master",
  "Expert",
  "Advanced",
  "Proficient",
  "Intermediate",
  "Beginner",
  "Novice",
];

export default function UserSkillList({ userId }: { userId: string }) {
  const trpc = useTRPC();
  const [editing, setEditing] = useState(false);

  const { data: userSkills, isLoading } = useQuery(
    trpc.skills.getUserSkills.queryOptions({ userId })
  );

  return (
    <>
      <Card className="">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Technical Skills</CardTitle>
                  <CardDescription>
                    Skills with their proficiency levels
                  </CardDescription>
                </div>
                <div className="flex justify-between gap-x-2 gap-y-2 text-center">
                  <Button
                    className="gap-x-2 bg-muted"
                    onClick={() => setEditing(!editing)}
                    variant={"outline"}
                    size={"sm"}
                  >
                    {editing ? (
                      <>
                        <BanIcon className="text-red-500" />
                        Close Menu
                      </>
                    ) : (
                      <>
                        <EditIcon className="h-4 w-4 mr-2" />
                        Add Skills to your profile
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 min-h-[48px]">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-[25px] bg-purple-200" />
                <Skeleton className="h-4 w-[30px] bg-red-200" />
                <Skeleton className="h-4 w-[25px] bg-green-200" />
                <Skeleton className="h-4 w-[20px] bg-indigo-200" />
                <Skeleton className="h-4 w-[35px] bg-yellow-200" />
                <Skeleton className="h-4 w-[20px] bg-gray-200" />
                <Skeleton className="h-4 w-[45px] bg-orange-200" />
                <Skeleton className="h-4 w-[35px] bg-red-200" />
              </>
            ) : (
              userSkills
                ?.slice()
                .sort(
                  (a, b) =>
                    levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level)
                )
                .map((skill) => (
                  <div key={skill.skillId}>
                    <Badge
                      variant="secondary"
                      className={`${getSkillColor(
                        skill.level
                      )} transition-colors`}
                    >
                      {skill.skillName}
                    </Badge>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
      {editing && (
        <div className="animate-fade-in">
          <EditSkillForm userId={userId} />
        </div>
      )}
    </>
  );
}
