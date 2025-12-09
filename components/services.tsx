"use client"

import { useRef, useEffect, useState } from "react"
import { Globe, Code, Palette, Video, Smartphone, Users } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web Moderno",
    description:
      "Sitios web a medida, landing pages optimizadas y diseño responsivo con tecnologías modernas como React, Next.js y Tailwind.",
    color: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
  },
  {
    icon: Code,
    title: "Desarrollo de Aplicaciones",
    description:
      "Aplicaciones web interactivas, dashboards personalizados, APIs REST y backends escalables con buenas prácticas.",
    color: "from-green-500 to-emerald-500",
    bgGlow: "bg-green-500/20",
  },
  {
    icon: Palette,
    title: "Branding y Diseño Digital",
    description:
      "Diseño visual profesional, identidad gráfica para negocios y material digital para redes y web con UI en Figma.",
    color: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
  },
  {
    icon: Video,
    title: "Contenido & Video",
    description:
      "Creación de contenido digital, edición de videos profesionales para redes y material audiovisual de calidad.",
    color: "from-red-500 to-orange-500",
    bgGlow: "bg-red-500/20",
  },
  {
    icon: Smartphone,
    title: "Marketing Digital",
    description:
      "Gestión de redes sociales, consultoría digital y estrategias para potenciar tu presencia online.",
    color: "from-pink-500 to-rose-500",
    bgGlow: "bg-pink-500/20",
  },
  {
    icon: Users,
    title: "Consultoría & Soporte",
    description:
      "Asesoría personalizada, análisis de necesidades, documentación completa y acompañamiento post-entrega.",
    color: "from-orange-500 to-amber-500",
    bgGlow: "bg-orange-500/20",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Detectar si es desktop (768px = md breakpoint de Tailwind)
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkIsDesktop()
    window.addEventListener("resize", checkIsDesktop)

    return () => window.removeEventListener("resize", checkIsDesktop)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada del título con clip-path
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        )
      }

      // Solo aplicar scroll horizontal en desktop
      if (isDesktop && scrollContainerRef.current && cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card")
        const scrollWidth = cardsRef.current.scrollWidth - window.innerWidth

        // Animación de scroll horizontal (solo desktop)
        gsap.to(cardsRef.current, {
          x: () => -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 25%",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // Animación individual de cada tarjeta (desktop)
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              scale: 0.8,
              rotateY: -15,
            },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 0.6,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: scrollContainerRef.current,
                start: "top 60%",
                end: "top 20%",
                scrub: false,
              },
              delay: index * 0.1,
            }
          )
        })

        // Indicador de scroll
        const indicator = document.querySelector(".scroll-indicator")
        if (indicator) {
          gsap.to(indicator, {
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
            opacity: 0,
            y: -20,
          })
        }
      } else if (!isDesktop && cardsRef.current) {
        // Animaciones para mobile (scroll vertical normal)
        const cards = cardsRef.current.querySelectorAll(".service-card")
        
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none none",
              },
            }
          )
        })
      }

      // Animación de hover de íconos (funciona en ambos)
      const cards = document.querySelectorAll(".service-card")
      cards.forEach((card) => {
        const icon = card.querySelector(".service-icon")
        if (icon) {
          card.addEventListener("mouseenter", () => {
            gsap.to(icon, {
              scale: 1.2,
              rotate: 360,
              duration: 0.6,
              ease: "back.out(2)",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              duration: 0.4,
              ease: "power2.out",
            })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden"
    >
      {/* Efecto de superposición con el Hero */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Título y descripción */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-20">
        <div ref={titleRef} className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Mis Servicios
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Soluciones integrales para crear presencia online profesional
          </p>
          
          {/* Indicador de scroll - solo desktop */}
          {isDesktop && (
            <div className="scroll-indicator mt-12 flex items-center justify-center gap-3 text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-sm font-medium">Desliza horizontalmente</span>
            </div>
          )}
        </div>
      </div>

      {/* Contenedor - horizontal en desktop, vertical en mobile */}
      <div ref={scrollContainerRef} className="relative">
        <div 
          ref={cardsRef} 
          className={`
            ${isDesktop 
              ? 'flex gap-8 px-4 sm:px-6 lg:px-8 pb-32' 
              : 'grid grid-cols-1 gap-8 px-4 sm:px-6 lg:px-8 pb-20 max-w-2xl mx-auto'
            }
          `}
          style={isDesktop ? { width: "max-content" } : {}}
        >
          {/* Espaciador inicial - solo desktop */}
          {isDesktop && <div className="w-[10vw] shrink-0" />}

          {services.map((service, index) => (
            <div
              key={service.title}
              className={`
                service-card relative
                ${isDesktop 
                  ? 'w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[400px] shrink-0' 
                  : 'w-full'
                }
              `}
            >
              {/* Glow de fondo animado */}
              <div
                className={`card-glow absolute inset-0 ${service.bgGlow} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
              />

              {/* Tarjeta principal */}
              <div className="group relative h-full bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20">
                {/* Número de índice decorativo */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-accent/10">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Ícono con gradiente */}
                <div className="service-icon relative mb-6 inline-block">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-50`} />
                  <div className={`relative bg-gradient-to-br ${service.color} p-4 rounded-2xl`}>
                    <service.icon size={40} strokeWidth={1.5} className="text-white" />
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {service.description}
                </p>

                {/* Barra decorativa inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}

          {/* Espaciador final - solo desktop */}
          {isDesktop && <div className="w-[10vw] shrink-0" />}
        </div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}