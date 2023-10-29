"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"

import { useSettings } from "@/hooks/useSettings"
import { ModeToggle } from "../ModeToggle"

export const SettingsModal = () => {

    const settings = useSettings()

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">
                        Mis ajustes
                    </h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>
                            Apariencia
                        </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customiza la apariencia de Nukotion en tu dispositivo
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )
}
