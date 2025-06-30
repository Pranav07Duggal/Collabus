import { z } from "zod";

export const baseProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(300),
  githubUrl: z.string().url(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "COMPETITION"]),
  techStack: z.array(z.string().min(1)).optional().default([]),
  });

  export const likeProjectSchema = z.object({
    projectId: z.string(),
  })