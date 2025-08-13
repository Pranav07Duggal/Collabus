"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Edit, Heart, MessageCircle, Share2 } from "lucide-react"
import { getJournalFromStorage, type StoredJournal } from "@/lib/journal-storage"
import { headerTypes } from "../components/journal-headers/animated-headers"
import { BlockPreview } from "../components/block-editor/block-preview"

// Mock data for fallback journals
const mockJournalData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Building a React Component Library",
    content: `# Building a React Component Library

Today I started working on a comprehensive component library for our team. The goal is to create reusable components that maintain consistency across all our projects.

## Why Build a Component Library?

After working on multiple projects, I noticed we were constantly recreating similar UI components. This led to:
- Inconsistent designs across projects
- Duplicated code and effort
- Maintenance nightmares when design changes were needed

## Getting Started

I decided to use the following tech stack:
- **React** with TypeScript for type safety
- **Storybook** for component documentation
- **Rollup** for bundling
- **Jest** and **React Testing Library** for testing

## Key Decisions

### 1. Design Tokens
First, I established a design token system to ensure consistency:

\`\`\`typescript
export const tokens = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
}
\`\`\`

### 2. Component API Design
I focused on creating intuitive APIs that follow React best practices:

\`\`\`typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
}
\`\`\`

## Challenges Faced

### Bundle Size Optimization
One major challenge was keeping the bundle size small. I implemented:
- Tree shaking support
- Individual component imports
- Proper externalization of peer dependencies

### Documentation
Creating comprehensive documentation was crucial. Storybook helped immensely with:
- Interactive component playground
- Automated prop documentation
- Visual regression testing

## Results So Far

After two weeks of development, we have:
- 15 core components (Button, Input, Card, Modal, etc.)
- Comprehensive Storybook documentation
- 95% test coverage
- Automated CI/CD pipeline

## Next Steps

Moving forward, I plan to:
1. Add more complex components (DataTable, DatePicker)
2. Implement theming support
3. Create design system guidelines
4. Set up automated visual regression testing

## Lessons Learned

Building a component library taught me:
- The importance of consistent APIs
- How crucial good documentation is for adoption
- The value of automated testing in component libraries
- That starting small and iterating is better than trying to build everything at once

This has been an incredibly rewarding project that will save our team countless hours in the future!`,
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahc",
      bio: "Frontend Developer passionate about React and design systems",
    },
    category: "Project",
    tags: ["React", "TypeScript", "Design System", "Storybook", "Component Library"],
    visibility: "public",
    headerType: "coding",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readTime: "5 min read",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  "2": {
    id: "2",
    title: "Understanding Machine Learning Fundamentals",
    content: `# Understanding Machine Learning Fundamentals

After diving deep into linear algebra and statistics, I'm finally starting to grasp the mathematical foundations behind machine learning algorithms.

## The Mathematical Foundation

Machine learning is essentially applied mathematics. The core concepts that clicked for me:

### Linear Algebra
- **Vectors and Matrices**: Everything in ML is represented as vectors and matrices
- **Eigenvalues and Eigenvectors**: Critical for dimensionality reduction
- **Matrix Operations**: The backbone of neural network computations

### Statistics and Probability
- **Bayes' Theorem**: The foundation of probabilistic reasoning
- **Distributions**: Understanding normal, binomial, and other distributions
- **Hypothesis Testing**: How we validate our models

## Key Algorithms I've Explored

### 1. Linear Regression
The simplest yet most fundamental algorithm:

\`\`\`python
import numpy as np
from sklearn.linear_model import LinearRegression

# Simple linear regression example
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

model = LinearRegression()
model.fit(X, y)
print(f"Coefficient: {model.coef_[0]}")
print(f"Intercept: {model.intercept_}")
\`\`\`

### 2. Logistic Regression
Moving from regression to classification:
- Uses the sigmoid function to map any real number to (0,1)
- Maximum likelihood estimation for parameter learning
- Surprisingly effective for many classification tasks

### 3. Decision Trees
Intuitive and interpretable:
- Recursive binary splitting
- Information gain and entropy
- Prone to overfitting but easy to understand

## Practical Applications

I've been working on several projects to solidify my understanding:

1. **House Price Prediction**: Using linear regression with multiple features
2. **Email Spam Detection**: Logistic regression with text features
3. **Customer Segmentation**: K-means clustering on purchase data

## Challenges and Insights

### The Curse of Dimensionality
High-dimensional data brings unique challenges:
- Distance metrics become less meaningful
- Need for dimensionality reduction techniques
- Importance of feature selection

### Overfitting vs Underfitting
Finding the right balance:
- **Overfitting**: Model memorizes training data
- **Underfitting**: Model is too simple to capture patterns
- **Solution**: Cross-validation and regularization

## Next Steps

My learning roadmap includes:
1. Deep dive into neural networks
2. Understanding ensemble methods
3. Exploring unsupervised learning techniques
4. Working with real-world messy datasets

The journey is challenging but incredibly rewarding. Each concept builds upon the previous ones, creating a beautiful mathematical framework for understanding data.`,
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexr",
      bio: "Data Science enthusiast exploring the mathematical foundations of AI",
    },
    category: "Research",
    tags: ["Machine Learning", "Mathematics", "Python", "Statistics"],
    visibility: "public",
    headerType: "research",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    readTime: "8 min read",
    likes: 18,
    comments: 5,
    isLiked: false,
  },
  // Add more mock journals as needed...
}

