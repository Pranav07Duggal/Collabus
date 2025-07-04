import { LoadingState } from "@/components/loading-state";
import AgentIdView from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ agentId: string }>;
}

const AgentId = async ({ params }: Props) => {
  const {agentId} = await params; 

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  )
  return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<LoadingState title="Loading Agent Data" description="Hang Tight"/>}>
        <AgentIdView agentId={agentId}/>
    </Suspense>
  </HydrationBoundary>
    );
};

export default AgentId;
