import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/agents/params";
import ListHeader from "@/modules/agents/ui/components/list-header";
import AgentsView from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import React, { Suspense } from "react";

interface Props {
  searchParams : Promise<SearchParams>
}


const Agents = async ({searchParams}:Props) => {

  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
      headers: await headers(),
      
    })
    if (!session) {
      redirect("/sign-in");
    }

  const QueryClient = getQueryClient();
  void QueryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...filters}));

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
