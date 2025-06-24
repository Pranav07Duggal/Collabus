import { EmptyState } from "@/components/empty-state"

export const CompletedState = () => {
    return (
        <div className="flex justify-center items-center bg-white rounded-lg px-4 py-5 flex-col gap-y-8">
            <EmptyState 
                title="Not started yet"
                description="The meeting will begin shortly"
                image="/completed.svg"
            />
        </div>
    )
}