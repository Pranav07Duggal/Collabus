import { z } from "zod";

export const updateProfileSchema = z.object({
  id: z.string().min(1,{message:"Id is required."}),
  bio: z.string().max(500).optional(),
  githubUrl: z.string().url().optional(),
});

export const skillLevelSchema = z.enum([
  "Novice",
  "Beginner",
  "Intermediate",
  "Proficient",
  "Advanced",
  "Expert",
  "Master",
]);

export const  addUserSkillSchema = z.object({
  skillIds: z.array(z.string()).min(1),
  level: skillLevelSchema.optional(), // This is Zod, safe to use .optional()
});