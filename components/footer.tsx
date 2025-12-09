import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 pt-8 pb-6 border-t border-border text-center text-muted-foreground space-y-4"
      >
        <div className="flex items-center justify-center gap-6">
          <Link
            href="https://github.com/FdezCarlomagno"
            target="_blank"
            className="hover:text-accent transition"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/valentin-f-carlomagno-10683b338/"
            target="_blank"
            className="hover:text-accent transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
        </div>

        <p className="text-sm">
          © 2025 Valentín F. Carlomagno. Todos los derechos reservados.
        </p>
      </motion.footer>
    </>
  )
}
