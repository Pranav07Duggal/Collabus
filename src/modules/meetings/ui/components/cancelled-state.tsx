import { EmptyState } from "@/components/empty-state"

export const CancelledState = () => {
    return (
        <div className="flex justify-center items-center bg-white rounded-lg px-4 py-5 flex-col gap-y-8">
            <EmptyState 
                title="Meeting Cancelled"
                description="The meeting was cancelled"
                image="/cancelled.svg"
            />
            
        </div>
    )
}