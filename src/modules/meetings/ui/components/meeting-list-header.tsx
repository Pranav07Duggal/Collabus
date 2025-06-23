"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import NewMeetingDialog from "./new-meeting-dialog";
const MeetingListHeader = () => {

  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
    <NewMeetingDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Meetings</h5>
          <Button onClick={() => {setDialogOpen(true)}}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">TODO: Filters  </div>
      </div>
    </>
  );
};

export default MeetingListHeader;
