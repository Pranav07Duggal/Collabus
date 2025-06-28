"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { toast } from "sonner";

export default function EditSkillForm({ userId }: { userId: string }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { data: globalSkills, isLoading } = useQuery(
    trpc.skills.getAllGlobalSkills.queryOptions()
  );

  const addSkills = useMutation(trpc.skills.addUserSkill.mutationOptions({
    onSuccess: () => {
      toast.success("Skills added!");
      queryClient.invalidateQueries(trpc.skills.getUserSkills.queryOptions({ userId }));
      setSelectedSkills([]);
    },
    onError: (err) => toast.error(err.message),
  }));

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedSkills.length === 0) return;
    addSkills.mutate({  skillIds: selectedSkills });
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {globalSkills?.map((skill) => (
          <Badge
            key={skill.id}
            onClick={() => toggleSkill(skill.id)}
            className={clsx(
              "cursor-pointer",
              selectedSkills.includes(skill.id) && "bg-primary text-white"
            )}
          >
            {skill.name}
          </Badge>
        ))}
      </div>

      <Button
        className="mt-4"
        onClick={handleSubmit}
        disabled={addSkills.isPending || selectedSkills.length === 0}
      >
        Add Selected Skills
      </Button>
    </div>
  );
}
