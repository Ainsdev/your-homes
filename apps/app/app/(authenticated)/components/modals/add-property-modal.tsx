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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select"
import { toast } from "@repo/design-system/hooks/use-toast"
import { ScrollArea } from "@repo/design-system/components/ui/scroll-area"
import { addProperty } from "@/app/actions/properties/queries"
import { Card } from "@repo/design-system/components/ui/card"
import { Separator } from "@repo/design-system/components/ui/separator"



interface AddPropertyModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddPropertyModal({ open, onOpenChange }: AddPropertyModalProps) {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget);

        const data = {
            address: formData.get('address') as string,
            city: formData.get('city') as string,
            state: formData.get('state') as string || null,
            zipCode: formData.get('zipCode') as string || null,
            country: 'Chile',
            propertyType: formData.get('propertyType') as string || 'house',
            status: formData.get('status') as string || 'Available',
            listingPrice: formData.get('listingPrice') ? parseFloat(formData.get('listingPrice') as string) : null,
            bedrooms: formData.get('bedrooms') ? parseInt(formData.get('bedrooms') as string) : null,
            bathrooms: formData.get('bathrooms') ? parseFloat(formData.get('bathrooms') as string) : null,
            squareFeet: formData.get('squareFeet') ? parseFloat(formData.get('squareFeet') as string) : null,
            lotSize: formData.get('lotSize') ? parseFloat(formData.get('lotSize') as string) : null,
            yearBuilt: formData.get('yearBuilt') ? parseInt(formData.get('yearBuilt') as string) : null,
            description: formData.get('description') as string || null,
            features: formData.get('features') as string || null,
        };

        try {
            const result = await addProperty(data);

            if (result.success) {
                toast({
                    title: "¡Éxito!",
                    description: "La propiedad ha sido agregada correctamente",
                });
                onOpenChange(false);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Error al agregar la propiedad",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle className="text-xl">Agregar Nueva Propiedad</DrawerTitle>
                        <DrawerDescription>Complete los detalles básicos de la propiedad</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100vh-10rem)]">
                        <ScrollArea className="flex-1 px-4">
                            <div className="space-y-6 pb-6">
                                <Card className="p-4 space-y-4">
                                    <h3 className="font-semibold">Información Básica</h3>
                                    <Separator />
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="address">Dirección*</Label>
                                            <Input id="address" name="address" placeholder="Av. Principal 123" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="city">Ciudad*</Label>
                                                <Input id="city" name="city" placeholder="Santiago" required />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="state">Región</Label>
                                                <Input id="state" name="state" placeholder="Metropolitana" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 space-y-4">
                                    <h3 className="font-semibold">Detalles de la Propiedad</h3>
                                    <Separator />
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="propertyType">Tipo*</Label>
                                                <Select name="propertyType" defaultValue="house" required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="house">Casa</SelectItem>
                                                        <SelectItem value="apartment">Departamento</SelectItem>
                                                        <SelectItem value="commercial">Comercial</SelectItem>
                                                        <SelectItem value="land">Terreno</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="status">Estado*</Label>
                                                <Select name="status" defaultValue="Available" required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Available">Disponible</SelectItem>
                                                        <SelectItem value="Under Contract">En Contrato</SelectItem>
                                                        <SelectItem value="Sold">Vendida</SelectItem>
                                                        <SelectItem value="Off Market">Fuera de Mercado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="listingPrice">Precio (CLP)*</Label>
                                            <Input
                                                id="listingPrice"
                                                name="listingPrice"
                                                type="number"
                                                placeholder="150000000"
                                                required
                                            />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 space-y-4">
                                    <h3 className="font-semibold">Características</h3>
                                    <Separator />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="bedrooms">Dormitorios</Label>
                                            <Input id="bedrooms" name="bedrooms" type="number" placeholder="3" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="bathrooms">Baños</Label>
                                            <Input id="bathrooms" name="bathrooms" type="number" step="0.5" placeholder="2" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="squareFeet">M² Construidos</Label>
                                            <Input id="squareFeet" name="squareFeet" type="number" placeholder="120" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="lotSize">M² Terreno</Label>
                                            <Input id="lotSize" name="lotSize" type="number" placeholder="200" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 space-y-4">
                                    <h3 className="font-semibold">Descripción</h3>
                                    <Separator />
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="description">Descripción General</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                placeholder="Describa la propiedad..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="features">Características Destacadas</Label>
                                            <Textarea
                                                id="features"
                                                name="features"
                                                placeholder="Ej: Piscina, Jardín, Estacionamiento..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </ScrollArea>
                        <DrawerFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Agregando..." : "Agregar Propiedad"}
                            </Button>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

