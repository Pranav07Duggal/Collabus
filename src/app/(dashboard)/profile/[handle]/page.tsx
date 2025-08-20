import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import ProfilePage from "@/modules/profile/ui/view/profile-public-view";
import { eq } from "drizzle-orm";

interface Props { params: { handle: string };}

export default async function UserProfilePage({ params }: Props ) {
  const  handle  = params.handle;

  const [profileData] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.handle, handle));

  if (!profileData) return <div>Profile Not found</div>;

  return (
    <ProfilePage
    />
  );
}
