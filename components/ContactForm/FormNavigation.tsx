"use client"

import { Button } from "@/components/ui/button"

interface Props {
  step: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
  isSubmitting?: boolean
}

export default function FormNavigation({ step, totalSteps, onNext, onPrev, isSubmitting }: Props) {
  return (
    <div className="flex justify-between mt-6">
      {step > 1 ? (
        <Button variant="outline" onClick={onPrev}>Anterior</Button>
      ) : <div />}
      <Button onClick={onNext} disabled={isSubmitting}>
        {step === totalSteps ? "Enviar" : "Siguiente"}
      </Button>
    </div>
  )
}
