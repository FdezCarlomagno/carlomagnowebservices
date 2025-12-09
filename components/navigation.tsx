"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"])
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"])
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1])
    // 🔥 FIX: deshabilitar clicks cuando el nav es invisible
  const pointerEvents = useTransform(navOpacity, (v) =>
    v === 0 ? "none" : "auto"
  )


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Servicios", href: "#services" },
    { name: "Tecnologias", href: "#techCategories"},
    { name: "Portfolio", href: "#portfolio" },
    { name: "Sobre mí", href: "#about" },
    { name: "Contacto", href: "#contact" },
  ]

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter: backdropBlur, opacity: navOpacity, pointerEvents }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 select-none"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              Carlomagno<span className="text-accent">.</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <Link href={"/contactForm"}>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Comenzar
              </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : "100%",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-background z-40 md:hidden shadow-2xl"
      >
        <div className="flex flex-col gap-6 p-8 pt-24">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-medium text-foreground hover:text-accent transition-colors"
            >
              {item.name}
            </a>
          ))}
          <Link href={"/contactForm"}>
          <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
          Comenzar
          </Button>
           </Link>
        </div>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  )
}
