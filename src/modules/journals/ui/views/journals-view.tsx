"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Calendar,
  Grid3X3,
  List,
  Plus,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { AdvancedSearchDialog } from "../components/advanced-search-dialog";
import { SearchSuggestions } from "../components/search-suggestion";
import { headerTypes } from "../components/journal-headers/animated-headers";
import {
  getJournalsFromStorage,
  type StoredJournal,
} from "@/lib/journal-storage";

// Mock data for journals with headers
const mockJournals: StoredJournal[] = [
  {
    id: "1",
    title: "Building a React Component Library",
    blocks: [],
    content:
      "Today I started working on a comprehensive component library for our team. The goal is to create reusable components that maintain consistency across all our projects...",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahc",
    },
    category: "Project",
    tags: ["React", "TypeScript", "Design System"],
    visibility: "public",
    headerType: "coding",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readTime: "5 min read",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: "2",
    title: "Understanding Machine Learning Fundamentals",
    blocks: [],
    content:
      "After diving deep into linear algebra and statistics, I'm finally starting to grasp the mathematical foundations behind machine learning algorithms...",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexr",
    },
    category: "Research",
    tags: ["Machine Learning", "Mathematics", "Python"],
    visibility: "public",
    headerType: "research",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    readTime: "8 min read",
    likes: 18,
    comments: 5,
    isLiked: false,
  },
  {
    id: "3",
    title: "Complete Guide to Next.js App Router",
    blocks: [],
    content:
      "The new App Router in Next.js 13+ has completely changed how we build React applications. Here's everything you need to know to get started...",
    author: {
      name: "Jordan Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "jordank",
    },
    category: "Guide",
    tags: ["Next.js", "React", "Web Development"],
    visibility: "public",
    headerType: "gradient",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
    readTime: "12 min read",
    likes: 32,
    comments: 12,
    isLiked: true,
  },
  {
    id: "4",
    title: "Reflections on My First Year as a Developer",
    blocks: [],
    content:
      "Looking back at my journey from bootcamp graduate to full-time developer, there are so many lessons I wish I had known earlier...",
    author: {
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "mayap",
    },
    category: "Reflection",
    tags: ["Career", "Learning", "Personal Growth"],
    visibility: "connections",
    headerType: "reflection",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
    readTime: "6 min read",
    likes: 15,
    comments: 7,
    isLiked: false,
  },
  {
    id: "5",
    title: "Implementing Real-time Chat with WebSockets",
    blocks: [],
    content:
      "Building a real-time chat application taught me a lot about WebSocket connections, state management, and handling concurrent users...",
    author: {
      name: "David Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "davidt",
    },
    category: "Project",
    tags: ["WebSockets", "Node.js", "Real-time"],
    visibility: "public",
    headerType: "project",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
    readTime: "10 min read",
    likes: 21,
    comments: 9,
    isLiked: false,
  },
];

const categories = ["All", "Project", "Research", "Guide", "Reflection"];

