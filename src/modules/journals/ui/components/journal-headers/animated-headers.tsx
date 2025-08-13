"use client"

import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
  title?: string
}

export function GradientHeader({ className, title }: HeaderProps) {
  return (
    <div className={cn("relative h-32 overflow-hidden rounded-t-lg", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-75 animate-gradient-y"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white font-bold text-lg opacity-80">✨</div>
      </div>
    </div>
  )
}

export function CodingHeader({ className, title }: HeaderProps) {
  return (
    <div className={cn("relative h-32 overflow-hidden rounded-t-lg bg-gray-900", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20"></div>
      <div className="absolute top-2 left-2 flex gap-1">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-green-400 font-mono text-sm animate-pulse">{"</>"}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 animate-pulse"></div>
    </div>
  )
}

export function ResearchHeader({ className, title }: HeaderProps) {
  return (
    <div
      className={cn(
        "relative h-32 overflow-hidden rounded-t-lg bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950 dark:to-purple-950",
        className,
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-indigo-300 dark:border-indigo-600 rounded-full animate-spin-slow"></div>
        <div className="absolute top-8 right-6 w-4 h-4 bg-purple-300 dark:bg-purple-600 rounded-full animate-bounce"></div>
        <div className="absolute bottom-6 left-8 w-6 h-6 border-2 border-purple-300 dark:border-purple-600 rotate-45 animate-pulse"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-indigo-600 dark:text-indigo-400 text-2xl animate-pulse">🔬</div>
      </div>
    </div>
  )
}

export function ProjectHeader({ className, title }: HeaderProps) {
  return (
    <div
      className={cn(
        "relative h-32 overflow-hidden rounded-t-lg bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-950",
        className,
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute top-3 left-3 w-6 h-1 bg-orange-400 dark:bg-orange-500 animate-pulse"></div>
        <div className="absolute top-6 left-3 w-4 h-1 bg-red-400 dark:bg-red-500 animate-pulse delay-100"></div>
        <div className="absolute top-9 left-3 w-8 h-1 bg-yellow-400 dark:bg-yellow-500 animate-pulse delay-200"></div>

        <div className="absolute top-3 right-3 w-6 h-6 border-2 border-orange-400 dark:border-orange-500 animate-spin-slow"></div>
        <div className="absolute bottom-3 right-3 w-4 h-4 bg-red-400 dark:bg-red-500 rotate-45 animate-bounce"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-orange-600 dark:text-orange-400 text-2xl animate-pulse">🚀</div>
      </div>
    </div>
  )
}

export function ReflectionHeader({ className, title }: HeaderProps) {
  return (
    <div
      className={cn(
        "relative h-32 overflow-hidden rounded-t-lg bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-950 dark:to-cyan-950",
        className,
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-teal-400 dark:bg-teal-500 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-1/4 w-3 h-3 bg-cyan-400 dark:bg-cyan-500 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full animate-ping delay-500"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-teal-600 dark:text-teal-400 text-2xl animate-pulse">💭</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 dark:via-teal-500 to-transparent animate-pulse"></div>
    </div>
  )
}

export function ImageHeader({ className, imageUrl, title }: HeaderProps & { imageUrl?: string }) {
  if (!imageUrl) {
    return <GradientHeader className={className} title={title} />
  }

  return (
    <div className={cn("relative h-32 overflow-hidden rounded-t-lg", className)}>
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title || "Journal header"}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none"
        }}
      />
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  )
}

export const headerTypes = {
  gradient: GradientHeader,
  coding: CodingHeader,
  research: ResearchHeader,
  project: ProjectHeader,
  reflection: ReflectionHeader,
  image: ImageHeader,
} as const

export type HeaderType = keyof typeof headerTypes
