"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Footer from "./footer"
import * as z from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import emailjs from "emailjs-com"

const schema = z.object({
  name: z.string().min(2, "Nombre obligatorio"),
  email: z.string().email("Email inválido"),
  user_message: z.string().min(4, "Por favor, escribí tu mensaje")
})

type FormData = z.infer<typeof schema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showServiceError, setShowServiceError] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", user_message: "" },
    mode: "onTouched"
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setShowServiceError(false)

    try {
      const promise = emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      await promise

      setIsSubmitted(true)
      reset()
      setTimeout(() => setIsSubmitted(false), 4000)
    } catch (err) {
      console.error(err)
      setShowServiceError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            ¿Ténes una idea? Estoy listo para hacerla realidad
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg text-accent">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground">carlomagnowebservices@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg text-accent">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Teléfono</h3>
                <p className="text-muted-foreground">+54 9 2494 24-4354</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg text-accent">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Ubicación</h3>
                <p className="text-muted-foreground">Tandil, Buenos Aires, Argentina</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 bg-card border border-border rounded-2xl p-8"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <Input {...register("name")} placeholder="Tu nombre" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input {...register("email")} type="email" placeholder="tu@email.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mensaje</label>
              <Textarea {...register("user_message")} rows={5} placeholder="Contame sobre tu proyecto..." />
              {errors.user_message && <p className="text-red-500 text-sm mt-1">{errors.user_message.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-accent" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </Button>

            {isSubmitted && <p className="text-green-600 text-sm text-center">¡Mensaje enviado con éxito!</p>}
            {showServiceError && <p className="text-red-600 text-sm text-center">Error. Probá de nuevo más tarde.</p>}
          </motion.form>
        </div>
      </div>

      <Footer />
    </section>
  )
}
