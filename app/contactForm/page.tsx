"use client"

import ContactForm from "@/components/ContactForm/ContactForm"
import Navigation from "@/components/navigation"
import { useLenis } from "@/hooks/useLenis"

export default function ContactFormPage() {
  useLenis()
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <ContactForm />
    </div>
  )
}
