"use client"

import { useRef, useEffect, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  colorPhase: number
}

type Props = {
  isActive?: boolean
}

export default function InteractiveCanvasBackground({ isActive = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)
  const listenersAttachedRef = useRef(false)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()

    setDimensions({ width: window.innerWidth, height: window.innerHeight })

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
      checkMobile()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const cleanupAnimation = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    const removeWindowListeners = (handleMouseMove: (e: MouseEvent) => void, handleMouseDown: () => void, handleMouseUp: () => void, handleMouseLeave: () => void) => {
      if (listenersAttachedRef.current) {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('mouseleave', handleMouseLeave)
        listenersAttachedRef.current = false
      }
    }

    if (!isActive) {
      cleanupAnimation()
      return () => {
        cleanupAnimation()
      }
    }

    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.round(dimensions.width * dpr)
    canvas.height = Math.round(dimensions.height * dpr)
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const particles: Particle[] = []
    const gridSize = isMobile ? 30 : 25
    const cols = Math.ceil(dimensions.width / gridSize)
    const rows = Math.ceil(dimensions.height / gridSize)
    const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0))

    let mouseX = dimensions.width / 2
    let mouseY = dimensions.height / 2
    let isMouseDown = false

    // Paleta original (colores más saturados)
    const colors = [
      { r: 99, g: 102, b: 241 },   // Indigo
      { r: 236, g: 72, b: 153 },   // Pink
      { r: 245, g: 158, b: 11 },   // Orange
      { r: 16, g: 185, b: 129 },   // Green
      { r: 139, g: 92, b: 246 },   // Purple
      { r: 59, g: 130, b: 246 },   // Blue
    ]

    const paintGrid = (x: number, y: number) => {
      const gridX = Math.floor(x / gridSize)
      const gridY = Math.floor(y / gridSize)
      if (gridY >= 0 && gridY < rows && gridX >= 0 && gridX < cols) {
        grid[gridY][gridX] = (grid[gridY][gridX] + 1) % (colors.length + 1)
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (Math.random() > 0.6) {
              const ny = gridY + dy
              const nx = gridX + dx
              if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
                grid[ny][nx] = (grid[ny][nx] + 1) % (colors.length + 1)
              }
            }
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      paintGrid(mouseX, mouseY)

      if (isMouseDown || Math.random() > 0.8) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 20,
            y: mouseY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            life: 0,
            maxLife: Math.random() * 60 + 40,
            colorPhase: Math.floor(Math.random() * colors.length)
          })
        }
      }
    }

    const handleMouseDown = () => { isMouseDown = true }
    const handleMouseUp = () => { isMouseDown = false }
    const handleMouseLeave = () => { isMouseDown = false }

    if (!isMobile && !listenersAttachedRef.current) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('mouseleave', handleMouseLeave)
      listenersAttachedRef.current = true
    }

    if (isMobile) {
      intervalRef.current = window.setInterval(() => {
        const randomX = Math.random() * dimensions.width
        const randomY = Math.random() * dimensions.height
        paintGrid(randomX, randomY)
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: randomX + (Math.random() - 0.5) * 40,
            y: randomY + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0,
            maxLife: Math.random() * 30 + 20,
            colorPhase: Math.floor(Math.random() * colors.length)
          })
        }
      }, 800)
    }

    const animate = () => {
      // fondo sutil pero permite que los colores resalten
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const phase = grid[y][x]
          if (phase > 0) {
            const color = colors[phase - 1]
            const time = Date.now() * 0.001
            const pulse = Math.sin(time + x * 0.5 + y * 0.5) * 0.5 + 0.5
            // alfas más altos para que se note el color
            const alpha = isMobile ? 0.35 + pulse * 0.18 : 0.45 + pulse * 0.25

            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
            ctx.fillRect(x * gridSize, y * gridSize, gridSize - 1, gridSize - 1)

            const glow = ctx.createRadialGradient(
              x * gridSize + gridSize / 2,
              y * gridSize + gridSize / 2,
              0,
              x * gridSize + gridSize / 2,
              y * gridSize + gridSize / 2,
              gridSize * 1.6
            )
            // glow más marcado
            glow.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.min(alpha * 0.6, 0.8)})`)
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
            ctx.fillStyle = glow
            ctx.fillRect(x * gridSize - gridSize, y * gridSize - gridSize, gridSize * 3, gridSize * 3)
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        const progress = p.life / p.maxLife
        const color = colors[p.colorPhase]
        // partículas más visibles
        const alpha = (1 - progress) * 0.75
        const size = (1 - progress) * 12 + 4

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life >= p.maxLife) particles.splice(i, 1)
      }

      if (!isMobile) {
        const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 90)
        mouseGlow.addColorStop(0, 'rgba(0, 0, 0, 0.06)')
        mouseGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = mouseGlow
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 90, 0, Math.PI * 2)
        ctx.fill()
      }

      if (Math.random() > 0.98) {
        const ry = Math.floor(Math.random() * rows)
        const rx = Math.floor(Math.random() * cols)
        if (grid[ry] && grid[ry][rx] > 0) grid[ry][rx] = 0
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cleanupAnimation()
      removeWindowListeners(handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave)
    }
  }, [dimensions, isMobile, isActive])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 w-full h-full bg-transparent"
      style={{ pointerEvents: 'none' }}
    />
  )
}
