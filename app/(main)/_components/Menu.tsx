"use client"

import { useRouter } from "next/navigation";

import { Id } from "@/convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

interface MenuProps {
    documentId: Id<"documents">;
}

export const Menu = ({
    documentId
}: MenuProps) => {

    const router = useRouter()
    const { user } = useUser()

    const archive = useMutation(api.documents.archive)

    const onArchive = () => {
        const promise = archive({ id: documentId })

        toast.promise(promise, {
            loading: 'Archivando...',
            success: 'Documento archivado',
            error: 'Error al archivar el documento'
        })

        router.push('/documents')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='sm' variant={'ghost'} >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs">
                    Editado por: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="w-8 h-8" />
    )
}