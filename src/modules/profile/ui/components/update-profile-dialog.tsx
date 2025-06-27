"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import React from "react";
import ProfileForm from "./profile-form";
import { ProfileGetOne } from "../../types";

interface UpdateProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: ProfileGetOne;
}

const UpdateProfileDialog = ({ open, onOpenChange, initialValues }: UpdateProfileDialogProps) => {
  return (
    <ResponsiveDialog
      title="Update Profile"
      description="Edit Existing Profile Data"
      open={open}
      onOnpenChange={onOpenChange}
    >
      <ProfileForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => {
          onOpenChange(false);
        }}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateProfileDialog;