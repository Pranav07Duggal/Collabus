import { EmptyState } from "@/components/empty-state"

export const ProcessingState = () => {
    return (
        <div className="flex justify-center items-center bg-white rounded-lg px-4 py-5 flex-col gap-y-8">
            <EmptyState 
                title="Meeting Completed"
                description="The meeting ended, a summary will appear soon"
                image="/processing.svg"
            />
        </div>
    )
}