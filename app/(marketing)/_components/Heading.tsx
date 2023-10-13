"use client"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/clerk-react"
import { useConvexAuth } from "convex/react"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export const Heading = () => {

    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold">Tus ideas, documentos y planes unificados. Bienvenid@ a <span className="underline">Nukotion</span></h1>

            <h3 className='text-base sm:text-xl md:text-2xl font-medium'>Nukotion es el espacio de trabajo donde las cosas pasan 🐶</h3>

            {
                isLoading && (
                    <div className="w-full flex items-center justify-center">
                        <Spinner
                            size={'lg'}
                        />
                    </div>
                )
            }

            {
                isAuthenticated && !isLoading && (
                    <Button className='group' asChild>
                        <Link href={'/documents'}>
                            Entra a Nukotion
                            <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition" />
                        </Link>
                    </Button>
                )
            }

            {
                !isAuthenticated && !isLoading && (
                    <SignInButton mode="modal">
                        <Button className="group">
                            Registrate gratis
                            <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition" />
                        </Button>

                    </SignInButton>
                )
            }


        </div>
    )
}
