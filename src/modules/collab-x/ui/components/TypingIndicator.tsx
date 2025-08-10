// Components
export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-3 text-blue-600 py-4">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
      <span className="text-sm font-medium">AI is analyzing...</span>
    </div>
  )
}
