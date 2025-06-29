"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PencilIcon, UserRoundIcon } from "lucide-react";
import Link from "next/link";
import UpdateProfileDialog from "../components/update-profile-dialog";
import { useTRPC } from "@/trpc/client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProfileSectionOne from "../components/profile-section-one";
import { Separator } from "@/components/ui/separator";
import SkillAndAchivementSection from "../components/skill-achivements";
interface Props {
  userName: string;
  userHandle: string;
  userBio: string;
  userImage: string;
  userGithubURL: string;
  userId: string;
}
const ProfilePrivateView = ({
  userName,
  userHandle,
  userBio,
  userImage,
  userGithubURL,
  userId,
}: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.profiles.getOne.queryOptions({ id: userId }));
  const [updateProfileDialogOpen, setProfileDialogOpen] = useState(false);
  return (
    <>
      <UpdateProfileDialog
        open={updateProfileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        initialValues={data}
      />
      <div className="min-h-max bg-muted py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
        <Card className="overflow-hidden">
              <ProfileSectionOne
                userName={userName}
                userBio={userBio}
                userImage={userImage}
                userHandle={userHandle}
                userGithubURL={userGithubURL}
                onEdit={()=>setProfileDialogOpen(true)}
              />
            </Card>
            <Separator/>
              <SkillAndAchivementSection userId = {userId}/> 
        </div>
      </div>
    </>
  );
};

export default ProfilePrivateView;
