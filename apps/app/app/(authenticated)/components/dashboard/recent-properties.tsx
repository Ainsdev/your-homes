import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { Badge } from "@repo/design-system/components/ui/badge"
import { Button } from "@repo/design-system/components/ui/button"
import { Card, CardContent } from "@repo/design-system/components/ui/card"
import { DotsHorizontalIcon } from "@repo/design-system"
import { getRecentProperties } from "../../../actions/dashboard/queries"


export async function RecentProperties() {
  const properties = await getRecentProperties()
  type Property = typeof properties[number];

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "N/A";
    try {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
      }).format(price);
    } catch {
      return "N/A";
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      "available": "Disponible",
      "under-contract": "En Contrato",
      "sold": "Vendida",
      "off-market": "Fuera de Mercado"
    };
    return statusMap[status] || "N/A";
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp * 1000).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "N/A";
    }
  };

  if (!properties || !Array.isArray(properties)) {
    return <div>No hay propiedades disponibles</div>;
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="grid gap-1">
                <div className="font-semibold">
                  {[property.address, property.city, property.state]
                    .filter(Boolean)
                    .join(", ") || "Dirección no disponible"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {property.bedrooms ?? 0} hab | {property.bathrooms ?? 0} baños | {property.area ?? 0} m²
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={property.status === "available" ? "default" : "secondary"}>
                  {getStatusText(property.status ?? '')}
                </Badge>
                <div className="font-medium">{formatPrice(property.price)}</div>
                <Button variant="ghost" size="icon">
                  <DotsHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Más opciones</span>
                </Button>
              </div>
            </div>
            <div className="border-t px-4 py-3">
              <div className="text-sm text-muted-foreground">
                Agregada el {formatDate(property.createdAt)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}