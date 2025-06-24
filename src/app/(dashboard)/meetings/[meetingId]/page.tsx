import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import MeetingIdView from "@/modules/meetings/ui/views/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}
const MeetingIdPage = async ({ params }: Props) => {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback = { <LoadingState title="Loading your Meeting" description="Setting up Meeting Environment"/>}>
        <MeetingIdView meetingId={meetingId}/>
        </Suspense>
    </HydrationBoundary>
  );
};

export default MeetingIdPage;
