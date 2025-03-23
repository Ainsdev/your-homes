"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@repo/design-system/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@repo/design-system/components/ui/drawer"
import { Input } from "@repo/design-system/components/ui/input"
import { Label } from "@repo/design-system/components/ui/label"
import { Textarea } from "@repo/design-system/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@repo/design-system/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select"
import { toast } from "@repo/design-system/hooks/use-toast"
import { ScrollArea } from "@repo/design-system/components/ui/scroll-area"
import { Search, X, Check, Loader2 } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@repo/design-system/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@repo/design-system/components/ui/popover"
import { searchProperties, addClient, type PropertySearchResult, type ClientFormData } from "@/app/actions/clients/queries"
import { useRouter } from "next/navigation"

interface AddClientModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddClientModal({ open, onOpenChange }: AddClientModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)
    const [clientType, setClientType] = useState<"buyer" | "seller" | "both">("buyer")
    const [interestLevel, setInterestLevel] = useState<"Low" | "Medium" | "High">("Medium")
    const [status, setStatus] = useState<"Active" | "Inactive" | "Lead">("Active")
    const [selectedProperty, setSelectedProperty] = useState<PropertySearchResult | null>(null)
    const [properties, setProperties] = useState<PropertySearchResult[]>([])
    const [isPropertySearchOpen, setPropertySearchOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    // Campos del formulario
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [budget, setBudget] = useState<string>("")
    const [preferredLocation, setPreferredLocation] = useState("")
    const [propertyType, setPropertyType] = useState("")
    const [minBedrooms, setMinBedrooms] = useState<string>("")
    const [minBathrooms, setMinBathrooms] = useState<string>("")
    const [minSquareFeet, setMinSquareFeet] = useState<string>("")
    const [propertyRequirements, setPropertyRequirements] = useState("")
    const [leadSource, setLeadSource] = useState("")
    const [notes, setNotes] = useState("")

    // Check if screen is desktop size (min-width: 768px)
    useEffect(() => {
        const checkIsDesktop = () => {
            setIsDesktop(window.innerWidth >= 768)
        }
        checkIsDesktop()
        window.addEventListener("resize", checkIsDesktop)
        return () => window.removeEventListener("resize", checkIsDesktop)
    }, [])

    // Buscar propiedades cuando cambia la consulta de búsqueda
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (isPropertySearchOpen) {
                try {
                    setSearchLoading(true);
                    const results = await searchProperties(searchQuery);
                    setProperties(results);
                } catch (error) {
                    console.error("Error al buscar propiedades:", error);
                    toast({
                        title: "Error",
                        description: "No se pudieron cargar las propiedades",
                        variant: "destructive",
                    });
                } finally {
                    setSearchLoading(false);
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, isPropertySearchOpen]);

    // Cargar propiedades iniciales cuando se abre el selector
    useEffect(() => {
        if (isPropertySearchOpen && properties.length === 0 && !searchLoading) {
            const fetchInitialProperties = async () => {
                try {
                    setSearchLoading(true);
                    const results = await searchProperties("");
                    setProperties(results);
                } catch (error) {
                    console.error("Error al cargar propiedades iniciales:", error);
                } finally {
                    setSearchLoading(false);
                }
            };

            fetchInitialProperties();
        }
    }, [isPropertySearchOpen, properties.length, searchLoading]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Preparar los datos del formulario
            const formData: ClientFormData = {
                firstName,
                lastName,
                email: email || null,
                phoneNumber: phone || null,
                address: address || null,
                propertyId: selectedProperty?.id || null,
                interestLevel,
                notes: notes || null,
                clientType,
                status,
                budget: budget ? parseFloat(budget) : null,
                preferredLocation: preferredLocation || null,
                propertyRequirements: propertyRequirements || null,
                leadSource: leadSource || null,
                minBedrooms: minBedrooms ? parseInt(minBedrooms) : null,
                minBathrooms: minBathrooms ? parseFloat(minBathrooms) : null,
                minSquareFeet: minSquareFeet ? parseInt(minSquareFeet) : null,
                desiredPropertyType: propertyType || null,
            };

            // Enviar datos a la base de datos
            await addClient(formData);

            // Cerrar el modal y mostrar mensaje de éxito
            onOpenChange(false);
            toast({
                title: "Cliente agregado exitosamente",
                description: "El nuevo cliente ha sido agregado al sistema.",
            });

            // Actualizar la página para reflejar los cambios
            router.refresh();
        } catch (error) {
            console.error("Error al agregar cliente:", error);
            toast({
                title: "Error",
                description: "No se pudo agregar el cliente. Por favor, intente nuevamente.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    const selectProperty = (property: PropertySearchResult) => {
        setSelectedProperty(property);
        setPropertySearchOpen(false);
    };

    const clearSelectedProperty = () => {
        setSelectedProperty(null);
    };

    const PropertyListSelector = () => (
        <Command>
            <CommandInput
                placeholder="Buscar por dirección, tipo..."
                value={searchQuery}
                onValueChange={setSearchQuery}
            />
            <CommandList>
                {searchLoading ? (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <CommandEmpty>No se encontraron propiedades.</CommandEmpty>
                        <CommandGroup>
                            {properties.map((property) => (
                                <CommandItem
                                    key={property.id}
                                    value={property.id}
                                    onSelect={() => selectProperty(property)}
                                    className="flex items-start py-2"
                                >
                                    <div className="flex-1">
                                        <div className="font-medium">{property.address}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {property.city && `${property.city} · `}
                                            {property.propertyType === 'apartment' ? 'Departamento' : property.propertyType === 'house' ? 'Casa' : property.propertyType} ·
                                            {property.bedrooms && `${property.bedrooms} dorm · `}
                                            {property.bathrooms && `${property.bathrooms} baños · `}
                                            {property.squareFeet && `${property.squareFeet} m² · `}
                                            {property.listingPrice && `$${property.listingPrice.toLocaleString('es-CL')} CLP`}
                                        </div>
                                    </div>
                                    {selectedProperty?.id === property.id && <Check className="h-4 w-4 ml-2 text-primary" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </Command>
    );

    const PropertySearchDesktop = () => (
        <Popover open={isPropertySearchOpen} onOpenChange={setPropertySearchOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                >
                    <Search className="h-3.5 w-3.5 mr-1" />
                    Buscar Propiedad
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <PropertyListSelector />
            </PopoverContent>
        </Popover>
    );

    const PropertySearchMobile = () => (
        <Drawer open={isPropertySearchOpen} onOpenChange={setPropertySearchOpen}>
            <DrawerTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                >
                    <Search className="h-3.5 w-3.5 mr-1" />
                    Buscar Propiedad
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Buscar Propiedad</DrawerTitle>
                    <DrawerDescription>Seleccione una propiedad para este cliente</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <PropertyListSelector />
                </div>
                <DrawerFooter>
                    <Button
                        variant="outline"
                        onClick={() => setPropertySearchOpen(false)}
                    >
                        Cancelar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );

    const isBuyer = clientType === "buyer" || clientType === "both"

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle className="text-xl">Agregar Nuevo Cliente</DrawerTitle>
                        <DrawerDescription>Ingrese la información del cliente para agregarlo al sistema.</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100vh-10rem)] p-4">
                        <ScrollArea className="flex-1 px-4">
                            <div className="grid gap-6 pb-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="firstName" className="text-sm font-medium">Nombre</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="Juan"
                                            required
                                            className="h-10"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="lastName" className="text-sm font-medium">Apellido</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Pérez"
                                            required
                                            className="h-10"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full">
                                    <div className="grid gap-2 w-full">
                                        <Label htmlFor="email" className="text-sm font-medium">Correo Electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="juan.perez@ejemplo.com"
                                            className="h-10"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2 w-full">
                                        <Label htmlFor="phone" className="text-sm font-medium">Teléfono</Label>
                                        <Input
                                            id="phone"
                                            placeholder="+56 9 1234 5678"
                                            className="h-10"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address" className="text-sm font-medium">Dirección</Label>
                                    <Input
                                        id="address"
                                        placeholder="Av. Principal 123"
                                        className="h-10"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="text-sm font-medium">Tipo de Cliente</Label>
                                    <RadioGroup
                                        defaultValue="buyer"
                                        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                                        onValueChange={(value) => setClientType(value as "buyer" | "seller" | "both")}
                                    >
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="buyer" id="buyer" />
                                            <Label htmlFor="buyer" className="cursor-pointer">Comprador</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="seller" id="seller" />
                                            <Label htmlFor="seller" className="cursor-pointer">Vendedor</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="both" id="both" />
                                            <Label htmlFor="both" className="cursor-pointer">Ambos</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="status" className="text-sm font-medium">Estado</Label>
                                    <Select defaultValue="Active" onValueChange={(value) => setStatus(value as "Active" | "Inactive" | "Lead")}>
                                        <SelectTrigger id="status" className="h-10">
                                            <SelectValue placeholder="Seleccionar estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Activo</SelectItem>
                                            <SelectItem value="Inactive">Inactivo</SelectItem>
                                            <SelectItem value="Lead">Lead</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-3">
                                    <Label className="text-sm font-medium">Nivel de Interés</Label>
                                    <RadioGroup
                                        defaultValue="medium"
                                        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                                        onValueChange={(value) => {
                                            const mapValue: Record<string, "Low" | "Medium" | "High"> = {
                                                "low": "Low",
                                                "medium": "Medium",
                                                "high": "High"
                                            };
                                            setInterestLevel(mapValue[value]);
                                        }}
                                    >
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="high" id="high" />
                                            <Label htmlFor="high" className="cursor-pointer">Alto</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="medium" id="medium" />
                                            <Label htmlFor="medium" className="cursor-pointer">Medio</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-accent">
                                            <RadioGroupItem value="low" id="low" />
                                            <Label htmlFor="low" className="cursor-pointer">Bajo</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {isBuyer && (
                                    <>
                                        <div className="border-t pt-4 mt-2">
                                            <h3 className="text-md font-medium mb-3">Información del Comprador</h3>
                                        </div>

                                        {/* Botón para seleccionar propiedad existente */}
                                        <div className="grid gap-2">
                                            <div className="flex justify-between items-center">
                                                <Label className="text-sm font-medium">Propiedad Seleccionada</Label>
                                                {!selectedProperty && (
                                                    isDesktop ? <PropertySearchDesktop /> : <PropertySearchMobile />
                                                )}
                                            </div>

                                            {selectedProperty ? (
                                                <div className="border rounded-md p-3 relative">
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                                                        onClick={clearSelectedProperty}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                    <div className="font-medium">{selectedProperty.address}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {selectedProperty.city && `${selectedProperty.city} · `}
                                                        {selectedProperty.propertyType === 'apartment' ? 'Departamento' : selectedProperty.propertyType === 'house' ? 'Casa' : selectedProperty.propertyType} ·
                                                        {selectedProperty.bedrooms && `${selectedProperty.bedrooms} dorm · `}
                                                        {selectedProperty.bathrooms && `${selectedProperty.bathrooms} baños · `}
                                                        {selectedProperty.squareFeet && `${selectedProperty.squareFeet} m² · `}
                                                        {selectedProperty.listingPrice && `$${selectedProperty.listingPrice.toLocaleString('es-CL')} CLP`}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                                    No hay propiedad seleccionada. Busque una propiedad o complete los campos de preferencias a continuación.
                                                </div>
                                            )}
                                        </div>

                                        {/* Mostrar campos de preferencias solo si no hay propiedad seleccionada */}
                                        {!selectedProperty && (
                                            <>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="budget" className="text-sm font-medium">Presupuesto (CLP)</Label>
                                                    <Input
                                                        id="budget"
                                                        type="number"
                                                        placeholder="50000000"
                                                        className="h-10"
                                                        value={budget}
                                                        onChange={(e) => setBudget(e.target.value)}
                                                    />
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label htmlFor="preferredLocation" className="text-sm font-medium">Ubicación Preferida</Label>
                                                    <Input
                                                        id="preferredLocation"
                                                        placeholder="Las Condes, Santiago"
                                                        className="h-10"
                                                        value={preferredLocation}
                                                        onChange={(e) => setPreferredLocation(e.target.value)}
                                                    />
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label htmlFor="propertyType" className="text-sm font-medium">Tipo de Propiedad Buscada</Label>
                                                    <Select onValueChange={setPropertyType}>
                                                        <SelectTrigger id="propertyType" className="h-10">
                                                            <SelectValue placeholder="Seleccionar tipo de propiedad" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="house">Casa</SelectItem>
                                                            <SelectItem value="apartment">Departamento</SelectItem>
                                                            <SelectItem value="condo">Condominio</SelectItem>
                                                            <SelectItem value="land">Terreno</SelectItem>
                                                            <SelectItem value="commercial">Comercial</SelectItem>
                                                            <SelectItem value="industrial">Industrial</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="minBedrooms" className="text-sm font-medium">Mín. Dormitorios</Label>
                                                        <Select onValueChange={setMinBedrooms}>
                                                            <SelectTrigger id="minBedrooms" className="h-10">
                                                                <SelectValue placeholder="Seleccionar" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1">1+</SelectItem>
                                                                <SelectItem value="2">2+</SelectItem>
                                                                <SelectItem value="3">3+</SelectItem>
                                                                <SelectItem value="4">4+</SelectItem>
                                                                <SelectItem value="5">5+</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="minBathrooms" className="text-sm font-medium">Mín. Baños</Label>
                                                        <Select onValueChange={setMinBathrooms}>
                                                            <SelectTrigger id="minBathrooms" className="h-10">
                                                                <SelectValue placeholder="Seleccionar" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1">1+</SelectItem>
                                                                <SelectItem value="1.5">1.5+</SelectItem>
                                                                <SelectItem value="2">2+</SelectItem>
                                                                <SelectItem value="2.5">2.5+</SelectItem>
                                                                <SelectItem value="3">3+</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="minSquareFeet" className="text-sm font-medium">Mín. m²</Label>
                                                        <Input
                                                            id="minSquareFeet"
                                                            type="number"
                                                            placeholder="80"
                                                            className="h-10"
                                                            value={minSquareFeet}
                                                            onChange={(e) => setMinSquareFeet(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label htmlFor="propertyRequirements" className="text-sm font-medium">Requisitos Adicionales</Label>
                                                    <Textarea
                                                        id="propertyRequirements"
                                                        placeholder="Especifique otros requisitos (estacionamiento, terraza, etc.)"
                                                        className="min-h-[80px]"
                                                        value={propertyRequirements}
                                                        onChange={(e) => setPropertyRequirements(e.target.value)}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}

                                <div className="grid gap-2">
                                    <Label htmlFor="leadSource" className="text-sm font-medium">Fuente del Lead</Label>
                                    <Select onValueChange={setLeadSource}>
                                        <SelectTrigger id="leadSource" className="h-10">
                                            <SelectValue placeholder="Seleccionar fuente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="referral">Referido</SelectItem>
                                            <SelectItem value="website">Sitio Web</SelectItem>
                                            <SelectItem value="social">Redes Sociales</SelectItem>
                                            <SelectItem value="portal">Portal Inmobiliario</SelectItem>
                                            <SelectItem value="coldCall">Llamada en Frío</SelectItem>
                                            <SelectItem value="event">Evento</SelectItem>
                                            <SelectItem value="other">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="notes" className="text-sm font-medium">Notas</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Información adicional sobre el cliente..."
                                        className="min-h-[100px]"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
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
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Agregando...
                                        </>
                                    ) : "Agregar Cliente"}
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


