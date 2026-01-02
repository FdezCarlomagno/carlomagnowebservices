"use client"

import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import About from "@/components/about"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import TechCategories from "@/components/techCategories"
import WhatsAppButton from "@/components/whatsappButton"
import { useLenis } from "@/hooks/useLenis"

export default function Home() {
  useLenis()
  return (
    <main className="relative">
      <Navigation />
      <WhatsAppButton />
      <Hero />
      <Services />
      <TechCategories />
      <Portfolio />
      <About />
      <Contact />
    </main>
  )
}
