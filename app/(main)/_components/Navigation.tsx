"use client"

import { ElementRef, useRef, useState, useEffect } from 'react';
import { usePathname } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from 'convex/react';

import { cn } from "@/lib/utils";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { ChevronsLeft, MenuIcon, Plus, PlusCircle, PlusIcon, Search, Settings, Trash } from "lucide-react"
import { toast } from "sonner";

import { DocumentList } from "./DocumentList";
import { Item } from './Item';
import { UserItem } from "./UserItem";
import { TrashBox } from './TrashBox';
import { useSearch } from '@/hooks/useSearch';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const Navigation = () => {

    const pathname = usePathname()
    const isMobile = useMediaQuery('(max-width: 768px)')
    const create = useMutation(api.documents.create);
    const search = useSearch()

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)
    const [isReseting, setIsReseting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)


    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWidth()
        }

    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWidth()
        }
    }, [pathname, isMobile])

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()

        isResizingRef.current = true
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return

        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = newWidth + 'px'
            navbarRef.current.style.setProperty('left', newWidth + 'px')
            navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`)
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsReseting(true)

            sidebarRef.current.style.width = isMobile ? '100%' : '240px'
            navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 240px)')

            navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px')

            setTimeout(() => {
                setIsReseting(false)
            }, 300)
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsReseting(true)

            sidebarRef.current.style.width = '0'
            navbarRef.current.style.setProperty('width', '100%')
            navbarRef.current.style.setProperty('left', '0')

            setTimeout(() => {
                setIsReseting(false)
            }, 300)
        }
    }

    const handleCreate = () => {
        const promise = create({ title: "Sin título" })

        toast.promise(promise, {
            loading: "Creando una página nueva...",
            success: "Página creada! 😊",
            error: "Ha ocurrido algún problema al crear la página 😱"
        })
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isReseting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0",
                )} >
                <div role="button"
                    onClick={collapse}
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft className="w-6 h-6" />
                </div>
                <div>
                    <UserItem />
                    <Item
                        label="Buscar"
                        icon={Search}
                        isSearch
                        onClick={search.onOpen}
                    />
                    <Item
                        label="Opciones"
                        icon={Settings}
                        onClick={() => { }}
                    />
                    <Item onClick={handleCreate} label='Página nueva' icon={PlusCircle} />
                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item
                        label="Añadir página"
                        icon={Plus}
                        onClick={handleCreate}
                    />
                    <Popover>
                        <PopoverTrigger className='w-full mt-4'>
                            {/* <Tooltip>
                                <TooltipTrigger>
                                    <Item
                                        label="Papelera"
                                        icon={Trash}
                                    />
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    align="center"
                                >
                                    <p>¿Que tenemos por aquí?</p>
                                </TooltipContent>
                            </Tooltip> */}

                            <Item
                                label="Papelera"
                                icon={Trash}
                            />

                        </PopoverTrigger>
                        <PopoverContent side={isMobile ? "bottom" : "right"} className='p-0 w-72'>
                            <TrashBox />
                        </PopoverContent>
                    </Popover>

                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
            </aside>
            <div
                ref={navbarRef}
                className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isReseting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full",
                )}
            >

                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed &&
                        <MenuIcon
                            onClick={resetWidth}
                            role="button" className="h-6 w-6 text-muted-foreground" />}
                </nav>

            </div>
        </>
    )
}
