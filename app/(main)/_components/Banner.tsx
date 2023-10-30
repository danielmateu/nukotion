"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { restore } from '../../../convex/documents';
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner = ({
    documentId
}: BannerProps) => {

    const router = useRouter()

    const remove = useMutation(api.documents.remove)
    const restore = useMutation(api.documents.restore)

    const onRemove = () => {
        const promise = remove({ id: documentId })

        toast.promise(promise, {
            loading: 'Eliminando...',
            success: 'Documento eliminado',
            error: 'Error al eliminar el documento'
        })

        router.push('/documents')
    }

    const onRestore = () => {
        const promise = restore({ id: documentId })

        toast.promise(promise, {
            loading: 'Restaurando...',
            success: 'Documento restaurado',
            error: 'Error al restaurar el documento'
        })
    }

    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>Esta página está en la papelera</p>
            <Button
                size={'sm'}
                onClick={onRestore}
                variant={'outline'}
                className="border-white bg-transparent text-white hover:bg-white hover:text-rose-500 transition-colors ease-in-out"
            >
                Restaurar página
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size={'sm'}
                    onClick={onRemove}
                    variant={'outline'}
                    className="border-white bg-transparent text-white hover:bg-white hover:text-rose-500 transition-colors ease-in-out"
                >
                    Eliminar página
                </Button>
            </ConfirmModal>
        </div>
    )
}
