import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface Props {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

const MeetingIdViewHeader = ({ meetingId, meetingName, onEdit, onRemove }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="font-medium text-xl">
            <Link href="/meetings">
                My Meetings
            </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
          <BreadcrumbLink asChild className="font-medium text-xl text-accent-foreground">
            <Link href={`/meetings/${meetingId}`}>
                {meetingName}
            </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* removing modal={false} crashes the website. leave unchanged. no fix available in current version */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost">
                <MoreVerticalIcon/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" >
            <DropdownMenuItem  onClick={onEdit}>
            <PencilIcon className="size-4 text-black"/>
            Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRemove}>
            <TrashIcon className="size-4 text-red-500"/>
            Remove
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MeetingIdViewHeader ;
