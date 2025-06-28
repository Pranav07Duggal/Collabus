
import { agentsRouter } from "@/modules/agents/server/procedures";
import { meetingsRouter } from "@/modules/meetings/server/procedures";
import { profilesRouter, skillsRouter } from "@/modules/profile/server/procedures";

import { createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
  profiles: profilesRouter,
  skills: skillsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;