"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, Search, X } from "lucide-react"
import { format } from "date-fns"

interface AdvancedSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  allTags: string[]
  allAuthors: string[]
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  selectedAuthors: string[]
  setSelectedAuthors: (authors: string[]) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  dateRange: { from?: string; to?: string }
  setDateRange: (range: { from?: string; to?: string }) => void
  readTimeFilter: string
  setReadTimeFilter: (filter: string) => void
}

const categories = ["Project", "Research", "Guide", "Reflection"]

export function AdvancedSearchDialog({
  open,
  onOpenChange,
  allTags,
  allAuthors,
  selectedTags,
  setSelectedTags,
  selectedAuthors,
  setSelectedAuthors,
  selectedCategories,
  setSelectedCategories,
  dateRange,
  setDateRange,
  readTimeFilter,
  setReadTimeFilter,
}: AdvancedSearchDialogProps) {
  const [tagSearch, setTagSearch] = useState("")
  const [authorSearch, setAuthorSearch] = useState("")
  const [fromDate, setFromDate] = useState<Date | undefined>(dateRange.from ? new Date(dateRange.from) : undefined)
  const [toDate, setToDate] = useState<Date | undefined>(dateRange.to ? new Date(dateRange.to) : undefined)

  const filteredTags = allTags.filter((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()))

  const filteredAuthors = allAuthors.filter((author) => author.toLowerCase().includes(authorSearch.toLowerCase()))

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const toggleAuthor = (author: string) => {
    if (selectedAuthors.includes(author)) {
      setSelectedAuthors(selectedAuthors.filter((a) => a !== author))
    } else {
      setSelectedAuthors([...selectedAuthors, author])
    }
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleApplyFilters = () => {
    setDateRange({
      from: fromDate?.toISOString().split("T")[0],
      to: toDate?.toISOString().split("T")[0],
    })
    onOpenChange(false)
  }

  const clearAllFilters = () => {
    setSelectedTags([])
    setSelectedAuthors([])
    setSelectedCategories([])
    setFromDate(undefined)
    setToDate(undefined)
    setReadTimeFilter("")
    setDateRange({})
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Project":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Research":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Guide":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Reflection":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Advanced Search & Filters
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Categories */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="flex items-center gap-2 cursor-pointer">
                      <Badge className={`${getCategoryColor(category)} text-xs`}>{category}</Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Tags</Label>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tags..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {selectedTags.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Selected Tags:</Label>
                    <div className="flex flex-wrap gap-1">
                      {selectedTags.map((tag) => (
                        <Badge key={tag} variant="default" className="flex items-center gap-1">
                          {tag}
                          <button onClick={() => toggleTag(tag)} className="ml-1 hover:text-destructive">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <ScrollArea className="h-32 border rounded-md p-2">
                  <div className="space-y-1">
                    {filteredTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2 p-1 hover:bg-muted rounded">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="cursor-pointer flex-1">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <Separator />

            {/* Authors */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Authors</Label>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search authors..."
                    value={authorSearch}
                    onChange={(e) => setAuthorSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {selectedAuthors.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Selected Authors:</Label>
                    <div className="flex flex-wrap gap-1">
                      {selectedAuthors.map((author) => (
                        <Badge key={author} variant="default" className="flex items-center gap-1">
                          {author}
                          <button onClick={() => toggleAuthor(author)} className="ml-1 hover:text-destructive">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <ScrollArea className="h-32 border rounded-md p-2">
                  <div className="space-y-1">
                    {filteredAuthors.map((author) => (
                      <div key={author} className="flex items-center space-x-2 p-1 hover:bg-muted rounded">
                        <Checkbox
                          id={`author-${author}`}
                          checked={selectedAuthors.includes(author)}
                          onCheckedChange={() => toggleAuthor(author)}
                        />
                        <Label htmlFor={`author-${author}`} className="cursor-pointer flex-1">
                          {author}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <Separator />

            {/* Date Range */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Date Range</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">To Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? format(toDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <Separator />

            {/* Read Time Filter */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Read Time</Label>
              <Select value={readTimeFilter} onValueChange={setReadTimeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select read time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any length</SelectItem>
                  <SelectItem value="short">Short (&lt;= 5 min)</SelectItem>
                  <SelectItem value="medium">Medium (6-10 min)</SelectItem>
                  <SelectItem value="long">Long (&gt; 10 min)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
