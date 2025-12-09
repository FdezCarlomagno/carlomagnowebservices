"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import InteractiveBackground from "./InteractiveBackground"
import InteractiveCanvasBackground from "./interactiveCanvasBackground"
import logo from '../public/Component 8.png'


gsap.registerPlugin(ScrollTrigger, CustomEase)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const bgBlobsRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const [bgVisible, setBgVisible] = useState(true)
  const [resetKey, setResetKey] = useState(0) // <- key para remount del canvas
  const startButtonRef = useRef<HTMLAnchorElement>(null)
  const contactButtonRef = useRef<HTMLAnchorElement>(null)



  useEffect(() => {
    const ctx = gsap.context(() => {
      // Custom ease para animaciones más naturales
      CustomEase.create("smooth", "0.4, 0.0, 0.2, 1")

      // Animación de entrada del título con split text effect
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char")
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.03,
            ease: "smooth",
            delay: 0.2,
          }
        )
      }

      // Animación del subtítulo con efecto de brillo
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "smooth",
            delay: 0.6,
          }
        )

        // Efecto de brillo sutil
        gsap.to(subtitleRef.current, {
          textShadow: "0 0 30px rgba(150, 120, 255, 0.6)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }

      // Animación de descripción
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "smooth",
            delay: 0.8,
          }
        )
      }

      // CON ESTE:
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll("a")
        gsap.fromTo(
          buttons,
          {
            opacity: 0,
            scale: 0.8,
            y: 30,
            x: (index) => index === 0 ? -20 : 20
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            stagger: 0.2, // ← Stagger más pronunciado
            ease: "back.out(1.7)",
            delay: 1,
          }
        )
      }

      // Animación de íconos sociales
      if (socialsRef.current) {
        const icons = socialsRef.current.querySelectorAll("a")
        gsap.fromTo(
          icons,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(2)",
            delay: 1.2,
          }
        )
      }

      // Animación de blobs de fondo
      if (bgBlobsRef.current) {
        const blobs = bgBlobsRef.current.querySelectorAll(".blob")
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            scale: gsap.utils.random(1.1, 1.3),
            x: `${gsap.utils.random(-20, 20)}%`,
            y: `${gsap.utils.random(-20, 20)}%`,
            duration: gsap.utils.random(4, 8),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          })
        })
      }

      // Parallax en scroll para el contenido
      if (heroRef.current) {
        const content = heroRef.current.querySelector('.hero-content')

        gsap.to(content, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          opacity: 1,
          y: 300,
          scale: 1,
        })

        // Parallax del fondo
        if (backgroundRef.current) {
          gsap.to(backgroundRef.current, {
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
            y: 200,
            opacity: 1,
            scale: 1.5
          })
        }

        // Parallax de blobs
        if (bgBlobsRef.current) {
          gsap.to(bgBlobsRef.current, {
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
            y: 100,
          })
        }
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

    useEffect(() => {
    const el = backgroundRef.current
    if (!el) return

    // thresholds incluyen 0 para detectar cuando totalmente fuera (intersectionRatio === 0)
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        // si intersectionRatio === 0 => fuera de pantalla completamente
        setBgVisible(entry.intersectionRatio > 0)
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.01, 0.5, 1],
      }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
    }
  }, [backgroundRef])

  // Efecto magnético en botones y enlaces
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(target, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    })
  }

  // Función para crear caracteres individuales
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ transformOrigin: "bottom" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  // Reset handler: incrementa resetKey para remount del canvas
  const handleResetAnimation = () => {
    setResetKey((k) => k + 1)
    // opcional: asegurar que background esté activo al resetear
    setBgVisible(true)
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#f7f7fb] select-none"
    >
      {/* Fondo interactivo con partículas - z-1 */}
      <div ref={backgroundRef} className="absolute inset-0" style={{ zIndex: 1 }}>
        <InteractiveCanvasBackground key={resetKey} isActive={bgVisible} />
      </div>


      {/* Overlay oscuro para mejorar legibilidad - z-3 */}
      <div
        className="absolute"
        style={{ zIndex: 3 }}
      />

      {/* Contenido principal - z-10 */}
      <div
        className="hero-content relative text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-3 leading-tight"
        >
          {splitText("Carlomagno")}
          <br />
          <span
            className="text-accent"
          >
            {splitText("Web Services")}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-2xl sm:text-3xl md:text-3xl font-semibold text-accent mb-6"
        >
          Tu presencia digital, bien construida
        </p>

        <p
          ref={descriptionRef}
          className="text-lg sm:text-xl md:text-1.5xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed"

        >
          <span className="font-bold text-gray-700">Tecnología + creatividad + enfoque humano</span> para hacer
          crecer tu negocio. Transformo ideas en productos digitales reales y funcionales.
        </p>

        {/* Botones con efecto magnético */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
        >
          <Link
            href="/contactForm"
            ref={startButtonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="px-8 py-4 bg-accent text-white rounded-lg font-medium text-lg"
          >
            Comenzar
          </Link>
          <a
            href="#contact"
            ref={contactButtonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="px-8 py-4 bg-black backdrop-blur-md border-2 text-white rounded-lg font-medium  transition-all text-lg"
          >
            Contacto
          </a>
        </div>

        {/* Íconos sociales con animación */}
        <div
          ref={socialsRef}
          className="flex gap-6 justify-center items-center mt-6"
        >
          <Link
            href="https://github.com/FdezCarlomagno"
            target="_blank"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="text-gray-900 hover:text-blue-400 transition hover:scale-110 bg-white/5 backdrop-blur-sm p-3 rounded-full hover:bg-white/10"
            aria-label="GitHub"
            style={{ pointerEvents: 'auto' }}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.37.5 0 5.87 0 12.52c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.27.82-.59 0-.29-.01-1.06-.02-2.07-3.34.73-4.04-1.63-4.04-1.63-.55-1.43-1.35-1.82-1.35-1.82-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.27 1.86 1.27 1.08 1.88 2.83 1.34 3.52 1.02.11-.8.42-1.34.76-1.65-2.67-.31-5.47-1.37-5.47-6.09 0-1.35.46-2.46 1.23-3.33-.12-.3-.53-1.56.12-3.25 0 0 1-.33 3.3 1.26a11.24 11.24 0 0 1 6 0c2.28-1.59 3.28-1.26 3.28-1.26.66 1.69.25 2.95.13 3.25.77.87 1.23 1.98 1.23 3.33 0 4.74-2.8 5.77-5.48 6.08.43.37.81 1.1.81 2.23 0 1.61-.01 2.91-.01 3.31 0 .32.21.7.83.58A12.03 12.03 0 0 0 24 12.52C24 5.87 18.63.5 12 .5Z" />
            </svg>
          </Link>

          <Link
            href="https://www.linkedin.com/in/valentin-f-carlomagno-10683b338/"
            target="_blank"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="text-gray-900 hover:text-blue-400 transition hover:scale-110 bg-white/5 backdrop-blur-sm p-3 rounded-full hover:bg-white/10"
            aria-label="LinkedIn"
            style={{ pointerEvents: 'auto' }}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.356V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.124zM6.994 20.452H3.68V9h3.314v11.452z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Flecha animada - z-10 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ zIndex: 10 }}>
        <ArrowDown
          className="text-gray-400 animate-bounce"
          size={32}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
          }}
        />
      </div>

      {/* Botón Reset - abajo derecha */}
      <button
        onClick={handleResetAnimation}
        className="pointer-events-auto absolute bottom-6 right-6 z-20 flex items-center justify-center rounded-full bg-white/90 text-black shadow-lg p-3 hover:bg-white transition"
        aria-label="Reset background animation"
        title="Reset background animation"
      >
        Reset
      </button>
    </section>
  )
}
