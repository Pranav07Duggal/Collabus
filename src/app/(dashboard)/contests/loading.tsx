export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded-xl w-48"></div>
            <div className="text-center space-y-4">
              <div className="h-12 bg-muted rounded-xl w-96 mx-auto"></div>
              <div className="h-6 bg-muted rounded-xl w-64 mx-auto"></div>
            </div>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-card border border-muted rounded-2xl p-6">
                <div className="h-6 bg-muted rounded w-48 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-10 bg-muted rounded-xl"></div>
                  <div className="h-10 bg-muted rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
