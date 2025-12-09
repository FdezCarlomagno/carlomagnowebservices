"use client"

import { useFormContext, Controller } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"

export default function Step3Services() {
  const { control } = useFormContext()

  const services = [
    "Diseño Web",
    "Community Management",
    "Edición de Videos",
    "Otro"
  ]

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-card-foreground mb-2">Servicios que buscas</label>
      <Controller
        control={control}
        name="services"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            {services.map((s) => (
              <label key={s} className="flex items-center gap-2">
                <Checkbox
                  checked={field.value?.includes(s)}
                  onCheckedChange={(checked : boolean) => {
                    const current = field.value || []
                    if (checked) {
                      field.onChange([...current, s])
                    } else {
                      field.onChange(current.filter((c: string) => c !== s))
                    }
                  }}
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        )}
      />
    </div>
  )
}
