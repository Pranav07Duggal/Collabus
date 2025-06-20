import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import ListHeader from "@/modules/agents/ui/components/list-header";
import AgentsView from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const Agents = async () => {
  const session = await auth.api.getSession({
      headers: await headers(),
      
    })
    if (!session) {
      redirect("/sign-in");
    }

  const QueryClient = getQueryClient();
  void QueryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
    <ListHeader/>
    <HydrationBoundary state={dehydrate(QueryClient)}>
      <Suspense fallback={<LoadingState title="Loading Agents" description="This may take a few seconds"/>}>
      <AgentsView />
      </Suspense>
    </HydrationBoundary>
    </>
  );
};

export default Agents;
