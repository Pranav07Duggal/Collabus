import { db } from "@/db";
import {
  skillLevelEnum,
  skillsTable,
  userProfiles,
  userSkills,
} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { addUserSkillSchema, updateProfileSchema } from "../schemas";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { SkillLevel } from "../types";

// Skills Router
export const skillsRouter = createTRPCRouter({
  addGlobalSkill: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const [existing] = await db
        .select()
        .from(skillsTable)
        .where(eq(skillsTable.name, input.name));

      if (existing)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Skill already exists",
        });

      const [created] = await db
        .insert(skillsTable)
        .values({ name: input.name })
        .returning();

      return created;
    }),
  // get all skills name
  getAllGlobalSkills: protectedProcedure.query(async () => {
    const allSkills = await db
      .select()
      .from(skillsTable)
      .orderBy(skillsTable.name);
    return allSkills;
  }),

  //add skill to user
  addUserSkill: protectedProcedure
    .input(addUserSkillSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;
  
      // Fetch existing skills for this user
      const existingSkills = await db
        .select({ skillId: userSkills.skillId })
        .from(userSkills)
        .where(eq(userSkills.userId, userId));
  
      const existingSkillIds = new Set(existingSkills.map((s) => s.skillId));
  
      // Filter out skills that already exist
      const newSkills = input.skillIds
        .filter((id) => !existingSkillIds.has(id))
        .map((skillId) => ({
          skillId,
          userId,
          level: "Beginner" as const,
          isVerified: false,
        }));
  
      if (newSkills.length === 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "All selected skills are already added.",
        });
      }
  
      const inserted = await db.insert(userSkills).values(newSkills).returning();
      return inserted;
    }),

  getUserSkills: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select({
          id: userSkills.id,
          name: skillsTable.name,
          level: userSkills.level,
          isVerified: userSkills.isVerified,
          skillId: userSkills.skillId,
          skillName: skillsTable.name,
        })
        .from(userSkills)
        .innerJoin(skillsTable, eq(userSkills.skillId, skillsTable.id))
        .where(eq(userSkills.userId, input.userId));
    }),
});

// Profiles Router
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
      console.log(updatedProfile);
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
        .where(eq(userProfiles.userId, input.id));

      if (!existingProfile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Profile Not Found",
        });
      }
      return existingProfile;
    }),
});
