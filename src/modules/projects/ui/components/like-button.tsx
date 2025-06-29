"use client";

import { Star, Star as StarFilled } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export function LikeButton({ projectId }: { projectId: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  
  
  const trpc = useTRPC();
  const QueryClient = useQueryClient();
  const likeInfoQuery = trpc.projects.getProjectLikeInfo.queryOptions({
      projectId,
    });
    
    const { data } = useQuery(likeInfoQuery);
    
    const likeProject = useMutation(
        trpc.projects.likeProject.mutationOptions({
            onSuccess: () => {
                QueryClient.invalidateQueries(likeInfoQuery);
                toast.success("Starred!");
      },
      onError: (error) => {
          toast.error(error.message || "Could not star project");
        },
    })
);

const unlikeProject = useMutation(
    trpc.projects.unlikeProject.mutationOptions({
        onSuccess: () => {
            QueryClient.invalidateQueries(likeInfoQuery);
            toast.success("Unstarred!");
        },
        onError: (error) => {
            toast.error(error.message || "Could not unstar project");
        },
    })
);

const handleToggle = () => {
    if (liked) {
      setLiked(false);
      setCount((c) => c - 1);
      unlikeProject.mutate({ projectId });
    } else {
      setLiked(true);
      setCount((c) => c + 1);
      likeProject.mutate({ projectId });
    }
  };

useEffect(() => {
  if (data) {
    setLiked(data.liked);
    setCount(data.count);
  }
}, [data]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="flex items-center gap-1"
    >
      {liked ? (
        <StarFilled className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ) : (
        <Star className="w-4 h-4" />
      )}
      <span>{count}</span>
    </Button>
  );
}
