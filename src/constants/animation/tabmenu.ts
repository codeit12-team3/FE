export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
}

export const SLIDE_UP = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    duration: 0.6,
    delay: 0.1,
    ease: [0.25, 0.1, 0.25, 1] as const,
  },
} as const
