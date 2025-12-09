"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

import profilePic from '../public/Foto personal vale.jpeg'
import decor1 from '../public/Component 8.png'
import decor2 from '../public/static-1-7-1.png'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Sobre Mí
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              <span className="font-bold">Carlomagno Web Services</span> es un servicio especializado en desarrollo digital
              y soluciones personalizadas para emprendedores, pymes y profesionales.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Brindo servicios integrales orientados a crear presencia online profesional, mejorar procesos digitales
              y potenciar la imagen de mis clientes a través de tecnología moderna y diseño funcional.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ayudo a negocios y creadores a entrar al mundo digital con soluciones simples, funcionales y
              atractivas, garantizando código limpio, diseño moderno y experiencia de usuario clara con acompañamiento
              post-entrega.
            </p>
          </motion.div>

          {/* Imágenes animadas */}
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
            <motion.img
              src={decor1.src}
              alt="Decoración 1"
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-64 h-64 rounded-3xl object-cover shadow-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.01 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.img
              src={decor2.src}
              alt="Decoración 2"
              style={{ y: y2 }}
              className="absolute bottom-0 left-0 w-80 h-80 rounded-3xl object-cover shadow-xl"
              initial={{ scale: 1 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-accent/40 to-secondary/40 blur-3xl shadow-lg" />
            </motion.div>
            <motion.img
              src={profilePic.src}
              alt="Foto Vale"
              className="absolute inset-0 mx-auto my-auto w-60 h-60 rounded-full object-cover shadow-2xl border-4 border-white"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
