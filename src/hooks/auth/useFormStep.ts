'use client'

import { useState } from 'react'

interface Props {
  initialStep?: number
  maxStep: number
}

export default function useFormStep({ initialStep = 1, maxStep }: Props) {
  const [step, setStep] = useState(initialStep)

  const next = () => {
    setStep((prev) => (prev < maxStep ? prev + 1 : prev))
  }

  const prev = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev))
  }

  return {
    step,
    setStep,
    next,
    prev,
    isFirst: step === 1,
    isLast: step === maxStep,
  }
}
