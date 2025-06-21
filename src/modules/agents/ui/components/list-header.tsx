"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React from "react";
import NewAgentDialog from "./new-agent-dialog";
import { useState } from "react";
import { useAgentFilters } from "../../hooks/use-agent-filters";
import { AgentSearchFilter } from "./agents-search";
import { DEFAULT_PAGE } from "@/constants";
const ListHeader = () => {
    const [filters, setFilters] = useAgentFilters()
    const [dialogOpen, setDialogOpen] = useState(false);

    const isFilterModified = !!filters.search;

    const onClearFilter = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE,
        })
    }

  return (
    <>
      <NewAgentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
            <AgentSearchFilter/>{
                isFilterModified && (
                    <Button onClick={onClearFilter} size="sm" variant='outline'>
                        <XCircleIcon/>
                        Clear
                    </Button>
                )
            }   
        </div>
      </div>
    </>
  );
};

export default ListHeader;
