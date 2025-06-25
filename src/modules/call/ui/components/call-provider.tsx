"use client";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import CallConnect from "./call-connect";
import { GeneratedAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
  meetingName: string;
}

const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();
  if (!data || isPending) {
    return (
      <div className="flex h-screen justify-center items-center bg-radial from-sidebar-accent to-sidebar-darker">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    );
  }
  return (
    <div>
      <CallConnect
        meetingId={meetingId}
        meetingName={meetingName}
        userId={data.user.id}
        userName={data.user.name}
        userImage={
          data.user.image ??
          GeneratedAvatarUri({ seed: data.user.name, variant: "initials" })
        }
      />
    </div>
  );
};

export default CallProvider;
