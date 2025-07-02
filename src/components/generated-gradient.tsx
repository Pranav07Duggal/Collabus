
import React from 'react';
import { getGradientClass } from '@/lib/gradient-utils';

interface Props {
  seed: string;
  children?: React.ReactNode;
  className?: string; // optional for additional styling
}

const GeneratedGradient: React.FC<Props> = ({ seed, children, className = '' }) => {
  const gradientClass = getGradientClass(seed);

  return (
    <div
      className={`rounded-lg text-white p-4 ${gradientClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default GeneratedGradient;
