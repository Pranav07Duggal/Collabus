import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";
import { skillLevelEnum } from "@/db/schema";

export type ProfileGetOne = inferRouterOutputs<AppRouter>["profiles"]["update"];
export type SkillLevel = typeof skillLevelEnum.enumValues[number];
