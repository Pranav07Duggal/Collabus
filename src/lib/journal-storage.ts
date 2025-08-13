"use client"

import type { Block } from "@/modules/journals/ui/components/block-editor/block-editor"
import type { HeaderType } from "@/modules/journals/ui/components/journal-headers/animated-headers"

export interface StoredJournal {
  id: string
  title: string
  blocks: Block[]
  category: string
  tags: string[]
  visibility: string
  headerType: HeaderType
  headerImageUrl?: string
  author: {
    name: string
    avatar: string
    username: string
  }
  createdAt: string
  updatedAt: string
  readTime: string
  likes: number
  comments: number
  isLiked: boolean
  content: string // Serialized content for easy storage
}

const STORAGE_KEY = "learning-journals"

export function saveJournalToStorage(journal: StoredJournal): void {
  if (typeof window === "undefined") return

  try {
    const existingJournals = getJournalsFromStorage()
    const updatedJournals = existingJournals.filter((j) => j.id !== journal.id)
    updatedJournals.unshift(journal)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJournals))
  } catch (error) {
    console.error("Failed to save journal to localStorage:", error)
  }
}

export function getJournalsFromStorage(): StoredJournal[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to retrieve journals from localStorage:", error)
    return []
  }
}

export function deleteJournalFromStorage(id: string): void {
  if (typeof window === "undefined") return

  try {
    const existingJournals = getJournalsFromStorage()
    const updatedJournals = existingJournals.filter((j) => j.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJournals))
  } catch (error) {
    console.error("Failed to delete journal from localStorage:", error)
  }
}

export function getJournalFromStorage(id: string): StoredJournal | null {
  const journals = getJournalsFromStorage()
  return journals.find((j) => j.id === id) || null
}

export function calculateReadTime(blocks: Block[]): string {
  const wordsPerMinute = 200
  let totalWords = 0

  blocks.forEach((block) => {
    if (block.type !== "divider" && block.type !== "image") {
      totalWords += block.content.split(" ").length
    }
  })

  const minutes = Math.max(1, Math.ceil(totalWords / wordsPerMinute))
  return `${minutes} min read`
}
