"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@repo/design-system/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@repo/design-system/components/ui/drawer"
import { Input } from "@repo/design-system/components/ui/input"
import { Label } from "@repo/design-system/components/ui/label"
import { Textarea } from "@repo/design-system/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@repo/design-system/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select"
import { toast } from "@repo/design-system/hooks/use-toast"
import { Calendar } from "@repo/design-system/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/design-system/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@repo/design-system/lib/utils"
import { ScrollArea } from "@repo/design-system/components/ui/scroll-area"

interface AddTaskModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
    const [loading, setLoading] = useState(false)
    const [dueDate, setDueDate] = useState<Date>()
    const [reminderDate, setReminderDate] = useState<Date>()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            onOpenChange(false)
            toast({
                title: "Tarea agregada exitosamente",
                description: "La nueva tarea ha sido agregada a tu lista.",
            })
        }, 1000)
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle className="text-xl">Agregar Nueva Tarea</DrawerTitle>
                        <DrawerDescription>Crea una nueva tarea para dar seguimiento a tu trabajo.</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100vh-10rem)]">
                        <ScrollArea className="flex-1 px-4">
                            <div className="grid gap-6 pb-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-sm font-medium">Título de la Tarea</Label>
                                    <Input id="title" placeholder="Visita de propiedad con cliente" required className="h-10" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description" className="text-sm font-medium">Descripción</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Detalles de la tarea..."
                                        className="min-h-[100px]"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="text-sm font-medium">Prioridad</Label>
                                    <RadioGroup defaultValue="medium" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="high" id="high" />
                                            <Label htmlFor="high" className="cursor-pointer">Alta</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="medium" id="medium" />
                                            <Label htmlFor="medium" className="cursor-pointer">Media</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="low" id="low" />
                                            <Label htmlFor="low" className="cursor-pointer">Baja</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status" className="text-sm font-medium">Estado</Label>
                                    <Select defaultValue="pending">
                                        <SelectTrigger id="status" className="h-10">
                                            <SelectValue placeholder="Seleccionar estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pendiente</SelectItem>
                                            <SelectItem value="in-progress">En Progreso</SelectItem>
                                            <SelectItem value="completed">Completada</SelectItem>
                                            <SelectItem value="cancelled">Cancelada</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="taskType" className="text-sm font-medium">Tipo de Tarea</Label>
                                    <Select>
                                        <SelectTrigger id="taskType" className="h-10">
                                            <SelectValue placeholder="Seleccionar tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="showing">Visita</SelectItem>
                                            <SelectItem value="follow-up">Seguimiento</SelectItem>
                                            <SelectItem value="paperwork">Documentación</SelectItem>
                                            <SelectItem value="meeting">Reunión</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="client" className="text-sm font-medium">Cliente Asociado</Label>
                                        <Select>
                                            <SelectTrigger id="client" className="h-10">
                                                <SelectValue placeholder="Seleccionar cliente" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="client1">Juan Pérez</SelectItem>
                                                <SelectItem value="client2">María González</SelectItem>
                                                <SelectItem value="client3">Carlos Rodríguez</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="property" className="text-sm font-medium">Propiedad Asociada</Label>
                                        <Select>
                                            <SelectTrigger id="property" className="h-10">
                                                <SelectValue placeholder="Seleccionar propiedad" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="prop1">Av. Principal 123, Santiago</SelectItem>
                                                <SelectItem value="prop2">Calle Los Olivos 456, Las Condes</SelectItem>
                                                <SelectItem value="prop3">Pasaje El Bosque 789, Providencia</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="text-sm font-medium">Fecha de Vencimiento</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal h-10",
                                                        !dueDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {dueDate ? format(dueDate, "PPP") : "Seleccionar fecha"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={dueDate}
                                                    onSelect={setDueDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-sm font-medium">Fecha de Recordatorio</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal h-10",
                                                        !reminderDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {reminderDate ? format(reminderDate, "PPP") : "Seleccionar fecha"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={reminderDate}
                                                    onSelect={setReminderDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                        <DrawerFooter className="pt-2">
                            <div className="flex flex-col gap-3 w-full">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full"
                                >
                                    {loading ? "Agregando..." : "Agregar Tarea"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    className="w-full"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

