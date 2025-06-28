"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Edit,
  EditIcon,
  ExternalLinkIcon,
  GithubIcon,
  Link2Icon,
  MailIcon,
  UserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  userName: string;
  userHandle: string;
  userBio: string;
  userImage: string;
  userGithubURL: string;
  onEdit?: () => void;
}
const ProfileSectionOne = ({
  userName,
  userHandle,
  userBio,
  userImage,
  userGithubURL,
  onEdit,
}: Props) => {
  return (
    <>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
            <AvatarImage
              src={
                userImage ?? (
                  <GeneratedAvatar variant="initials" seed={userName} />
                )
              }
              alt={userName}
            />
            <AvatarFallback className="text-2xl">{userName}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl sm:text-3xl">
                  {userName}
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <MailIcon className="h-4 w-4" />
                  <span className="text-sm">{userHandle}@thapar.edu</span>
                </div>
              </div>
              {onEdit && (
                <div className="flex justify-between gap-x-2 gap-y-2 text-center">
                  <Button className="gap=x-2" size={"sm"} asChild>
                    <Link href={`/profile/${userHandle}`}>
                      <Link2Icon />
                      Public Profile
                    </Link>
                  </Button>
                  <Button
                    className="gap-x-2 bg-muted"
                    onClick={onEdit}
                    variant={"outline"}
                    size={"sm"}
                  >
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">{userBio}</p>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-gray-900 hover:bg-gray-700" size="sm" asChild>
            <a href={userGithubURL} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="mr-2" />
              Visit GitHub
              <ExternalLinkIcon />
            </a>
          </Button>
        </div>
      </CardContent>
    </>
  );
};

export default ProfileSectionOne;
