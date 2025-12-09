"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

export default function Step2Project() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="projectTitle" className="block text-sm font-medium text-card-foreground mb-1">
          Título del proyecto *
        </label>
        <Input id="projectTitle" {...register("projectTitle")} placeholder="Nombre de tu proyecto" />
        {errors.projectTitle && <p className="text-destructive text-sm mt-1">{errors.projectTitle.message as string}</p>}
      </div>

      <div>
        <label htmlFor="projectDescription" className="block text-sm font-medium text-card-foreground mb-1">
          Descripción *
        </label>
        <Textarea
          id="projectDescription"
          {...register("projectDescription")}
          placeholder="Cuéntame brevemente sobre tu proyecto..."
          rows={4}
        />
        {errors.projectDescription && <p className="text-destructive text-sm mt-1">{errors.projectDescription.message as string}</p>}
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-card-foreground mb-1">
          Prioridad
        </label>
        <select
          {...register("priority")}
          className="w-full border border-border rounded-md p-2"
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
    </div>
  )
}
