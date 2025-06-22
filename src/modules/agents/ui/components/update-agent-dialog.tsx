"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import React from "react";
import AgentForm from "./agentform";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Update Agent"
      description="Update existing agent"
      open={open}
      onOnpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => {
          onOpenChange(false);
        }}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;
