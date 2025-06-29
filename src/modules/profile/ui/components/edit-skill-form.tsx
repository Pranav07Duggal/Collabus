"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { toast } from "sonner";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditSkillForm({ userId }: { userId: string }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { data: globalSkills, isLoading } = useQuery(
    trpc.skills.getAllGlobalSkills.queryOptions()
  );

  const addSkills = useMutation(
    trpc.skills.addUserSkill.mutationOptions({
      onSuccess: () => {
        toast.success("Skills added!");
        queryClient.invalidateQueries(
          trpc.skills.getUserSkills.queryOptions({ userId })
        );
        setSelectedSkills([]);
      },
      onError: (err) => toast.error(err.message),
    })
  );

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedSkills.length === 0) return;
    addSkills.mutate({ skillIds: selectedSkills });
  };

  return (
    <Card className="shadow-2xl mb-5">
      <CardDescription className="ml-4 text-gray-800 font-semibold">
        Add the skills which describes you the best
      </CardDescription>
      <CardContent>
        <div className="flex flex-wrap gap-2 min-h-[48px]">
          { isLoading ? (
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
            globalSkills
            ?.map((skill) => (
            <Badge
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={clsx(
                "cursor-pointer max-h-7 bg-muted text-black border-2 border-gray-600",
                selectedSkills.includes(skill.id) && "bg-green-600 border-green-400 border-e-2 text-white transition-colors duration-300 ease",
              )}
            >
              {skill.name}
            </Badge>
          )))}
        </div>
      </CardContent>
      <div className="">

        <Button
          className="ml-4 hover:text-green-800 hover:bg-green-200"
          variant={"ghost"}
          onClick={handleSubmit}
          disabled={addSkills.isPending || selectedSkills.length === 0}
        >
          Add Selected Skills
        </Button>
      </div>
    </Card>
  );
}
