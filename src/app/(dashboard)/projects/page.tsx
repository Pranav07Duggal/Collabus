import { eq } from "drizzle-orm";
import { db } from "@/db";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { projects, projectSkills, skillsTable } from "@/db/schema";
import { MyProjectsView } from "@/modules/projects/ui/views/my-project-view";

export default async function MyProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
    // Step 1: Fetch all projects for the user
    const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, session.user.id));

  // Step 2: Fetch all projectSkills + skill names
  const skills = await db
    .select({
      projectId: projectSkills.projectId,
      name: skillsTable.name,
    })
    .from(projectSkills)
    .innerJoin(skillsTable, eq(projectSkills.skillId, skillsTable.id));

  // Step 3: Group skills by projectId
  const skillMap: Record<string, { name: string }[]> = {};
  for (const skill of skills) {
    if (!skillMap[skill.projectId]) skillMap[skill.projectId] = [];
    skillMap[skill.projectId].push({ name: skill.name });
  }

  // Step 4: Merge skills into projects
  const data = userProjects.map((project) => ({
    ...project,
    createdAt: project.createdAt?.toISOString() ?? "",
    updatedAt: project.updatedAt?.toISOString() ?? "",
    skills: skillMap[project.id] || [],
  }));


  return (
    <>
      <MyProjectsView initialProjects={data} />;
    </>
  );
}
