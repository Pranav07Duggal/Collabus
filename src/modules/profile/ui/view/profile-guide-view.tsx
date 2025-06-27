"use client";

import { Button } from "@/components/ui/button";
import { UserRound, UserRoundIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    userHandle: string;
}

const ProfileGuideView = ({userHandle}:Props) => {
  return (<div className="bg-muted h-screen flex flex-col items-center justify-center">

    <Button className="w-auto">
        <UserRoundIcon className="size-4"/>
        <Link href={`/profile/${userHandle}`}>
            View your profile
        </Link>
    </Button>
  </div>
  )
}

export default ProfileGuideView