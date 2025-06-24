import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { VideoIcon } from "lucide-react"
import Link from "next/link"

interface Props {
    meetingId: string;
}
export const ActiveState = ({meetingId}:Props) => {
    return (
        <div className="flex justify-center items-center bg-white rounded-lg px-4 py-5 flex-col gap-y-8">
            <EmptyState 
                title="Meeting Active"
                description="Meeting will end once all participants have left"
                image="/upcoming.svg"
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
                
                <Button asChild className="w-full lg:w-auto">
                    <Link href={`/call/${meetingId}`}>
                    <VideoIcon/>
                    Join Meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}