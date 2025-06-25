interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import CallView from "@/modules/call/ui/view/call-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Setting Up Meeting Environment"
            description="This may take a few seconds"
          />
        }
      >
        <CallView meetingId={meetingId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
