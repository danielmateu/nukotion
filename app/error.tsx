"use client"

import { Button } from "@/components/ui/button"
import { error, errordark } from "@/public"
import Image from "next/image"
import Link from "next/link"


const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src={error} width={300} height={300} alt="Ha ocurrido un error" className="dark:hidden" />
            <Image src={errordark} width={300} height={300} alt="Ha ocurrido un error" className="hidden dark:block" />

            <h2 className="text-xl font-medium">Algo ha salido mal</h2>

            <Button asChild>
                <Link href="/documents">
                    Volver
                </Link>
            </Button>
        </div>
    )
}

export default Error
