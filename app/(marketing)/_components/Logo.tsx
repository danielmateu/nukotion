import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Image from "next/image"

const font = Poppins({
    subsets: ["latin-ext"],
    weight: ["400", "600"],
})

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="logo"
                className="rounded-full"
            />
            <p className={cn("font-semibold",
                font.className)}>
                Nukotion
            </p>
        </div>
    )
}
