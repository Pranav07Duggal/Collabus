import { Button } from "@/components/ui/button";

import Link from "next/link";

const CallEnded = () => {
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar-darker">
      <div className="flex py-4 px-8 flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background  rounded-lg p-10 shadow-sm">
            <div className="flex flex-col gap-y-2 text-center">
                <h6 className="text-lg font-medium">
                    Call Ended
                </h6>
                <p className="text-sm">Summary will appear in a few minutes.</p>
            </div>
            <Button asChild>
              <Link href={"/meetings"}>
              Back to Meetings
              </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CallEnded;
