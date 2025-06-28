import { ResponsiveDialog } from '@/components/responsive-dialog'
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react'

const skillLevels = [
    {
      title: "Novice",
      description: [
        "Just getting started.",
        "Has little to no prior experience.",
        "Relies heavily on guidance and rules.",
      ],
    },
    {
      title: "Beginner",
      description: [
        "Understands basic concepts.",
        "Can perform simple tasks with help.",
        "Still makes frequent errors.",
      ],
    },
    {
      title: "Intermediate",
      description: [
        "Can complete tasks with some independence.",
        "Understands the “why” behind core techniques.",
        "Begins applying knowledge in varied situations.",
      ],
    },
    {
      title: "Proficient",
      description: [
        "Consistently performs well in familiar situations.",
        "Troubleshoots basic issues.",
        "Can teach basic skills to others.",
      ],
    },
    {
      title: "Advanced",
      description: [
        "Handles complex tasks with confidence.",
        "Adapts techniques to new challenges.",
        "Strong problem-solving skills.",
      ],
    },
    {
      title: "Expert",
      description: [
        "Deep understanding and intuition.",
        "Innovates or improves practices.",
        "Recognized as a resource by peers.",
      ],
    },
    {
      title: "Master",
      description: [
        "Top-level authority and inspiration in the field.",
        "Pushes the boundaries of what's possible.",
        "Often mentors experts and shapes the discipline.",
      ],
    },
  ];


  const getSkillColor = (level: string) => {
    switch (level) {
        case "Novice":
          return "bg-red-100 text-red-800 hover:bg-red-200 rounded-lg border border-muted bg-card shadow-lg p-5";
        case "Beginner":
          return "bg-orange-100 text-orange-800 hover:bg-orange-200 rounded-lg border border-muted bg-card shadow-lg p-5";
        case "Intermediate":
          return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-lg border border-muted bg-card shadow-lg p-5";
        case "Proficient":
          return "bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg border border-muted bg-card shadow-lg p-5";
        case "Advanced":
          return "bg-green-100 text-green-800 hover:bg-green-200 rounded-lg border border-muted bg-card shadow-lg p-5";
        case "Expert":
          return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 rounded-lg border border-muted bg-card shadow-lg p-5";
        case "Master":
          return "bg-purple-200 text-purple-800 hover:bg-purple-400/50 rounded-lg border border-muted bg-card shadow-lg p-5";
        default:
          return "bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg border border-muted bg-card shadow-lg p-5";
      }
  }; 
  
interface Props {
    open: boolean;
    onOpenChange:(open:boolean)=> void;
}

const SkillLevelGuide = ({open,onOpenChange}:Props) => {
  return (
    <ResponsiveDialog
        title='Skill Guide'
        description='What skill levels actually mean'
        open={open}
        onOnpenChange={onOpenChange}
    >
        <ScrollArea className="h-100 w-full rounded-md border bg-muted">
            
        <div className="max-w-4xl mx-auto p-6 space-y-6">
      {skillLevels.map((level, idx) => (
        <div
          key={level.title}
          className={`${getSkillColor(
            level.title
          )} transition-colors`}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
            {idx + 1}. {level.title}
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {level.description.map((line, i) => (
              <li key={i} className="text-sm">
                {line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
        </ScrollArea>
    </ResponsiveDialog>
  )
}

export default SkillLevelGuide


// Novice

// Just getting started.

// Has little to no prior experience.

// Relies heavily on guidance and rules.

// Beginner

// Understands basic concepts.

// Can perform simple tasks with help.

// Still makes frequent errors.

// Intermediate

// Can complete tasks with some independence.

// Understands the “why” behind core techniques.

// Begins applying knowledge in varied situations.

// Proficient

// Consistently performs well in familiar situations.

// Troubleshoots basic issues.

// Can teach basic skills to others.

// Advanced

// Handles complex tasks with confidence.

// Adapts techniques to new challenges.

// Strong problem-solving skills.

// Expert

// Deep understanding and intuition.

// Innovates or improves practices.

// Recognized as a resource by peers.

// Master

// Top-level authority and inspiration in the field.

// Pushes the boundaries of what’s possible.

// Often mentors experts and shapes the discipline.

