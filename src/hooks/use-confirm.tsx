import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";

export const useConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    }); 
    };
    
    const handleClose = () => {
      setPromise( null );
    };

    const handleConfirm = () => {
      promise?.resolve(true);
      handleClose();
    };

    const handleCancel = () => {
      promise?.resolve(false);
      handleClose();
    };

    const ConfirmationDialog = () => (
        <ResponsiveDialog
        title={title}
        description={description}
        open = { promise !== null }
        onOnpenChange={ handleClose }
        >
            <div className="pt-4 flex flex-col-reverse w-full gap-y-2 lg:flex-row gap-x-2 justify-end items-center">
                <Button
                onClick={handleCancel}
                variant={"outline"}
                    className="w-full lg:w-auto"
                    >
                    Cancel
                </Button>
                <Button
                onClick={handleConfirm}
                className="w-full lg:w-auto"
                >
                    Confirm
                </Button>
            </div>
        </ResponsiveDialog>
    );
    return [ConfirmationDialog, confirm]
};
