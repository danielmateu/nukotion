"use client"

import { Toolbar } from "@/components/Toolbar"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

interface DocumentIdProps {
    params: {
        documentId: Id<"documents">
    }
}

const DocumentPage = ({
    params
}: DocumentIdProps) => {

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })

    if (document === undefined) return <p>Cargando...</p>

    if (document === null) return <p>Documento no encontrado</p>

    return (
        <div className="pb-40">
            <div className="h-[35vh]" />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
            </div>
        </div>
    )
}

export default DocumentPage