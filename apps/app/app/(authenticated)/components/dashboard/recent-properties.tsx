import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { Badge } from "@repo/design-system/components/ui/badge"
import { Button } from "@repo/design-system/components/ui/button"
import { Card, CardContent } from "@repo/design-system/components/ui/card"
import { DotsHorizontalIcon } from "@repo/design-system"
import { getRecentProperties } from "../../../actions/dashboard/queries"


export async function RecentProperties() {
  const properties = await getRecentProperties()
  type Property = typeof properties[number];

  return (
    <div className="space-y-4">
      {properties.map((property: Property) => (
        <Card key={property.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="grid gap-1">
                <div className="font-semibold">{property.address}, {property.city}, {property.state}</div>
                <div className="text-sm text-muted-foreground">
                  {property.bedrooms ?? 0} bd | {property.bathrooms ?? 0} ba | {property.area ?? 0} sqft
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={property.status === "For Sale" ? "default" : "secondary"}>{property.status ?? "N/A"}</Badge>
                <div className="font-medium">${property.price !== null ? property.price.toLocaleString() : "N/A"}</div>
                <Button variant="ghost" size="icon">
                  <DotsHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </div>
            </div>
            <div className="border-t px-4 py-3">
              <div className="text-sm text-muted-foreground">
                Added {property.createdAt ? new Date(property.createdAt * 1000).toLocaleDateString() : "N/A"}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}