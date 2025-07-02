import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";

type ConfirmDialogProps = {
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  triggerButton: React.ReactElement<any>;
};

export function ConfirmDialog({ title, description, onConfirm, triggerButton }: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {React.cloneElement(triggerButton, { onClick: () => setOpen(true) })}

      <ResponsiveDialog
        title={title}
        description={description}
        open={open}
        onOnpenChange={setOpen}
      >
        <div className="pt-4 flex flex-col-reverse w-full gap-y-2 lg:flex-row gap-x-2 justify-end items-center">
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="w-full lg:w-auto"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full lg:w-auto"
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </ResponsiveDialog>
    </>
  );
}
