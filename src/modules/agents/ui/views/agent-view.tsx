"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import React from "react";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentFilters } from "../../hooks/use-agent-filters";
import DataPagination from "../components/data-pagination";
import { useRouter } from "next/navigation";

const AgentsView = () => {
  const [filters , setFilters ] = useAgentFilters();
  const router = useRouter();
  const trpc = useTRPC(); 
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters,}));

  return (
    <div className="flex flex-1 flex-col pb-4 px-4 md:px-8 gap-y-4">
      <DataTable 
      data={data.items} 
      columns={columns}
      onRowClick={(row)=> router.push(`/agents/${row.id}`)}
      />
      <DataPagination
      page={filters.page}
      totalPages={data.totalPages}
      onPageChange={(page) => setFilters({page})}
      />
      {data.items.length===0&&(
        <EmptyState 
        title="No Agents"
        description="Create new agents to view them"
        />
      )}
    </div>
  );
};

export default AgentsView;
