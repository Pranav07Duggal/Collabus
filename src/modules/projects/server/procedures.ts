import { z } from "zod";
import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { baseProjectSchema, likeProjectSchema } from "../schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { projects, projectLikes, skillsTable, projectSkills, userSkills } from "@/db/schema";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
    // like functions
  likeProject: protectedProcedure
    .input(likeProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const [existingProject] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projectId));

      if (!existingProject || existingProject.visibility !== "PUBLIC") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Project not public",
        });
      }

      await db.insert(projectLikes).values({
        userId: ctx.auth.user.id,
        projectId: input.projectId,
      });
    }),

  unlikeProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(projectLikes)
        .where(
          and(
            eq(projectLikes.projectId, input.projectId),
            eq(projectLikes.userId, ctx.auth.user.id)
          )
        );
    }),

    getProjectLikeInfo: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(projectLikes)
        .where(eq(projectLikes.projectId, input.projectId));
  
      const [liked] = await db
        .select()
        .from(projectLikes)
        .where(
          and(
            eq(projectLikes.projectId, input.projectId),
            eq(projectLikes.userId, ctx.auth.user.id)
          )
        );
  
      return {
        liked: !!liked,
        count: countResult?.count ?? 0,
      };
    }),
  
  // CRUD Procedures
  addProject: protectedProcedure
    .input(baseProjectSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;
  
      // Step 1: Create Project
      const [project] = await db
        .insert(projects)
        .values({
          ...input,
          userId,
        })
        .returning();
  
      if (!project) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Project creation failed" });
      }
  
      // Step 2: Link techStack skill IDs (if any)
      for (const skillId of input.techStack ?? []) {
        // a. Link to project
        await db.insert(projectSkills).values({
          projectId: project.id,
          skillId,
        });
  
        // b. Add to userSkills if not already present
        const [existing] = await db
          .select()
          .from(userSkills)
          .where(
            and(
              eq(userSkills.userId, userId),
              eq(userSkills.skillId, skillId)
            )
          )
          .limit(1);
  
        if (!existing) {
          await db.insert(userSkills).values({
            userId,
            skillId,
            level: "Novice",
            isVerified: false,
          });
        }
      }
  
      return project;
    }),

  getUserProjects: protectedProcedure.query(async ({ ctx }) => {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.userId, ctx.auth.user.id));
  }),

  updateProject: protectedProcedure
    .input(baseProjectSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;
  
      // Step 1: Update core project fields
      const [updated] = await db
        .update(projects)
        .set({
          title: input.title,
          description: input.description,
          githubUrl: input.githubUrl,
          visibility: input.visibility,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, input.id))
        .returning();
  
      if (!updated) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
      }
  
      // Step 2: Delete old links
      await db
        .delete(projectSkills)
        .where(eq(projectSkills.projectId, input.id));
  
      // Step 3: Re-insert selected skill links (skill IDs only)
      for (const skillId of input.techStack ?? []) {
        await db.insert(projectSkills).values({
          projectId: input.id,
          skillId,
        });
  
        // Step 4: Ensure user has it in their profile
        const [existing] = await db
          .select()
          .from(userSkills)
          .where(
            and(
              eq(userSkills.userId, userId),
              eq(userSkills.skillId, skillId)
            )
          )
          .limit(1);
  
        if (!existing) {
          await db.insert(userSkills).values({
            userId,
            skillId,
            level: "Novice",
            isVerified: false,
          });
        }
      }
  
      return updated;
    }),

  deleteProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.delete(projects).where(eq(projects.id, input.id));
    }),
});
