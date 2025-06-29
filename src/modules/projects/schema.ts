import { z } from "zod";

export const baseProjectSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(300),
    githubUrl: z.string().url(),
    visibility: z.enum(["PUBLIC", "PRIVATE", "COMPETITION"]),
  });

  export const likeProjectSchema = z.object({
    projectId: z.string(),
  })