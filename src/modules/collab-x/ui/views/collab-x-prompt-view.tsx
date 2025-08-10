"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickActionChips } from "../components/QuickActionChips"
import { Vortex } from "@/components/ui/vortex"
import { PromptBox } from "@/components/ui/promptbox"
import { useRouter } from "next/navigation"

export default function CollabXPromptView() {
  const [phases, setPhases] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showSkeletons, setShowSkeletons] = useState(false)
  const [projectIdea, setProjectIdea] = useState("")
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [showMentorModal, setShowMentorModal] = useState(false)
  const feedRef = useRef<HTMLDivElement>(null)
  const router = useRouter();

  const handleSubmitIdea = () => {
    console.log(projectIdea);
    if (!projectIdea.trim()) return


    const responseId = Date.now().toString(); 

    setTimeout(() => {
      router.push(`/collab-x/${responseId}?prompt=${encodeURIComponent(projectIdea)}`);
    }, 1700);
  }

  const handleNextStep = () => {
    const nextPhases = [...phases]

    if (currentStep === 0) {
      nextPhases.push("team")
    } else if (currentStep === 1) {
      nextPhases.push("references")
    } else if (currentStep === 2) {
      nextPhases.push("mentors")
    } else if (currentStep === 3) {
      nextPhases.push("roadmap")
    }

    setPhases(nextPhases)
    setShowSkeletons(true)
    setCurrentStep(currentStep + 1)

    setTimeout(() => {
      setShowSkeletons(false)
    }, 1200)
  }

  const handleRequestMentorship = (mentor: any) => {
    setSelectedMentor(mentor)
    setShowMentorModal(true)
  }

  const placeholders = [
    "Describe your project idea, like building an AI to detect fake news",
    "Looking to create a health tracking app using wearable data?",   
    "Thinking of a blockchain-based voting system? Tell me more",
    "Want to build a drone delivery network for rural medicine?",    
    "Planning a sustainability dashboard for smart cities? Start here",
    "Interested in a virtual reality platform for remote education? Let's brainstorm",
    "How about an IoT solution for smart agriculture? Share your vision",
    "Envisioning a social impact app for mental health awareness? Let's refine it",
    "Dreaming of a gamified fitness app that uses AR? Describe your concept",
    "Curious about creating a personalized learning platform using AI? Let's explore",
  ];
 

  return (
    <div className="flex-1 bg-muted flex items-center justify-center overflow-hidden h-full">
        <Vortex
        backgroundColor="muted"
        rangeY={500}
        particleCount={500}
        baseHue={90}
        className="flex items-center justify-center w-full h-full"
        >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 ">

        

        {/* HEADER SECTION */}

        <div className="text-center mb-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="text-4xl font-bold  text-gray-900 dark:text-white">
              Collab X
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              Get personalized project ideas, team recommendations, and expert guidance powered by AI
            </p>
          </motion.div>
        </div>        
        <div className="space-y-8" ref={feedRef}>
          {/* Input Phase */}
          {phases.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-sm bg-muted shadow-muted-foreground">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900 dark:text-gray-200">Describe Your Project Vision</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <PromptBox
                        placeholders={placeholders}
                        onChange={(e) => setProjectIdea(e.target.value)}
                        onSubmit={handleSubmitIdea}
                        // inputValue={projectIdea} 
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

        </div>
      </div>
          </Vortex>
    </div>
  )
}
