"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, BookOpen, GraduationCap } from "lucide-react";
import { UserCard } from "../components/UserCard";
import { UserCardSkeleton } from "../components/UserCardSkeleton";
import { ReferenceCard } from "../components/ReferenceCard";
import {
  mockTeamMembers,
  mockMentors,
  mockReferences,
  mockRefinedIdea,
} from "../../server/mockData";
import { ProjectRoadmap } from "../components/ProjectRoadmap";
import { TypingIndicator } from "../components/TypingIndicator";
import { QuickActionChips } from "../components/QuickActionChips";
import { MentorshipModal } from "../components/MentorshipModal";
import { useEffect, useState } from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { CollaborationModal } from "../components/CollaborationModal";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { useSearchParams } from "next/navigation";


const CollabXResponseView = ({ params }: { params: { responseId: string } }) => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [selectedTeamMate, setSelectedTeamMate] = useState<any>(null);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);
  const [phases, setPhases] = useState<string[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");

  const { displayText, isComplete } = useTypewriter(
    phases.includes("refined") ? mockRefinedIdea : "",
    15
  );

  const handleScreenshot = async () => {
    if (!viewRef.current) return;
    try {
      const dataUrl = await toPng(viewRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "collabx-response.png";
      link.click();
    } catch (err) {
      console.error("Screenshot failed", err);
    }
  };


  const start = () => {
    setPhases(["refined"]);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
    }, 800);
  };

  const loadPhase = (phase: string) => {
    if (!phases.includes(phase)) {
      setPhases([...phases, phase]);
      setShowSkeletons(true);
      setTimeout(() => setShowSkeletons(false), 1200);
    }
  };

  const handleRequestMentorship = (mentor: any) => {
    console.log("Requesting mentorship with:", mentor);
    setSelectedMentor(mentor);
    setShowMentorModal(true);
  };

  const handleRequestCollaboration = (teamMate: any) => {
    console.log("Requesting collaboration with:", teamMate);
    setSelectedTeamMate(teamMate);
    setShowCollaborationModal(true);
  };


   useEffect(() => {
    if (prompt) {
      start(); 
    }
  }, [prompt]);
  return (
    <div ref={viewRef} className="min-h-screen bg-muted">
      <MentorshipModal
        mentor={selectedMentor}
        isOpen={showMentorModal}
        onClose={() => setShowMentorModal(false)}
      />

      <CollaborationModal
        teamMate={selectedTeamMate}
        isOpen={showCollaborationModal}
        onClose={() => setShowCollaborationModal(false)}
      />

      <QuickActionChips
        onRefineIdea={() => console.log("Refine idea")}
        onChangeSkills={() => console.log("Change skills")}
        onRegenerateTeam={() => console.log("Regenerate team")}
        onFindReferences={() => console.log("Find references")}
        onScreenshot={handleScreenshot}
      />

      {/* Phase 1: AI Refined Idea */}
      {phases.includes("refined") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-full mx-auto p-3"
        >
          <Card className="border-0 shadow-sm bg-muted shadow-muted-foreground">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-lg lg:text-3xl font-medium text-gray-900 dark:text-gray-200">
                <div className="min-w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 rounded-full text-white" />
                </div>
                <span>
                  AI Refined Project Idea:{" "}
                  <strong> Smart Campus Navigator</strong>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 -mt-6">
              <div className="space-y-2">
                {showTyping && <TypingIndicator />}

                {!showTyping && displayText && (
                  <div className="prose prose-lg prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg dark:text-gray-200">
                      {displayText}
                    </p>
                  </div>
                )}

                {/* Buttons to Load Next Phases */}
                <AnimatePresence>
                  {isComplete && (
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap justify-center gap-4 pt-6 overflow-visible"
                    >
                      <Button onClick={() => loadPhase("team")}>
                        Show Team
                      </Button>
                      <Button onClick={() => loadPhase("references")}>
                        Show References
                      </Button>
                      <Button onClick={() => loadPhase("mentors")}>
                        Show Mentors
                      </Button>
                      <Button onClick={() => loadPhase("roadmap")}>
                        Show Roadmap
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Phase 2: Team Members */}
      {phases.includes("team") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-full mx-auto p-4"
        >
          <Card className="border-0 shadow-sm bg-muted shadow-muted-foreground">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900 dark:text-gray-200">
                <div className="min-w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>Recommended Team Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {showSkeletons && phases[phases.length - 1] === "team"
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <UserCardSkeleton key={index} />
                    ))
                  : mockTeamMembers.map((user, index) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        index={index}
                        type="team"
                        onRequestCollaboration={() =>
                          handleRequestCollaboration(user)
                        }
                      />
                    ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Phase 3: References */}
      {phases.includes("references") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-full mx-auto p-4"
        >
          <Card className="border-0 shadow-sm bg-muted shadow-muted-foreground">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900 dark:text-gray-200">
                <div className="min-w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span>Recommended References</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showSkeletons && phases[phases.length - 1] === "references"
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <UserCardSkeleton key={index} />
                    ))
                  : mockReferences.map((reference, index) => (
                      <ReferenceCard
                        key={reference.id}
                        reference={reference}
                        index={index}
                      />
                    ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Phase 4: Mentors */}
      {phases.includes("mentors") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-full mx-auto p-4"
        >
          <Card className="border-0 shadow-sm bg-muted shadow-muted-foreground">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900 dark:text-gray-200">
                <div className="min-w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span>Recommended Mentors</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showSkeletons && phases[phases.length - 1] === "mentors"
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <UserCardSkeleton key={index} />
                    ))
                  : mockMentors.map((mentor, index) => (
                      <UserCard
                        key={mentor.id}
                        user={mentor}
                        index={index}
                        type="mentor"
                        onRequestMentorship={handleRequestMentorship}
                      />
                    ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Phase 5: Roadmap */}
      {phases.includes("roadmap") && <ProjectRoadmap />}
    </div>
  );
};

export default CollabXResponseView;
