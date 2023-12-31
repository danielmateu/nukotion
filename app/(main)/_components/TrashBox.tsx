"use client"

import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Search, SearchIcon, Trash, Undo } from 'lucide-react';
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"
import { Spinner } from "@/components/Spinner"
import { Input } from "@/components/ui/input"
import { title } from "process"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { getSidebar } from '../../../convex/documents';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export const TrashBox = () => {

    const router = useRouter()
    const params = useParams()
    const documents = useQuery(api.documents.getTrash)
    const restore = useMutation(api.documents.restore)
    const remove = useMutation(api.documents.remove)

    const [search, setSearch] = useState("")

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase())
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">) => {
        event.stopPropagation()
        const promise = restore({ id: documentId })

        toast.promise(promise, {
            loading: 'Restaurando...',
            success: 'Documento restaurado',
            error: 'Error al restaurar el documento'
        })
    }

    const onRemove = (documentId: Id<"documents">) => {

        const promise = remove({ id: documentId })

        toast.promise(promise, {
            loading: 'Eliminando...',
            success: 'Documento eliminado',
            error: 'Error al eliminar el documento'
        })

        if (params.documentId === documentId) {
            router.push(`/documents`)
        }

        if (documents === undefined) {
            return (
                <div className="h-full flex items-center justify-center p-4">
                    <Spinner size={'lg'} />
                </div>
            )
        }
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-3">
                <SearchIcon />
                <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filtrar por título de la página..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No se han encontrado documentos en la papelera
                </p>
                {filteredDocuments?.map((document) => (
                    <div
                        key={document._id}
                        role="button"
                        onClick={() => onClick(document._id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2 ">{document.title}</span>
                        <div className="flex items-center gap-1 mb-1">
                            <div
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200 dark:bg-neutral-600 dark:hover:bg-neutral-700"
                                onClick={(event) => onRestore(event, document._id)}
                            >
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Undo className="w-4 h-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="bottom"
                                        align="start"
                                    >
                                        <p>Restaurar documento</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id)}>
                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:bg-neutral-600 dark:hover:bg-neutral-700"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Trash className="h-4 w-4 text-muted-foreground " />
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="right"
                                                align="center"
                                            >
                                                <p>Eliminar definitivamente</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
