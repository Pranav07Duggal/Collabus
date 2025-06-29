import { eq } from "drizzle-orm";
import { db } from "@/db";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { projects } from "@/db/schema";
import { MyProjectsView } from "@/modules/projects/ui/views/my-project-view";

export default async function MyProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const rawProjects = await db
  .select()
  .from(projects)
  .where(eq(projects.userId, session.user.id));

const data = rawProjects.map((p) => ({
  ...p,
  createdAt: p.createdAt?.toISOString() ?? "",
  updatedAt: p.updatedAt?.toISOString() ?? "",
}));

  return (
    <>
      <MyProjectsView initialProjects={data} />;
    </>
  );
}
