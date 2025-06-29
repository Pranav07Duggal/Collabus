import { z } from "zod";
import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { baseProjectSchema, likeProjectSchema } from "../schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { projects, projectLikes } from "@/db/schema";
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
    .mutation(async ({ ctx, input }) => {
      await db.insert(projects).values({
        userId: ctx.auth.user.id,
        ...input,
      });
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
      await db
        .update(projects)
        .set({
          title: input.title,
          description: input.description,
          githubUrl: input.githubUrl,
          visibility: input.visibility,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, input.id));
    }),

  deleteProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.delete(projects).where(eq(projects.id, input.id));
    }),
});
