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
        const address = formData.get('address') as string;

        // Validate required fields
        if (!address || address.trim() === "") {
            toast({
                title: "Error",
                description: "La dirección es un campo requerido",
                variant: "destructive",
            });
            setLoading(false);
            return;
        }

        const data = {
            address: address,
            city: formData.get('city') as string,
            state: formData.get('state') as string | null,
            zipCode: formData.get('zipCode') as string | null,
            country: 'Chile',
            propertyType: formData.get('propertyType') as string,
            status: formData.get('status') as string,
            listingPrice: formData.get('listingPrice') ? Number(formData.get('listingPrice')) : null,
            bedrooms: formData.get('bedrooms') ? Number(formData.get('bedrooms')) : null,
            bathrooms: formData.get('bathrooms') ? Number(formData.get('bathrooms')) : null,
            squareFeet: formData.get('squareFeet') ? Number(formData.get('squareFeet')) : null,
            lotSize: formData.get('lotSize') ? Number(formData.get('lotSize')) : null,
            yearBuilt: formData.get('yearBuilt') ? Number(formData.get('yearBuilt')) : null,
            description: formData.get('description') as string | null,
            features: formData.get('features') as string | null,
        };

        try {
            const result = await addProperty(data);
            if (result.success) {
                onOpenChange(false);
                toast({
                    title: "Propiedad agregada exitosamente",
                    description: "La nueva propiedad ha sido agregada al inventario.",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un error al agregar la propiedad",
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
                        <DrawerDescription>Ingrese los detalles de la propiedad para agregarla al inventario.</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100vh-10rem)]">
                        <ScrollArea className="flex-1 px-4">
                            <div className="grid gap-6 pb-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="address" className="text-sm font-medium">Dirección</Label>
                                    <Input id="address" placeholder="Av. Principal 123" required className="h-10" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="city">Ciudad</Label>
                                        <Input id="city" placeholder="Santiago" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="state">Región</Label>
                                        <Input id="state" placeholder="Metropolitana" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="zipCode">Código Postal</Label>
                                        <Input id="zipCode" placeholder="7550000" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="country">País</Label>
                                        <Input id="country" defaultValue="Chile" disabled />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="propertyType">Tipo de Propiedad</Label>
                                    <Select>
                                        <SelectTrigger id="propertyType">
                                            <SelectValue placeholder="Seleccionar tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="house">Casa</SelectItem>
                                            <SelectItem value="apartment">Departamento</SelectItem>
                                            <SelectItem value="condo">Condominio</SelectItem>
                                            <SelectItem value="commercial">Comercial</SelectItem>
                                            <SelectItem value="land">Terreno</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Estado</Label>
                                    <Select defaultValue="available">
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Seleccionar estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="available">Disponible</SelectItem>
                                            <SelectItem value="under-contract">En Contrato</SelectItem>
                                            <SelectItem value="sold">Vendida</SelectItem>
                                            <SelectItem value="off-market">Fuera de Mercado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="listingPrice">Precio de Lista (CLP)</Label>
                                        <Input id="listingPrice" type="number" placeholder="150000000" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="yearBuilt">Año Construcción</Label>
                                        <Input id="yearBuilt" type="number" placeholder="2020" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="bedrooms">Dormitorios</Label>
                                        <Input id="bedrooms" type="number" placeholder="3" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="bathrooms">Baños</Label>
                                        <Input id="bathrooms" type="number" step="0.5" placeholder="2" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="squareFeet">Metros Cuadrados Construidos</Label>
                                        <Input id="squareFeet" type="number" placeholder="120" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="lotSize">Metros Cuadrados Terreno</Label>
                                        <Input id="lotSize" type="number" placeholder="200" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="features">Características</Label>
                                    <Textarea
                                        id="features"
                                        placeholder="Ejemplo: Piscina, Jardín, Estacionamiento, etc."
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Descripción detallada de la propiedad..."
                                    />
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
                                    {loading ? "Agregando..." : "Agregar Propiedad"}
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

