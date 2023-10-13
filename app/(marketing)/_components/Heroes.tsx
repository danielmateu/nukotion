"use client"
import Image from "next/image"

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-x-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:h-[350px] md:h-[400px] md:w-[400px] ml-0 md:ml-10">
                    <Image
                        src="/documents.png"
                        fill
                        priority
                        sizes="(max-width: 300px) 50vw, 300px"
                        className="object-contain"
                        alt="documents image"
                    />
                </div>
                <div className="relative h-[400px] w-[400px] hidden md:block">
                    <Image
                        src="/reading.png"
                        fill
                        priority
                        sizes="(max-width: 300px) 50vw, 300px"
                        className="object-contain"
                        alt="reading image"
                    />
                </div>
            </div>
        </div>
    )
}
