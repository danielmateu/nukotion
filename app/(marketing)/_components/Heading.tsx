"use client"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold">Tus ideas, documentos y planes unificados. Bienvenid@ a <span className="underline">Nukotion</span></h1>

            <h3 className='text-base sm:text-xl md:text-2xl font-medium'>Nukotion es el espacio de trabajo donde las cosas pasan 🐶</h3>

            <Button className='group'>
                Entra a Nukotion
                <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition" />
            </Button>

        </div>
    )
}
