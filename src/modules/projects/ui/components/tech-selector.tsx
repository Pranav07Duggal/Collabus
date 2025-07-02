"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface TechStackSelectorProps {
  value: string[]; // these are skill IDs
  onChange: (stack: string[]) => void;
}

export function TechStackSelector({ value, onChange }: TechStackSelectorProps) {
  const trpc = useTRPC();

  const { data: globalSkills, isLoading } = useQuery(
      trpc.skills.getAllGlobalSkills.queryOptions()
  );

  const toggleTag = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="">
      <label className="text-sm font-medium text-muted-foreground">Tech Stack Used</label>
      <div className="flex flex-wrap gap-2 min-h-[40px] ">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-[40px]" />
            <Skeleton className="h-6 w-[50px]" />
            <Skeleton className="h-6 w-[30px]" />
            <Skeleton className="h-6 w-[60px]" />
          </>
        ) : (
          globalSkills?.map((skill) => (
            <Badge
              key={skill.id}
              onClick={() => toggleTag(skill.id)}
              className={cn(
                "cursor-pointer border mt-2",
                value.includes(skill.id)
                  ? "bg-green-600 text-white border-green-400"
                  : "bg-muted text-black border-gray-500 dark:text-white"
              )}
            >
              {skill.name}
            </Badge>
          ))
        )}
      </div>
    </div>
  );
}
