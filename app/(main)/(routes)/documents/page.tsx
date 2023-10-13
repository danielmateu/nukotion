"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { PlusCircle } from "lucide-react"
import Image from "next/image"


const DocumentsPage = () => {

    const { user } = useUser()
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src={'/empty.png'}
                height={300}
                width={300}
                alt="Imagen para cuando no hay documentos"
                className="block dark:hidden"
            />
            <Image
                src={'/empty-dark.png'}
                height={300}
                width={300}
                alt="Imagen para cuando no hay documentos"
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium"
            >Bienvenid@ al Nukotion de {user?.firstName}</h2>
            <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Crea una nota
            </Button>
        </div>
    )
}

export default DocumentsPage