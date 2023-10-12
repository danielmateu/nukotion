"use client"
import Image from "next/image"

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-x-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                    <Image
                        src="/documents.png"
                        fill
                        className="object-contain"
                        alt="Hero"
                    />

                </div>
            </div>
        </div>
    )
}
