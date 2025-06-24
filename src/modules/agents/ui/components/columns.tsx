"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentsGetMany } from "../../types";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AgentsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (

      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            classname="size-6"
            seed={row.original.name}
            variant="botttsNeutral"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        {/* <div className="flex items-center gap-x-2"> */}
            <div className="flex items-center gap-x-1">
                <CornerDownRightIcon className="text-muted-foreground size-3"/>
                <span className="text-sm text-muted-foreground truncate capitalize max-w-[200px]">
                    {row.original.instructions}
                </span>
            </div>
        </div>
    //   </div>
    )
    
  },
  {
    accessorKey:"meetingCount",
    header:"Meetings",
    cell: ({row}) => (
        <Badge
        variant="outline" 
        className="felx items-center gap-2  bg-green-400 size-10 rounded-xl">
            <VideoIcon className="[&svg]:size-7 text-blue-700 "/>
        </Badge>
    )

  }
];
