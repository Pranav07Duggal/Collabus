import { db } from "@/db";
import { user, userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUserProfile(userId: string) {
    const [existingUser] = await db
      .select({ email: user.email, name: user.name, profielImage: user.image })
      .from(user)
      .where(eq(user.id, userId));
  
    if (!existingUser) throw new Error("User not found");
  
    const [profileExists] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
  
    if (profileExists) return;
  
    const handle = existingUser.email.split("@")[0];
  
    await db.insert(userProfiles).values({
      userId,
      handle,
      fullName: existingUser.name ?? "",
      profileImage: existingUser.profielImage?? "",
    });
  }
  