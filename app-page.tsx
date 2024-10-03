'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'

export function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const drawWave = (x: number, y: number, amplitude: number, frequency: number, offset: number) => {
      ctx.beginPath()
      for (let i = 0; i < canvas.width; i++) {
        const angle = (i + offset) * frequency
        const yPos = y + Math.sin(angle) * amplitude
        ctx.lineTo(i, yPos)
      }
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.lineWidth = 1

      const time = Date.now() * 0.001

      for (let i = 0; i < 5; i++) {
        drawWave(0, canvas.height * (i + 1) / 6, 20, 0.02, time + i * 100)
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="z-10">
        <h1 className="text-5xl font-bold mb-12 text-black text-center">Organic Wave</h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/kpis">
            <Button className="w-64 h-16 bg-black hover:bg-gray-800 text-white text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
              Últimos KPIs de la Obra
            </Button>
          </Link>
          <Link href="/images">
            <Button variant="outline" className="w-64 h-16 border-2 border-black text-black hover:bg-black hover:text-white text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
              Imágenes del Progreso
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}