import { LoadingState } from '@/components/loading-state';
import { auth } from '@/lib/auth';
import MeetingListHeader from '@/modules/meetings/ui/components/meeting-list-header';
import MeetingsView from '@/modules/meetings/ui/views/meetings-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

const MeetingsPage = async () => {

    const session = await auth.api.getSession({
          headers: await headers(),
          
        })
        if (!session) {
          redirect("/sign-in");
        }
    const queeryClient = getQueryClient();
    void queeryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )
  return (
    <>
    <MeetingListHeader/>
    <HydrationBoundary state={dehydrate(queeryClient)}>
        <Suspense fallback={<LoadingState title='Loading Meetings' description='Hang tight'/>}>
        <MeetingsView/>

        </Suspense>
    </HydrationBoundary>
    </>
  )
}

export default MeetingsPage