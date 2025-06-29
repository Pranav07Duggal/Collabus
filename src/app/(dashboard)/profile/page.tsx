import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { auth } from "@/lib/auth";
import ProfilePrivateView from "@/modules/profile/ui/view/profile-private-view";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const ProfileGuidePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const [userHandle] = await db
    .select({ handle: userProfiles.handle })
    .from(userProfiles)
    .where(eq(userProfiles.userId, session.user.id));

  const [profileData] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId,session.user.id));

  if (!profileData) return <div>Profile Not found</div>;

  return (
    <ProfilePrivateView
      userName={profileData.fullName ?? ""}
      userBio={profileData.bio ?? ""}
      userImage={profileData.profileImage ?? ""}
      userHandle={profileData.handle ?? ""}
      userGithubURL={profileData.githubUrl ?? ""}
      userId={profileData.userId??""}
    />
  )
};

export default ProfileGuidePage;
