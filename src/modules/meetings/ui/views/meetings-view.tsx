"use client";

import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import DataPagination from "@/components/data-pagination";

const MeetingsView = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <div className="flex flex-1 pb-4 px-4 md:px-8 flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => {
          router.push(`/meetings/${row.id}`);
        }}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => {
          setFilters({ page });
        }}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No Meetings"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas,and interact with participants in real time."
        />
      )}
    </div>
  );
};

export default MeetingsView;
