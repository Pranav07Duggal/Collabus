import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import UserProfileView from "@/modules/profile/ui/view/user-profile-view";
import { eq } from "drizzle-orm";

export default async function UserProfilePage({ params }: { params: { handle: string };}) {
  const  handle  = params.handle;

  const [profileData] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.handle, handle));

  if (!profileData) return <div>Profile Not found</div>;

  return (
    <UserProfileView
      userName={profileData.fullName ?? ""}
      userBio={profileData.bio ?? ""}
      userImage={profileData.profileImage ?? ""}
      userHandle={profileData.handle ?? ""}
      userGithubURL={profileData.githubUrl ?? ""}
      userId={profileData.userId??""}
    />
  );
}
