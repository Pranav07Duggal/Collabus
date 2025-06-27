import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { updateProfileSchema } from "../schemas";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const profilesRouter = createTRPCRouter({
  update: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;
      const [updatedProfile] = await db
        .update(userProfiles)
        .set({
          bio: input.bio,
          githubUrl: input.githubUrl,
        })
        .where(eq(userProfiles.userId, userId))
        .returning();
        console.log(updatedProfile)
      if (!updatedProfile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Profile not found for update.",
        });
      }

      return updatedProfile;
    }),


    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
          const [existingProfile] = await db
            .select()
            .from(userProfiles)
            .where(
                eq(userProfiles.userId, input.id),
            );
    
          if (!existingProfile) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Profile Not Found" });
          }
          return existingProfile;
        }),
    
});
