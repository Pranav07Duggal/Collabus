"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Clock, Tag, User } from "lucide-react"

interface SearchSuggestionsProps {
  searchQuery: string
  onSuggestionClick: (suggestion: string, type: "search" | "tag" | "author") => void
  allTags: string[]
  allAuthors: string[]
  recentSearches?: string[]
}

export function SearchSuggestions({
  searchQuery,
  onSuggestionClick,
  allTags,
  allAuthors,
  recentSearches = [],
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<{
    searches: string[]
    tags: string[]
    authors: string[]
  }>({ searches: [], tags: [], authors: [] })

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions({ searches: [], tags: [], authors: [] })
      return
    }

    const query = searchQuery.toLowerCase()

    // Filter suggestions based on search query
    const matchingTags = allTags.filter((tag) => tag.toLowerCase().includes(query)).slice(0, 5)

    const matchingAuthors = allAuthors.filter((author) => author.toLowerCase().includes(query)).slice(0, 5)

    const matchingSearches = recentSearches.filter((search) => search.toLowerCase().includes(query)).slice(0, 3)

    setSuggestions({
      searches: matchingSearches,
      tags: matchingTags,
      authors: matchingAuthors,
    })
  }, [searchQuery, allTags, allAuthors, recentSearches])

  if (searchQuery.length < 2) {
    return null
  }

  const hasAnySuggestions =
    suggestions.searches.length > 0 || suggestions.tags.length > 0 || suggestions.authors.length > 0

  if (!hasAnySuggestions) {
    return null
  }

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-1 shadow-lg">
      <CardContent className="p-2">
        <div className="space-y-2">
          {/* Recent Searches */}
          {suggestions.searches.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                <Clock className="w-3 h-3" />
                Recent Searches
              </div>
              {suggestions.searches.map((search) => (
                <Button
                  key={search}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 px-2"
                  onClick={() => onSuggestionClick(search, "search")}
                >
                  <Search className="w-3 h-3 mr-2" />
                  {search}
                </Button>
              ))}
            </div>
          )}

          {/* Tag Suggestions */}
          {suggestions.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                <Tag className="w-3 h-3" />
                Tags
              </div>
              {suggestions.tags.map((tag) => (
                <Button
                  key={tag}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 px-2"
                  onClick={() => onSuggestionClick(tag, "tag")}
                >
                  <Badge variant="secondary" className="mr-2 text-xs">
                    {tag}
                  </Badge>
                  Search for "{tag}" tag
                </Button>
              ))}
            </div>
          )}

          {/* Author Suggestions */}
          {suggestions.authors.length > 0 && (
            <div>
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                <User className="w-3 h-3" />
                Authors
              </div>
              {suggestions.authors.map((author) => (
                <Button
                  key={author}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 px-2"
                  onClick={() => onSuggestionClick(author, "author")}
                >
                  <User className="w-3 h-3 mr-2" />
                  {author}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
