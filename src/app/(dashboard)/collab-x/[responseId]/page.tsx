import CollabXResponseView from "@/modules/collab-x/ui/views/collab-x-response-view";
import { notFound } from "next/navigation";

export default async function CollabXResponsePage({ params }: { params: { responseId: string } }) {
  const { responseId } = await params;


  if (!responseId) {
    notFound();
  }

  return (
    <div className="h-screen">
      <CollabXResponseView/>
    </div>
  );
}
