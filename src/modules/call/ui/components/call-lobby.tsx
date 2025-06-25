
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import { useCallStateHooks } from "@stream-io/video-react-sdk";

import { authClient } from "@/lib/auth-client";
import { GeneratedAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import { Ghost, LogInIcon, PhoneCallIcon, PhoneOffIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();
  
    return (
      <DefaultVideoPlaceholder
        participant={{
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            GeneratedAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
        }
      />
    );
  };
  
  const AllowBrowserPermission = () => {
      return(
          <p className="text-sm">
              Please grant your browser permission to access your camera and microphone.
          </p>
      )
  }
const CallLobby = ({onJoin}: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();

  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar-darker">
      <div className="flex py-4 px-8 flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background  rounded-lg p-10 shadow-sm">
            <div className="flex flex-col gap-y-2 text-center">
                <h6 className="text-lg font-medium">
                    Ready to join?
                </h6>
                <p className="text-sm">Set up your call before joining</p>
            </div>
            <VideoPreview
                DisabledVideoPreview={
                    hasBrowserMediaPermission 
                    ? DisabledVideoPreview 
                    : AllowBrowserPermission
                }
            />
            <div className="flex gap-x-2">
                <ToggleAudioPreviewButton/>
                <ToggleVideoPreviewButton/>
            </div>
            <div className="flex gap-x-2 justify-between w-full">
                <Button asChild variant={"ghost"}>
                    <Link href={'/meetings'}>
                    <PhoneOffIcon/>
                        Cancel
                    </Link>
                </Button>
                <Button onClick={onJoin}>
                    <PhoneCallIcon/>
                    Join Call
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CallLobby;
