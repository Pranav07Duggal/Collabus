import { db } from '@/db';
import { userProfiles } from '@/db/schema';
import { auth } from '@/lib/auth';
import ProfileGuideView from '@/modules/profile/ui/view/profile-guide-view';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const ProfileGuidePage = async () => {
     const session = await auth.api.getSession({
              headers: await headers(),
              
            })
            if (!session) {
              redirect("/sign-in");
            }
    const [userHandle] = await db
            .select({handle: userProfiles.handle})
            .from(userProfiles)
            .where(eq(userProfiles.userId,session.user.id))

  return (
    <ProfileGuideView userHandle={userHandle.handle}/>
  )
}

export default ProfileGuidePage;