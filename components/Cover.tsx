"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"
import { ImageIcon, X } from "lucide-react"
import { useCoverImage } from "@/hooks/useCoverImage"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

interface CoverProps {
    url?: string
    preview?: string
}

export const Cover = ({
    url, preview
}: CoverProps) => {

    const coverImage = useCoverImage()
    const removeCoverImage = useMutation(api.documents.removeCoverImage)
    const params = useParams()

    const onRemove = async () => {
        removeCoverImage({
            id: params.documentId as Id<"documents">

        })
    }

    return (
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="Imagen de portada"
                    className="object-cover"
                />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={coverImage.onOpen}
                        className="text-muted-foreground text-xs hover:text-slate-600 transition"
                        size='sm'
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Cambiar portada
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-xs hover:text-rose-500 transition"
                        size='sm'
                    >
                        <X className="h-4 w-4 mr-2" />
                        Eliminar
                    </Button>
                </div>
            )}

        </div>
    )
}
