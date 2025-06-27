import { auth } from '@/lib/auth'
import { createUserProfile } from '@/lib/user-handle'
import HomeView from '@/modules/home/ui/views/home-view'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
    
  })
  if (!session) {
    redirect("/sign-in");
  }
  await createUserProfile(session.user.id);
  return (
    <HomeView/>
  )
}

export default Home