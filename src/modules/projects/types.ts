
export interface Project {
  id: string
  title: string
  tagline: string
  phase:
    | "idea/brainstorming"
    | "planning"
    | "designing architecture"
    | "mvp"
    | "testing/feedback"
    | "deployment/demo"
    | "iteration"
    | "LIVE"
  progress: number
  contributors: Array<{ name: string; avatar: string }>
  techStack: string[]
  isOwner: boolean
}
