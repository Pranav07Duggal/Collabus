"use client"

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'

const MeetingsView = () => {

    const router = useRouter();
      const trpc = useTRPC(); 
      const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className='overflow-x-scroll'>MeetingsView<br/>
    {/* {JSON.stringify(data)} */}
    </div>
  )
}

export default MeetingsView