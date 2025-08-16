
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectsPage from "@/modules/projects/ui/views/projects-view";

export default async function MyProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <>
      <ProjectsPage/>
    </>
  );
}
