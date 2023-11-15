"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const DocumentsPage = () => {

    const { user } = useUser()
    const create = useMutation(api.documents.create);
    const router = useRouter();

    const onCreate = () => {
        const promise = create({ title: "Sin título" })
            .then((documentId) => router.push(`/documents/${documentId}`))

        toast.promise(promise, {
            loading: "Creando una nota nueva...",
            success: "Nota creada! 😊",
            error: "Ha ocurrido algún problema al crear la nota 😱"
        })
    }

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
            <Button onClick={onCreate}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Crea una nota
            </Button>
        </div>
    )
}

export default DocumentsPage