export default function JournalsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [storedJournals, setStoredJournals] = useState<StoredJournal[]>([]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "React components",
    "Machine learning",
    "Next.js tutorial",
  ]);

  // Advanced search filters
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    {}
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [readTimeFilter, setReadTimeFilter] = useState<string>("");

  // Load journals from localStorage on mount
  useEffect(() => {
    const stored = getJournalsFromStorage();
    setStoredJournals(stored);
  }, []);

  // Combine mock journals with stored journals
  const allJournals = useMemo(() => {
    return [
      ...storedJournals,
      ...mockJournals.filter(
        (mock) => !storedJournals.some((stored) => stored.id === mock.id)
      ),
    ];
  }, [storedJournals]);

  // Get all unique tags and authors for filter options
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allJournals.forEach((journal) => {
      journal.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allJournals]);

  const allAuthors = useMemo(() => {
    const authors = new Set<string>();
    allJournals.forEach((journal) => {
      authors.add(journal.author.name);
    });
    return Array.from(authors).sort();
  }, [allJournals]);

  const filteredJournals = useMemo(() => {
    return allJournals.filter((journal) => {
      // Basic search
      const matchesSearch =
        searchQuery === "" ||
        journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (journal.content || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        journal.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        journal.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || journal.category === selectedCategory;

      // Advanced filters
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => journal.tags.includes(tag));

      const matchesAuthors =
        selectedAuthors.length === 0 ||
        selectedAuthors.includes(journal.author.name);

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(journal.category);

      // Date range filter
      const journalDate = new Date(journal.createdAt);
      const matchesDateRange =
        (!dateRange.from || journalDate >= new Date(dateRange.from)) &&
        (!dateRange.to || journalDate <= new Date(dateRange.to));

      // Read time filter
      const readTimeMinutes = Number.parseInt(journal.readTime.split(" ")[0]);
      const matchesReadTime =
        !readTimeFilter ||
        (readTimeFilter === "short" && readTimeMinutes <= 5) ||
        (readTimeFilter === "medium" &&
          readTimeMinutes > 5 &&
          readTimeMinutes <= 10) ||
        (readTimeFilter === "long" && readTimeMinutes > 10);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesTags &&
        matchesAuthors &&
        matchesCategories &&
        matchesDateRange &&
        matchesReadTime
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedTags,
    selectedAuthors,
    selectedCategories,
    dateRange,
    readTimeFilter,
    allJournals,
  ]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTags([]);
    setSelectedAuthors([]);
    setSelectedCategories([]);
    setDateRange({});
    setReadTimeFilter("");
  };

  const hasActiveFilters =
    selectedTags.length > 0 ||
    selectedAuthors.length > 0 ||
    selectedCategories.length > 0 ||
    dateRange.from ||
    dateRange.to ||
    readTimeFilter;

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const removeAuthor = (author: string) => {
    setSelectedAuthors((prev) => prev.filter((a) => a !== author));
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Project":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Research":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Guide":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Reflection":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleSuggestionClick = (
    suggestion: string,
    type: "search" | "tag" | "author"
  ) => {
    if (type === "search") {
      setSearchQuery(suggestion);
      // Add to recent searches if not already there
      if (!recentSearches.includes(suggestion)) {
        setRecentSearches((prev) => [suggestion, ...prev.slice(0, 4)]);
      }
    } else if (type === "tag") {
      if (!selectedTags.includes(suggestion)) {
        setSelectedTags((prev) => [...prev, suggestion]);
      }
    } else if (type === "author") {
      if (!selectedAuthors.includes(suggestion)) {
        setSelectedAuthors((prev) => [...prev, suggestion]);
      }
    }
    setShowSuggestions(false);
  };

  interface BlockItem {
            type: string;
            content?: string;
            [key: string]: any;
        }
  const JournalCard = ({ journal }: { journal: StoredJournal }) => {
    const HeaderComponent = headerTypes[journal.headerType];

    const previewContent = ({ content }: { content: string }) => {
      if (journal.content.startsWith("[")) {
        try {
          const data = JSON.parse(content);
        

        const firstItem: BlockItem | undefined = (data as BlockItem[]).find(
            (item: BlockItem) => item.type === "paragraph" || item.type === "code"
        );
          if (firstItem && firstItem.content) {
            return firstItem.content.slice(0, 200);
          }
        } catch {
          // Ignore JSON parse errors
        }
       
    }
     else{
            return content.slice(0, 200);
        }
      }
      ;

    return (
      <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm overflow-hidden p-0">
        {/* Animated Header */}
        <HeaderComponent
          imageUrl={journal.headerImageUrl}
          title={journal.title}
        />

        <CardHeader className="">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <Badge className={`mb-2 ${getCategoryColor(journal.category)}`}>
                {journal.category}
              </Badge>
              <Link href={`/journals/${journal.id}`}>
                <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                  {journal.title}
                </h3>
              </Link>
            </div>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-3 mt-2">
            {previewContent({ content: journal.content }) ||
              "No preview available"}
          </p>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex flex-wrap gap-1 mb-3">
            {journal.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Link
              href={`/profile/${journal.author.username}`}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={journal.author.avatar || "/placeholder.svg"}
                  alt={journal.author.name}
                />
                <AvatarFallback className="text-xs">
                  {journal.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{journal.author.name}</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(journal.createdAt).toLocaleDateString()}
              </span>
              <span>{journal.readTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const JournalListItem = ({ journal }: { journal: StoredJournal }) => {
    const HeaderComponent = headerTypes[journal.headerType];

    return (
      <Card className="group hover:shadow-md transition-all duration-200 overflow-hidden">
        <CardContent className="">
          <div className="flex gap-4">
            {/* Mini Header */}
            <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0">
              <div className="scale-50 origin-top-left transform">
                <HeaderComponent
                  imageUrl={journal.headerImageUrl}
                  title={journal.title}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={`${getCategoryColor(journal.category)}`}>
                    {journal.category}
                  </Badge>
                  <Link href={`/journals/${journal.id}`}>
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                      {journal.title}
                    </h3>
                  </Link>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {journal.content || "No preview available"}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {journal.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {journal.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{journal.tags.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Link
                    href={`/profile/${journal.author.username}`}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <Avatar className="w-5 h-5">
                      <AvatarImage
                        src={journal.author.avatar || "/placeholder.svg"}
                        alt={journal.author.name}
                      />
                      <AvatarFallback className="text-xs">
                        {journal.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{journal.author.name}</span>
                  </Link>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(journal.createdAt).toLocaleDateString()}
                  </span>
                  <span>{journal.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const sortedJournals = [...filteredJournals].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              Learning Journals
            </h1>
            <p className="text-muted-foreground mt-1">
              Share your projects, research, and learning experiences with the
              community
            </p>
          </div>
          <Link href="/journals/create">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Journal
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search journals, tags, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className="pl-10 bg-muted/50"
                />
              </div>
              {showSuggestions && (
                <SearchSuggestions
                  searchQuery={searchQuery}
                  onSuggestionClick={handleSuggestionClick}
                  allTags={allTags}
                  allAuthors={allAuthors}
                  recentSearches={recentSearches}
                />
              )}
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40 bg-muted/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-muted/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowAdvancedSearch(true)}
                className="flex items-center gap-2 bg-muted/50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Advanced
                {hasActiveFilters && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    !
                  </Badge>
                )}
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium text-muted-foreground">
                Active filters:
              </span>

              {selectedTags.map((tag) => (
                <Badge
                  key={`tag-${tag}`}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  Tag: {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}

              {selectedAuthors.map((author) => (
                <Badge
                  key={`author-${author}`}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  Author: {author}
                  <button
                    onClick={() => removeAuthor(author)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}

              {selectedCategories.map((category) => (
                <Badge
                  key={`category-${category}`}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  Category: {category}
                  <button
                    onClick={() => removeCategory(category)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}

              {dateRange.from && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  From:{" "}
                  {dateRange.from
                    ? new Date(dateRange.from).toLocaleDateString()
                    : "Pick a date"}
                  <button
                    onClick={() =>
                      setDateRange((prev) => ({ ...prev, from: undefined }))
                    }
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}

              {dateRange.to && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  To:{" "}
                  {dateRange.to
                    ? new Date(dateRange.to).toLocaleDateString()
                    : "Pick a date"}
                  <button
                    onClick={() =>
                      setDateRange((prev) => ({ ...prev, to: undefined }))
                    }
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}

              {readTimeFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Read time: {readTimeFilter}
                  <button
                    onClick={() => setReadTimeFilter("")}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="ml-2"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredJournals.length} journal
            {filteredJournals.length !== 1 ? "s" : ""} found
            {hasActiveFilters && ` (${allJournals.length} total)`}
          </p>
        </div>

        {/* Journals Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJournals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedJournals.map((journal) => (
              <JournalListItem key={journal.id} journal={journal} />
            ))}
          </div>
        )}

        {sortedJournals.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No journals found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters, or be the first to share
              your learning journey!
            </p>
            <Link href="/journals/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Journal
              </Button>
            </Link>
          </div>
        )}
        <AdvancedSearchDialog
          open={showAdvancedSearch}
          onOpenChange={setShowAdvancedSearch}
          allTags={allTags}
          allAuthors={allAuthors}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedAuthors={selectedAuthors}
          setSelectedAuthors={setSelectedAuthors}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          dateRange={dateRange}
          setDateRange={setDateRange}
          readTimeFilter={readTimeFilter}
          setReadTimeFilter={setReadTimeFilter}
        />
      </div>
    </div>
  );
}
