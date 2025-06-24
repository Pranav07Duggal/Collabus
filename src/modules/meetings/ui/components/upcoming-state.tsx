import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"

interface Props {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;
}
export const UpcomingState = ({meetingId,onCancelMeeting,isCancelling}:Props) => {
    return (
        <div className="flex justify-center items-center bg-white rounded-lg px-4 py-5 flex-col gap-y-8">
            <EmptyState 
                title="Not started yet"
                description="The meeting will begin shortly"
                image="/upcoming.svg"
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
                <Button
                    variant={"outline"}
                    className="w-full lg:w-auto border-2"
                    onClick={onCancelMeeting}
                    disabled={isCancelling}
                >
                    <BanIcon className="text-red-600"/>
                    Cancel Meeting
                </Button>
                
                <Button disabled={isCancelling} asChild className="w-full lg:w-auto">
                    <Link href={`/call/${meetingId}`}>
                    <VideoIcon/>
                    Start Meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}