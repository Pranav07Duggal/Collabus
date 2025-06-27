import { z } from "zod";

export const updateProfileSchema = z.object({
  id: z.string().min(1,{message:"Id is required."}),
  bio: z.string().max(500).optional(),
  githubUrl: z.string().url().optional(),
});
