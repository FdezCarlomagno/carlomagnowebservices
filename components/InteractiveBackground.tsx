"use client"

import { useEffect, useRef } from 'react'

interface FloatingLinesProps {
  enabledWaves?: Array<'top' | 'middle' | 'bottom'>
  lineCount?: number | number[]
  lineDistance?: number | number[]
  bendRadius?: number
  bendStrength?: number
  interactive?: boolean
  parallax?: boolean
}

export default function FloatingLines({
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [10, 15, 20],
  lineDistance = [8, 6, 4],
  bendRadius = 5.0,
  bendStrength = -0.5,
  interactive = true,
  parallax = true,
}: FloatingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollYRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (interactive) {
        mouseRef.current = { x: e.clientX, y: e.clientY }
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Scroll tracking
    const handleScroll = () => {
      if (parallax) {
        scrollYRef.current = window.scrollY
      }
    }
    window.addEventListener('scroll', handleScroll)

    // Wave configuration
    const waves = enabledWaves.map((wave, index) => {
      const count = Array.isArray(lineCount) ? lineCount[index] : lineCount
      const distance = Array.isArray(lineDistance) ? lineDistance[index] : lineDistance
      
      let yPosition = 0
      if (wave === 'top') yPosition = canvas.height * 0.2
      if (wave === 'middle') yPosition = canvas.height * 0.5
      if (wave === 'bottom') yPosition = canvas.height * 0.8

      return {
        name: wave,
        yPosition,
        lineCount: count,
        lineDistance: distance,
        speed: 0.5 + index * 0.3,
        opacity: 0.20 - index * 0.03,
      }
    })

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      waves.forEach((wave) => {
        const parallaxOffset = parallax ? scrollYRef.current * wave.speed * 0.1 : 0

        for (let i = 0; i < wave.lineCount; i++) {
          const yOffset = i * wave.lineDistance
          const baseY = wave.yPosition + yOffset - parallaxOffset

          // Skip if out of view
          if (baseY < -50 || baseY > canvas.height + 50) continue

          ctx.beginPath()
          ctx.strokeStyle = `rgba(100, 150, 200, ${wave.opacity})`
          ctx.lineWidth = 2

          for (let x = 0; x <= canvas.width; x += 5) {
            // Wave motion
            const waveY = Math.sin((x + time * 100 + i * 50) * 0.01) * 10

            // Interactive bend
            let bendY = 0
            if (interactive) {
              const dx = x - mouseRef.current.x
              const dy = baseY + waveY - mouseRef.current.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const maxDistance = bendRadius * 100

              if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * bendStrength * 50
                bendY = force
              }
            }

            const y = baseY + waveY + bendY

            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }

          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [enabledWaves, lineCount, lineDistance, bendRadius, bendStrength, interactive, parallax])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}