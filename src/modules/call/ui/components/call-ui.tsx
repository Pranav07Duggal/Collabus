
import {
  StreamTheme,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import CallLobby from "./call-lobby";
import CallActive from "./call-active";
import CallEnded from "./call-ended";

interface Props {
  meetingName: string;
}

const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"call" | "lobby" | "ended">("lobby");
  const handleJoin = async () => {
    if (!call) return;
    await call.join();
    setShow("call");
  };
  const handleLeave = () => {
    if (!call) return;
    call.endCall();
    setShow("ended");
  };
  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && <CallActive meetingName={meetingName} onLeave={handleLeave}/>}
      {show === "ended" && <CallEnded/>}
    </StreamTheme>
  );
};

export default CallUI;
