'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StateButton } from '@/components/ui/stateful-button'; // Adjust as needed

interface PhaseButtonsProps {
  isComplete: boolean;
  loadPhase: (phase: string) => void;
}

export default function PhaseButtons({ isComplete, loadPhase }: PhaseButtonsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure we're fully on the client before triggering any animations
    setMounted(true);
  }, []);

  const buttons = [
    { label: 'Show Team', phase: 'team' },
    { label: 'Show References', phase: 'references' },
    { label: 'Show Mentors', phase: 'mentors' },
    { label: 'Show Roadmap', phase: 'roadmap' },
  ];

  if (!mounted || !isComplete) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      }}
      className="flex flex-wrap justify-center gap-4 pt-6"
    >
      {buttons.map(({ label, phase }) => (
        <motion.div
          key={phase}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Using a key forces internal state resets if needed */}
          <StateButton key={`button-${mounted}-${phase}`} onClick={() => loadPhase(phase)}>
            {label}
          </StateButton>
        </motion.div>
      ))}
    </motion.div>
  );
}