export default function JournalDetailPage() {
  const params = useParams()
  const journalId = params.id as string

  const [journal, setJournal] = useState<StoredJournal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [isUserCreated, setIsUserCreated] = useState(false)

  useEffect(() => {
    const loadJournal = () => {
      setIsLoading(true)

      // First, try to load from localStorage
      const storedJournal = getJournalFromStorage(journalId)

      if (storedJournal) {
        // Journal found in localStorage (user-created)
        setJournal(storedJournal)
        setIsLiked(storedJournal.isLiked)
        setLikesCount(storedJournal.likes)
        setIsUserCreated(true)
      } else {
        // Fallback to mock data
        const mockJournal = mockJournalData[journalId]
        if (mockJournal) {
          setJournal(mockJournal)
          setIsLiked(mockJournal.isLiked)
          setLikesCount(mockJournal.likes)
          setIsUserCreated(false)
        } else {
          setJournal(null)
        }
      }

      setIsLoading(false)
    }

    loadJournal()
  }, [journalId])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))

    // If it's a user-created journal, update localStorage
    if (isUserCreated && journal) {
      const updatedJournal = {
        ...journal,
        isLiked: !isLiked,
        likes: isLiked ? journal.likes - 1 : journal.likes + 1,
      }
      // You could save this back to localStorage here
      // saveJournalToStorage(updatedJournal)
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-6"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-32 bg-muted rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!journal) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link
            href="/journals"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journals
          </Link>

          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Journal Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The journal you're looking for doesn't exist or may have been removed.
            </p>
            <Link href="/journals">
              <Button>Browse All Journals</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const HeaderComponent = headerTypes[journal.headerType || "gradient"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/journals"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Journals
        </Link>

        {/* Journal Header with Animated Background */}
        <Card className="mb-8 overflow-hidden">
          <HeaderComponent imageUrl={journal.headerImageUrl} title={journal.title} className="h-48" />

          <div className="p-8">
            <Badge className={`mb-4 ${getCategoryColor(journal.category)}`}>
              {journal.category}
              {isUserCreated && <span className="ml-1">• Your Journal</span>}
            </Badge>
            <h1 className="text-4xl font-bold mb-4 leading-tight">{journal.title}</h1>

            {/* Author and Meta Info */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <Link
                href={`/profile/${journal.author.username}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={journal.author.avatar || "/placeholder.svg"} alt={journal.author.name} />
                  <AvatarFallback>
                    {journal.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{journal.author.name}</div>
                  {/* <div className="text-sm text-muted-foreground">{journal.author.bio || "Learning enthusiast"}</div> */}
                </div>
              </Link>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(journal.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {journal.readTime}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {journal.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                {likesCount}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <MessageCircle className="w-4 h-4" />
                {journal.comments}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              {isUserCreated && (
                <Link href={`/journals/${journal.id}/edit`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 ml-auto bg-transparent">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>

        <Separator className="mb-8" />

        {/* Article Content */}
        <Card className="bg-muted/30">
          <CardContent className="p-8">
            {isUserCreated && journal.blocks && journal.blocks.length > 0 ? (
              // Render block-based content for user-created journals
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <BlockPreview blocks={journal.blocks} />
              </div>
            ) : (
              // Render markdown/HTML content for mock journals
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="space-y-6">
                  {journal.content ? (
                    // For mock journals, render the content as formatted text
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {journal.content.split("\n").map((line, index) => {
                        if (line.startsWith("# ")) {
                          return (
                            <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                              {line.substring(2)}
                            </h1>
                          )
                        } else if (line.startsWith("## ")) {
                          return (
                            <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
                              {line.substring(3)}
                            </h2>
                          )
                        } else if (line.startsWith("### ")) {
                          return (
                            <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
                              {line.substring(4)}
                            </h3>
                          )
                        } else if (line.startsWith("```")) {
                          return null // Handle code blocks separately if needed
                        } else if (line.startsWith("- ")) {
                          return (
                            <li key={index} className="ml-4">
                              {line.substring(2)}
                            </li>
                          )
                        } else if (line.trim() === "") {
                          return <br key={index} />
                        } else {
                          return (
                            <p key={index} className="leading-7">
                              {line}
                            </p>
                          )
                        }
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No content available for this journal.</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comments Section Placeholder */}
        <Card className="mt-8 bg-muted/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Comments ({journal.comments})</h3>
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Comments feature coming soon!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
