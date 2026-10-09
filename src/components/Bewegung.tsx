"use client";

import { MotionConfig } from "motion/react";

/** Sorgt dafür, dass Motion-Animationen die Einstellung „Bewegung reduzieren“ beachten. */
export default function Bewegung({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
