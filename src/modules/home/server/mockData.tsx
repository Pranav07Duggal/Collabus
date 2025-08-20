import {
    IconAdjustments,
  IconAlignCenter,
  IconBook,
  IconBoxAlignRightFilled,
  IconBulb,
  IconCheck,
  IconClipboardCopy,
  IconFileBroken,
  IconLanguage,
  IconLayoutGrid,
  IconListDetails,
  IconMicrophone,
  IconPalette,
  IconPhoto,
  IconRefresh,
  IconRobot,
  IconSearch,
  IconSignature,
  IconTableColumn,
  IconTarget,
  IconTemplate,
  IconUsers,
  IconUserStar,
} from "@tabler/icons-react";
import { JournalHeader } from "../ui/components/journal-header";
import { GradientHeader } from "../ui/components/gradient-header";
import { ContestHeader } from "../ui/components/contest-header"
export const items = [
  {
    title: "AI Content Generation",
    description: (
      <span className="text-sm">
        Experience the power of AI in generating unique content.
      </span>
    ),
    header: <JournalHeader />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automated Proofreading",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents.
      </span>
    ),
    header: <JournalHeader />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contextual Suggestions",
    description: (
      <span className="text-sm">
        Get AI-powered suggestions based on your writing context.
      </span>
    ),
    header: <GradientHeader />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Text Summarization",
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ),
    header: <GradientHeader />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sentiment Analysis",
    description: (
      <span className="text-sm">
        Understand the sentiment of your text with AI analysis.
      </span>
    ),
    header: <ContestHeader />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Grammar Corrections",
    description: (
      <span className="text-sm">
        Automatically fix grammar issues in your writing.
      </span>
    ),
    header: <JournalHeader />,
    className: "md:col-span-1",
    icon: <IconCheck className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Plagiarism Detection",
    description: (
      <span className="text-sm">
        Ensure originality by detecting copied content.
      </span>
    ),
    header: <ContestHeader />,
    className: "md:col-span-1",
    icon: <IconSearch className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Tone Adjustment",
    description: (
      <span className="text-sm">
        Modify the tone of your writing to fit different audiences.
      </span>
    ),
    header: <GradientHeader />,
    className: "md:col-span-1",
    icon: <IconAdjustments className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Keyword Optimization",
    description: (
      <span className="text-sm">
        Improve SEO with targeted keyword suggestions.
      </span>
    ),
    header: <JournalHeader />,
    className: "md:col-span-1",
    icon: <IconTarget className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Multilingual Support",
    description: (
      <span className="text-sm">
        Write and translate content in multiple languages.
      </span>
    ),
    header: <ContestHeader />,
    className: "md:col-span-1",
    icon: <IconLanguage className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Voice Dictation",
    description: (
      <span className="text-sm">
        Convert speech to text with real-time voice dictation.
      </span>
    ),
    header: <GradientHeader />,
    className: "md:col-span-1",
    icon: <IconMicrophone className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Document Formatting",
    description: (
      <span className="text-sm">
        Apply professional formatting to your documents.
      </span>
    ),
    header: <JournalHeader />,
    className: "md:col-span-1",
    icon: <IconAlignCenter className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Citation Generation",
    description: (
      <span className="text-sm">
        Automatically generate citations in various styles.
      </span>
    ),
    header: <ContestHeader />,
    className: "md:col-span-1",
    icon: <IconBook className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Real-Time Collaboration",
    description: (
      <span className="text-sm">
        Collaborate on documents in real-time with teammates.
      </span>
    ),
    header: <GradientHeader />,
    className: "md:col-span-2",
    icon: <IconUsers className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Idea Generation",
    description: (
      <span className="text-sm">
        Get creative ideas for stories, articles, and more.
      </span>
    ),
    header: <JournalHeader />,
    className: "md:col-span-1",
    icon: <IconBulb className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Content Rewriting",
    description: (
      <span className="text-sm">
        Easily paraphrase and rewrite existing content.
      </span>
    ),
    header: <GradientHeader />,
    className: "md:col-span-1",
    icon: <IconRefresh className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Style Consistency",
    description: (
      <span className="text-sm">
        Maintain consistent writing style throughout your work.
      </span>
    ),
    header: <ContestHeader />,
    className: "md:col-span-1",
    icon: <IconPalette className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Writing Templates",
    description: (
      <span className="text-sm">
        Use built-in templates for various writing needs.
      </span>
    ),
    header: <JournalHeader />,
    className: "md:col-span-1",
    icon: <IconTemplate className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Storyboarding",
    description: (
      <span className="text-sm">
        Plan narratives using visual storyboarding tools.
      </span>
    ),
    header: <GradientHeader />,
    className: "md:col-span-2",
    icon: <IconLayoutGrid className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Character Naming",
    description: (
      <span className="text-sm">
        Generate unique character names for fiction writing.
      </span>
    ),
    header: <ContestHeader />,
    className: "md:col-span-1",
    icon: <IconUserStar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI Co-writing",
    description: (
      <span className="text-sm">
        Collaborate with an AI assistant to co-write content.
      </span>
    ),
    header: <GradientHeader />,
    className: "md:col-span-1",
    icon: <IconRobot className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Article Outlining",
    description: (
      <span className="text-sm">
        Quickly create structured outlines for your articles.
      </span>
    ),
    header: <JournalHeader />,
    className: "md:col-span-1",
    icon: <IconListDetails className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI Image Captions",
    description: (
      <span className="text-sm">
        Generate descriptive captions for images using AI.
      </span>
    ),
    header: <ContestHeader />,
    className: "md:col-span-1",
    icon: <IconPhoto className="h-4 w-4 text-neutral-500" />,
  }
]