"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Code2, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TechCategories from '../components/techCategories'

const frontendProjects = [
  {
    id: 1,
    name: "Anicarlomagno Landing-page",
    description:
      "This project is an interactive landing page developed for the renowned artist Analia Carlomagno. It showcases her artistic works",
    details: [
      "Developed with React.js, the Anicarlomagno landing page aims to provide an interactive experience that highlights the artistic work of artist Analia Carlomagno.",
      "The page is designed with a minimalist and elegant style, using modern CSS to emphasize the artwork while maintaining intuitive navigation for users.",
      "With a responsive design, the landing page adapts to devices of various sizes, ensuring a smooth user experience on both mobile and desktop computers.",
      "Subtle animations are used to make navigation more engaging without distracting from the artwork and the important content of the page.",
      "Through the page, visitors can learn more about the artist, explore her portfolio of works, and get details about her exhibitions and future projects.",
      "The design also highlights easy access to social media links and other means for users to follow Anicarlomagno's work online.",
    ],
    repo: "https://github.com/FdezCarlomagno/anicarlomagno",
    live: "https://anicarlomagno.vercel.app/",
    technologies: "React.js, Javascript, CSS",
  },
  {
    id: 5,
    name: "GameHub",
    description: "A mock gaming platform showcasing video games with an intuitive UX following Jakob Nielsen's principles. Features three fully playable games built with canvas and React",
    details: [
      "Interactive web platform displaying video games with a focus on excellent user experience design following Jakob Nielsen's UX/UI principles.",
      "Built with React.js consuming a games API to display dynamic game catalog with detailed information and cover images.",
      "Implements three fully functional games: Blocka Game (block-breaking puzzle), Peg Solitaire (strategic board game), and Flappy Bird (arcade classic).",
      "Advanced canvas manipulation for rendering game graphics, animations, and interactive gameplay elements across all three games.",
      "Parallax scrolling effects creating depth and visual interest throughout the landing page and game sections.",
      "Complex state management handling game loops, player interactions, collision detection, scoring systems, and game state transitions.",
      "Peg Solitaire features sophisticated game logic including valid move calculation, board state validation, and win condition detection.",
      "Game loop architecture implementing requestAnimationFrame for smooth 60fps gameplay across all interactive elements.",
      "Responsive design prototyped in Figma ensuring optimal experience across desktop and mobile devices.",
      "Custom CSS styling creating a modern gaming aesthetic with smooth transitions and engaging hover effects.",
    ],
    repo: "https://github.com/FdezCarlomagno/TP2-interfaces-react",
    live: "https://fdezcarlomagno.github.io/TP2-interfaces-react/",
    technologies: "React.js, Javascript, Canvas API, Figma, CSS",
  },
  {
    id: 2,
    name: "Country Info App",
    description:
      "This project is a React-based application that provides information about country-related data. It allows users to fetch and display information about countries, states, and specific country details through a context-based architecture.",
    details: [
      "The Country Management Application allows users to fetch and display information about countries, states, and specific country details. It includes features for managing filtered views of the countries and sharing state across the application using React's Context API.",
      "The frontend is built with React and TypeScript for type safety. The backend utilizes Node.js to manage API requests for country and state data.",
      "The project has a well-structured file hierarchy to separate concerns. The key components are organized into: 'api' for API calls, 'context' for global state management, 'interfaces' for TypeScript models, and 'components' for displaying country lists and detailed country information.",
      "The project communicates with the backend API using the following key endpoints: 'GET /countries' to fetch all countries, 'GET /countries/:countryCode' to fetch details for a specific country by its code, and 'POST /states' to fetch states for a given country by its name.",
      "The React Context API is used to manage global state for the application. Key properties include countries, country, states, and filteredCountries. Methods like fetchCountries, fetchCountry, and fetchStates are used to interact with the data and update the state.",
    ],
    repo: "https://github.com/FdezCarlomagno/Country-info-app-TS",
    live: "https://country-info-app-o3ke.onrender.com/",
    technologies: "React.js, Node.js, Express.js, Typescript, Tailwind CSS",
  },

  {
    id: 3, // asegurate de actualizar el id según tu lista
    name: "Markdown Note Manager",
    description:
      "A full-stack markdown note platform with authentication, live preview, and PDF/HTML export, designed for developers and students to organize and export notes efficiently.",
    details: [
      "Full-stack web app for creating, organizing, and exporting markdown notes",
      "User authentication and email verification using JWT + NodeMailer",
      "Markdown editor with real-time preview and syntax highlighting",
      "Export notes to PDF, HTML, or raw markdown; PDF rendered via Puppeteer",
      "Secure backend with Bcrypt hashing, rate limiting, and HTTP-only cookies",
      "Responsive UI built with Tailwind and Lucide icons",
      "Puppeteer service for server-side PDF generation",
    ],
    repo: "https://github.com/FdezCarlomagno/Markdown-Note-Manager",
    live: false, // si lo subís después cambiás esto
    technologies:
      "React.js, Vite, Tailwind CSS, Node.js, Express.js, MySQL, JWT, Puppeteer, Axios",
  },
  {
    id: 4,
    name: "Yendo! Travel agency",
    description:
      "Yendo! is a travel agency landing page that provides users with an immersive and visually appealing experience",
    details: [
      "Developed with React.js and styled with Tailwind CSS, the page is designed to highlight the beauty of the destinations offered by the agency while facilitating smooth and easy navigation for users.",
      "The page is optimized to be fully responsive, perfectly adapting to any device, whether mobile, tablet, or desktop.",
      "The interface uses soft animation effects that enhance the experience without visually overwhelming the user, making the exploration of destinations dynamic and enjoyable.",
      "Additionally, the page includes informative sections about tourist destinations, agency services, and core values, providing customers with all the information they need in a clear and direct manner.",
      "With Yendo!, users can start their adventure with a simple visit to the page, enjoying an attractive and functional design that connects them with their next destination.",
    ],
    repo: "https://github.com/FdezCarlomagno/YendoTandil",
    live: "https://yendotandil.vercel.app",
    technologies: "React.js, Javascript, Tailwind CSS",
  },
  {
    id: 6,
    name: "VideoGamesApp",
    description:
      "This Android application was developed as part of a mobile development seminar. It showcases a catalog of video games fetched from the RAWG API, allowing users to search, filter by platform and genre, and sort results.",
    details: [
      "Objective: Apply mobile development concepts using Kotlin and Jetpack Compose while implementing MVVM and Repository Pattern.",
      "The app uses the RAWG API to fetch videogame data, displays a list of games with cover images, and provides infinite scroll / pagination.",
      "Filters: platform and genre filters with configurable sorting (alphabetical, release date).",
      'Search: full-text search by title with "no results" handling.',
      "Persistence: filters are persisted using SharedPreferences to keep user preferences between sessions.",
      "Details screen: shows synopsis, genres, release date, platforms and available stores for a selected game.",
      "Adaptive UI: supports landscape layout, adaptive grids, and dark mode using MaterialTheme.",
      "Network resilience: loading indicators, error messages and retry actions are implemented.",
      "Completed: listing, filters, search, details, persistence of filters, adaptive UI and basic pagination.",
      "Pending / optional: wishlist implementation, integration with Paging 3 for automatic pagination, and share/open external app interactions.",
    ],
    repo: "https://github.com/FdezCarlomagno/VideoGamesApp",
    live: false,
    technologies: "Kotlin, Jetpack Compose, MVVM, Repository Pattern, Hilt, SharedPreferences, RAWG API",
  },
]

