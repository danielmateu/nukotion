"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface CoverProps {
    url?: string
    preview?: string
}

export const Cover = ({
    url, preview
}: CoverProps) => {
    return (
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {
                !!url && (
                    <Image
                        src={url}
                        fill
                        alt="Imagen de portada"
                        className="object-cover"
                    />
                )
            }

        </div>
    )
}
