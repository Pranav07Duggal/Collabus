"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AgentIdViewHeader from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { CpuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import UpdateAgentDialog from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

const AgentIdView = ({ agentId }: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(
        trpc.agents.getOne.queryOptions({ id: agentId })
    );

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
                router.push("/agents");
            },
            onError: (error)=>{
                toast.error(error.message)
            }
        }))

        const [RemoveConfirmation, confirmRemove] = useConfirm(
            "Are you sure?",
            `The following action will remove agent ${data.name} and all data associated with it.`
        );

        const handleRemoveAgent = async () => {
            const ok = await confirmRemove();
            if (!ok) {
                return;
            }
            await removeAgent.mutateAsync({ id: agentId })
        }

    return (
        <>
        <RemoveConfirmation/>
        <UpdateAgentDialog
          open={updateAgentDialogOpen}
          onOpenChange={setUpdateAgentDialogOpen}
          initialValues={data}
        />
        <div className="flex flex-1 px-4 py-4 md:px-8 flex-col gap-y-4">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => setUpdateAgentDialogOpen(true)}
        onRemove={handleRemoveAgent}
        />

      <div className="bg-white rounded-lg border">
        <div className="px-4 py-5 gap-5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data.name}
              classname="size-10"
              />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant={"outline"}
            className="flex items-center gap-x-2 [&>svg]:size-4"
            >
            <CpuIcon />
          </Badge>
          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-medium">Instrutctions</p>
            <p className="text-neutral-800">{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
              </>
  );
};

export default AgentIdView;