const backendProjects = [
  {
    id: 9,
    name: "Monopatín Platform - Microservices System",
    description:
      "A comprehensive microservices-based scooter rental platform with API Gateway, circuit breaker patterns, and distributed architecture. Manages users, accounts, scooters, stations, trips, and administrative operations with high resilience and scalability.",
    repo: "https://github.com/FdezCarlomagno/api-gateway-monopatines",
    live: false,
    technologies: "Java 17, Spring Boot 3.2, Spring Cloud Gateway, Resilience4j, Maven",
    apiDetails: [
      { route: "/api/users/**", method: "ALL", description: "User management service - registration, authentication, and profile operations (port 8081)" },
      { route: "/api/accounts/**", method: "ALL", description: "Account management service - balance, transactions, and payment handling (port 8082)" },
      { route: "/api/monopatines/**", method: "ALL", description: "Scooter fleet management - status tracking, location updates, and maintenance (port 8083)" },
      { route: "/api/paradas/**", method: "ALL", description: "Station management - locations, availability, and capacity monitoring (port 8084)" },
      { route: "/api/admin/**", method: "ALL", description: "Administrative operations - system configuration, analytics, and monitoring (port 8085)" },
      { route: "/api/reportes/**", method: "ALL", description: "Reporting service - usage statistics, revenue reports, and business intelligence (port 8086)" },
      { route: "/api/viajes/**", method: "GET", description: "Retrieve trip information and history" },
      { route: "/api/viajes", method: "POST", description: "Create a new trip with scooter, account, and starting station" },
      { route: "/api/viajes/:id/pausar", method: "PUT", description: "Pause an active trip temporarily" },
      { route: "/api/viajes/:id/reanudar", method: "PUT", description: "Resume a paused trip" },
      { route: "/api/viajes/:id/finalizar", method: "PUT", description: "End a trip at destination station with billing calculation" },
      { route: "/api/viajes/:id", method: "DELETE", description: "Delete trip record (administrative function)" },
    ],
  },
  {
    id: 7,
    name: "Guitars API",
    description: `This project provides a RESTful API to manage guitars and categories in a database. The API allows CRUD operations on guitar and category resources, as well as obtaining a user token.`,
    repo: "https://github.com/FdezCarlomagno/tp_web2_apiRest.git",
    live: false,
    technologies: "PHP, MySQL, Thunderclient",
    apiDetails: [
      { route: "/guitarras", method: "GET", description: "Retrieves the list of all guitars" },
      { route: "/guitarras/:categoria", method: "GET", description: "Retrieves all guitars of a specific category" },
      { route: "/guitarras/guitarra/:id", method: "GET", description: "Retrieves a specific guitar by its id" },
      { route: "/guitarras", method: "POST", description: "Adds a new guitar to the collection" },
      { route: "/guitarras/guitarra/:id", method: "PUT", description: "Updates a specific guitar" },
      { route: "/guitarras/guitarra/:id", method: "DELETE", description: "Deletes a specific guitar" },
      { route: "/categorias", method: "GET", description: "Retrieves the list of all guitar categories" },
      {
        route: "/user/token",
        method: "GET",
        description: "Generates and returns an authentication token for the user",
      },
    ],
  },
  {
    id: 8,
    name: "Production Optimization System",
    description:
      "Solves an optimization problem where machines produce parts per cycle, only one works at a time, aiming to minimize activations to reach the exact target. Implements Backtracking (optimal but expensive) and Greedy (faster but not always optimal).",
    repo: "https://github.com/FdezCarlomagno/TPE_Programacion3",
    live: false,
    technologies: "Java",
    apiDetails: [],
  },

]

