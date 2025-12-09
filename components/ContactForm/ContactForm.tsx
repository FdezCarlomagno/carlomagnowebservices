"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast, { Toaster } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "../ui/button"
import Footer from "../footer"
import emailjs from 'emailjs-com'

import Step1Personal from "./Step1Personal"
import Step2Project from "./Step2Project"
import Step3Services from "./Step3Services"
import FormNavigation from "./FormNavigation"

// Schema Zod
const schema = z.object({
    name: z.string().min(2, "Nombre obligatorio"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    projectTitle: z.string().min(2, "Título obligatorio"),
    projectDescription: z.string().min(5, "Descripción obligatoria"),
    priority: z.string().optional(),
    services: z.array(z.string()).min(1, "Debes seleccionar al menos un servicio"),
    servicesMail: z.string().optional()
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showServiceError, setShowServiceError] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const totalSteps = 3

    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            services: [],
            priority: ""
        },
        mode: "onTouched"
    })

    const nextStep = async () => {
        let isValid = false

        // Validar según el paso actual
        if (step === 1) {
            isValid = await methods.trigger(["name", "email"])
        } else if (step === 2) {
            isValid = await methods.trigger(["projectTitle", "projectDescription"])
        } else if (step === 3) {
            // Para el paso 3, usar la validación de Zod directamente
            isValid = await methods.trigger(["services"])
            
            // Mostrar error solo una vez si no es válido
            if (!isValid && !showServiceError) {
                setShowServiceError(true)
            }
        }

        if (!isValid) return

        // Resetear el estado de error de servicios cuando se avanza correctamente
        if (step === 3 && isValid) {
            setShowServiceError(false)
        }

        if (step < totalSteps) {
            setStep((prev) => prev + 1)
        } else {
            handleSubmit()
        }
    }

    const prevStep = () => {
        if (step > 1) {
            setStep((prev) => prev - 1)
        }
    }

    const goToStep = async (targetStep: number) => {
        if (targetStep >= 1 && targetStep <= totalSteps) {
            // Si vamos a un paso anterior, permitir siempre
            if (targetStep < step) {
                setStep(targetStep)
                return
            }

            // Si vamos a un paso futuro, validar el paso actual primero
            let currentStepValid = true
            
            if (step === 1) {
                currentStepValid = await methods.trigger(["name", "email"])
            } else if (step === 2) {
                currentStepValid = await methods.trigger(["projectTitle", "projectDescription"])
            } else if (step === 3) {
                currentStepValid = await methods.trigger(["services"])
            }

            if (currentStepValid) {
                setStep(targetStep)
            }
        }
    }

    const handleSubmit = async () => {
        if (isSubmitting) return
        
        // Validar todo el formulario antes de enviar
        const isValid = await methods.trigger()
        if (!isValid) {
            toast.error("Por favor completa todos los campos obligatorios")
            return
        }
        
        setIsSubmitting(true)
        const services = methods.getValues().services.join(", ")
        const data = methods.getValues()
        data.servicesMail = services
        
        console.log("Datos del formulario:", data)

        try {
            const promise = emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!,
                data,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )


            await toast.promise(
                promise,
                {
                    loading: "Enviando...",
                    success: "¡Mensaje enviado!",
                    error: "Error al enviar. Intenta de nuevo"
                }
            )

            // Marcar como enviado exitosamente
            setIsSubmitted(true)
            methods.reset()
            setShowServiceError(false)
        } catch (error) {
            console.error("Error al enviar:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleNewMessage = () => {
        setIsSubmitted(false)
        setStep(1)
        methods.reset()
    }

    const progressPercent = (step / totalSteps) * 100

    return (
        <>
            <div className="flex flex-col w-full mx-4">
                <section id="contactForm">
                    <nav className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-4 z-50">
                        <div className="max-w-6xl mx-auto flex justify-between items-center">
                            <div className="text-xl font-bold text-foreground">Carlomagno<span className="text-accent">.</span></div>
                            <Link href="/">
                                <Button size="sm">Volver al inicio</Button>
                            </Link>
                        </div>
                    </nav>

                    <Toaster position="top-right" />

                    <div className="max-w-xl mx-auto mt-8">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Barra de progreso con navegación por clicks */}
                                    <div className="mb-8">
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                                            <motion.div
                                                className="h-2 bg-accent"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercent}%` }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            {[1, 2, 3].map((stepNumber) => (
                                                <button
                                                    key={stepNumber}
                                                    type="button"
                                                    onClick={() => goToStep(stepNumber)}
                                                    className={`flex flex-col items-center cursor-pointer ${
                                                        stepNumber <= step ? 'text-accent font-medium' : ''
                                                    }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                                                        stepNumber <= step 
                                                            ? 'bg-accent text-white' 
                                                            : 'bg-gray-200 text-gray-500'
                                                    }`}>
                                                        {stepNumber}
                                                    </div>
                                                    <span>Paso {stepNumber}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <FormProvider {...methods}>
                                        <motion.form
                                            key={step}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6 bg-card border border-border rounded-2xl p-8"
                                            onSubmit={(e) => { 
                                                e.preventDefault(); 
                                                nextStep(); 
                                            }}
                                        >
                                            {step === 1 && <Step1Personal />}
                                            {step === 2 && <Step2Project />}
                                            {step === 3 && <Step3Services />}

                                            <FormNavigation
                                                step={step}
                                                totalSteps={totalSteps}
                                                onNext={nextStep}
                                                onPrev={prevStep}
                                                isSubmitting={isSubmitting}
                                            />
                                        </motion.form>
                                    </FormProvider>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-center"
                                >
                                    {/* Mensaje de éxito */}
                                    <div className="bg-card border border-border rounded-2xl p-12 space-y-6">
                                        {/* Icono de éxito */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ 
                                                delay: 0.2,
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                                        >
                                            <svg 
                                                className="w-10 h-10 text-green-600" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M5 13l4 4L19 7" 
                                                />
                                            </svg>
                                        </motion.div>

                                        {/* Contenido del mensaje */}
                                        <div className="space-y-4">
                                            <motion.h2
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-2xl font-bold text-foreground"
                                            >
                                                ¡Mensaje Enviado!
                                            </motion.h2>
                                            
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-muted-foreground text-lg leading-relaxed"
                                            >
                                                Gracias por contactarme. Me pondré en contacto con vos en 
                                                <strong className="text-foreground"> menos de 24 horas </strong> 
                                                para conversar sobre tu proyecto.
                                            </motion.p>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="pt-4 space-y-3"
                                            >
                                                <p className="text-sm text-muted-foreground">
                                                    Mientras tanto, podés explorar más de mi trabajo
                                                </p>
                                                
                                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                                    <Link href="/">
                                                        <Button variant="outline" className="w-full sm:w-auto">
                                                            Volver al inicio
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        onClick={handleNewMessage}
                                                        className="w-full sm:w-auto"
                                                    >
                                                        Enviar otro mensaje
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Información adicional */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            className="pt-6 border-t border-border mt-6"
                                        >
                                            <p className="text-xs text-muted-foreground">
                                                ¿Necesitás una respuesta inmediata?{" "}
                                                <a 
                                                    href="mailto:carlomagnowebservices@gmail.com" 
                                                    className="text-accent hover:underline font-medium"
                                                >
                                                    carlomagnowebservices@gmail.com
                                                </a>
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}