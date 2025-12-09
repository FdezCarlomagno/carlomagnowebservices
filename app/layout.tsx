import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Carlomagno Web Services",
  description: "Landing Page oficial del emprendimiento Carlomagno Web Services",
  generator: "Valentin F. Carlomagno",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${_geistMono.variable}`}>
      <body className={`font-sans antialiased overflow-hidden!`} >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
