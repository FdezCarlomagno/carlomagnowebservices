"use client"

import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

export default function Step1Personal() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-1">
          Nombre *
        </label>
        <Input id="name" {...register("name")} placeholder="Tu nombre" />
        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message as string}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-1">
          Email *
        </label>
        <Input id="email" {...register("email")} placeholder="tu@email.com" />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message as string}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-1">
          Teléfono (opcional)
        </label>
        <Input id="phone" {...register("phone")} placeholder="+54 9 ..." />
      </div>
    </div>
  )
}
