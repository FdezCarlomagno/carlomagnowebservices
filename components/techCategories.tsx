"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

import reactLogo from '../public/logos/react.svg'
import tsLogo from '../public/logos/Typescript.svg'
import jsLogo from '../public/logos/javascript.svg'
import nodeLogo from '../public/logos/nodejs.svg'
import expressLogo from '../public/logos/express.svg'
import mysqlLogo from '../public/logos/mySQL.svg'
import postgresqlLogo from '../public/logos/postgresql.svg'
import javaLogo from '../public/logos/java.svg'
import figmaLogo from '../public/logos/figma.svg'
import springBootLogo from '../public/logos/spring.svg'
import kotlinLogo from '../public/logos/kotlin.svg'
import tailwindLogo from '../public/logos/tailwind.svg'
import thunderClientLogo from '../public/logos/thunderclient.svg'
import gitLogo from '../public/logos/git.svg'
import githubLogo from '../public/logos/github.svg'
import postmanLogo from '../public/logos/postman.svg'
import dockerLogo from '../public/logos/docker.svg'
import supabaseLogo from '../public/logos/supabase.svg'
import mongodbLogo from '../public/logos/mongodb.svg'
import cssLogo from '../public/logos/css.svg'
import nextjsLogo from '../public/logos/nextjs.svg'

export default function TechCategories() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const techCategories = [
    {
      title: "Frontend",
      color: "#3b82f6",
      items: [
        { name: "React.js", logo: reactLogo },
        { name: "Next.js", logo: nextjsLogo},
        { name: "TypeScript", logo: tsLogo },
        { name: "JavaScript", logo: jsLogo },
        { name: "CSS", logo: cssLogo},
        { name: "TailwindCSS", logo: tailwindLogo },
        { name: "Kotlin", logo: kotlinLogo },
      ],
    },
    {
      title: "Backend",
      color: "#10b981",
      items: [
        { name: "Node.js", logo: nodeLogo },
        { name: "Express", logo: expressLogo },
        { name: "Java", logo: javaLogo },
        { name: "SpringBoot", logo: springBootLogo },
        { name: "Kotlin", logo: kotlinLogo },
      ],
    },
    {
      title: "Bases de Datos",
      color: "#a855f7",
      items: [
        { name: "MySQL", logo: mysqlLogo },
        { name: "PostgreSQL", logo: postgresqlLogo },
        { name: "Mongo DB", logo: mongodbLogo },
        { name: "Supabase", logo: supabaseLogo }
      ],
    },
    {
      title: "Diseño/Herramientas",
      color: "#f97316",
      items: [
        { name: "Figma", logo: figmaLogo },
        { name: "Postman", logo: postmanLogo },
        { name: "Thunderclient", logo: thunderClientLogo },
        { name: "Git", logo: gitLogo },
        { name: "Github", logo: githubLogo },
        { name: "Docker", logo: dockerLogo }
      ],
    },
  ]

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkIsDesktop()
    window.addEventListener("resize", checkIsDesktop)
    return () => window.removeEventListener("resize", checkIsDesktop)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título con reveal effect
      if (titleRef.current) {
        const heading = titleRef.current.querySelector("h2")
        const subtitle = titleRef.current.querySelector("p")

        gsap.fromTo(
          heading,
          { opacity: 0, y: 80, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 75%",
            },
          }
        )

        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 75%",
            },
          }
        )
      }

      // Animación de las categorías con parallax individual
      if (categoriesRef.current) {
        const categories = categoriesRef.current.querySelectorAll(".tech-category")

        categories.forEach((category, catIndex) => {
          // Animación de entrada de la categoría
          const categoryTitle = category.querySelector(".category-title")
          const categoryLine = category.querySelector(".category-line")

          gsap.fromTo(
            categoryTitle,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: category,
                start: "top 80%",
              },
            }
          )

          gsap.fromTo(
            categoryLine,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: category,
                start: "top 80%",
              },
            }
          )

          // Animación individual de cada tecnología
          const items = category.querySelectorAll(".tech-item")
          items.forEach((item, itemIndex) => {
            // Animación de entrada
            gsap.fromTo(
              item,
              {
                opacity: 0,
                y: 60,
                scale: 0.8,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.4)",
                scrollTrigger: {
                  trigger: category,
                  start: "top 75%",
                },
                delay: itemIndex * 0.08,
              }
            )

            // Hover effect
            const itemElement = item as HTMLElement
            const logo = item.querySelector(".tech-logo")
            const name = item.querySelector(".tech-name")

            itemElement.addEventListener("mouseenter", () => {
              gsap.to(logo, {
                scale: 1.15,
                rotate: 5,
                duration: 0.4,
                ease: "back.out(2)",
              })
              gsap.to(name, {
                x: 5,
                duration: 0.3,
                ease: "power2.out",
              })
            })

            itemElement.addEventListener("mouseleave", () => {
              gsap.to(logo, {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: "power2.out",
              })
              gsap.to(name, {
                x: 0,
                duration: 0.3,
                ease: "power2.out",
              })
            })
          })
        })
      }

      // Parallax suave de los blobs de fondo
      const blobs = sectionRef.current?.querySelectorAll(".bg-blob")
      blobs?.forEach((blob, index) => {
        gsap.to(blob, {
          y: index % 2 === 0 ? -150 : -80,
          x: index % 2 === 0 ? 50 : -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <section
      ref={sectionRef}
      id="techCategories"
      className="relative min-h-screen py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background"
    >
      {/* Blobs de fondo animados */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-blob absolute top-20 left-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="bg-blob absolute bottom-20 right-10 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        <div className="bg-blob absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título */}
        <div ref={titleRef} className="text-center mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Stack{" "}
            <span className="bg-gradient-to-r from-accent via-accent/70 to-accent bg-clip-text text-transparent">
              Tecnológico
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Herramientas y tecnologías que domino para construir soluciones robustas
          </p>
        </div>

        {/* Categorías */}
        <div ref={categoriesRef} className="space-y-16 sm:space-y-20 max-w-6xl mx-auto">
          {techCategories.map((category, catIndex) => (
            <div key={category.title} className="tech-category">
              {/* Título de categoría */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="category-title text-2xl sm:text-3xl md:text-4xl font-bold"
                  style={{ color: category.color }}
                >
                  {category.title}
                </div>
                <div
                  className="category-line flex-1 h-1 rounded-full origin-left"
                  style={{ backgroundColor: `${category.color}40` }}
                />
              </div>

              {/* Grid de tecnologías */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.name}
                    className="tech-item group cursor-pointer h-full"
                  >
                    <div className="relative h-full bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 hover:border-accent/50 hover:bg-card/60 transition-all duration-300 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px]">
                      {/* Logo */}
                      <div className="tech-logo mb-4 flex items-center justify-center">
                        <img
                          src={item.logo.src}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                        />
                      </div>

                      {/* Nombre */}
                      <div className="tech-name text-center text-sm sm:text-base font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                        {item.name}
                      </div>

                      {/* Indicador de hover */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}