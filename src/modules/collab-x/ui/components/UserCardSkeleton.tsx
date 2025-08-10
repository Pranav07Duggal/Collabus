import { Card, CardContent } from "@/components/ui/card"
export function UserCardSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-2 w-full">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
          </div>
          <div className="flex gap-1 justify-center w-full">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-14"></div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="h-8 bg-gray-200 rounded animate-pulse flex-1"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse flex-1"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}