const allProjects = [...frontendProjects, ...backendProjects]

type Project = (typeof allProjects)[0]

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"])

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  return (
    <section id="portfolio" ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <motion.div style={{ y }} className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Proyectos Destacados
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Una colección de proyectos frontend, backend y mobile que demuestran experiencia en desarrollo full-stack
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    {"apiDetails" in project && project.apiDetails && project.apiDetails.length > 0 ? (
                      <Code2 className="w-6 h-6" />
                    ) : project.technologies.includes("Kotlin") ? (
                      <Smartphone className="w-6 h-6" />
                    ) : (
                      <Code2 className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-accent/20 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.live && (
                      <a
                        href={project.live as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-muted hover:bg-accent/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-card-foreground mb-3 text-balance">{project.name}</h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-grow">
                  {project.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground/70 mb-2">Technologies:</p>
                  <p className="text-xs text-accent font-medium">{project.technologies}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto bg-transparent"
                  onClick={() => openProjectDetails(project)}
                >
                  Ver Detalles
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-3xl max-h-[80vh] overflow-y-auto overscroll-contain"
          // evita que el evento de scroll burbujee al body en navegadores que no respeten overscroll
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()} >
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-balance">{selectedProject.name}</DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">Technologies</h4>
                  <p className="text-sm text-accent">{selectedProject.technologies}</p>
                </div>

                {"details" in selectedProject && selectedProject.details && (
                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-foreground">Project Details</h4>
                    <ul className="space-y-2">
                      {selectedProject.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {"apiDetails" in selectedProject &&
                  selectedProject.apiDetails &&
                  selectedProject.apiDetails.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-foreground">API Endpoints</h4>
                      <div className="space-y-3">
                        {selectedProject.apiDetails.map((endpoint, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-muted/50 border border-border">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-xs font-mono px-2 py-1 rounded ${endpoint.method === "GET"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : endpoint.method === "POST"
                                    ? "bg-green-500/20 text-green-400"
                                    : endpoint.method === "PUT"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400"
                                  }`}
                              >
                                {endpoint.method}
                              </span>
                              <code className="text-xs text-foreground font-mono">{endpoint.route}</code>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{endpoint.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button asChild variant="default" className="flex-1">
                    <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Ver Repositorio
                    </a>
                  </Button>
                  {selectedProject.live && (
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <a href={selectedProject.live as string} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
