import { Badge } from "@repo/design-system/components/ui/badge"
import { Button } from "@repo/design-system/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@repo/design-system/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { Building2, Heart } from "lucide-react"
import { DotsHorizontalIcon } from "@repo/design-system"

export function PropertyGrid() {
  // This would come from your API in a real app
  const properties = [
    {
      id: "P26678",
      address: "123 Main St, New York, NY",
      price: 750000,
      status: "For Sale",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "/placeholder.svg?height=200&width=300",
      agent: {
        name: "Ammar Foley",
        email: "ammarfoley@gmail.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "Jan 16, 2025",
    },
    {
      id: "P26677",
      address: "456 Park Ave, Boston, MA",
      price: 1250000,
      status: "For Sale",
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      area: 2400,
      image: "/placeholder.svg?height=200&width=300",
      agent: {
        name: "Sienna Hewitt",
        email: "hi@siennahewitt.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "Jan 16, 2025",
    },
    {
      id: "P26676",
      address: "789 Ocean Dr, Miami, FL",
      price: 2100000,
      status: "For Sale",
      type: "Condo",
      bedrooms: 3,
      bathrooms: 3.5,
      area: 1800,
      image: "/placeholder.svg?height=200&width=300",
      agent: {
        name: "Pippa Wilkinson",
        email: "pippa@pippa.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "Jan 15, 2025",
    },
    {
      id: "P26675",
      address: "101 Lake View, Chicago, IL",
      price: 895000,
      status: "For Sale",
      type: "Townhouse",
      bedrooms: 3,
      bathrooms: 2.5,
      area: 1650,
      image: "/placeholder.svg?height=200&width=300",
      agent: {
        name: "Olly Schroeder",
        email: "olly.s@icloud.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "Jan 14, 2025",
    },
    {
      id: "P26674",
      address: "222 Mountain View, Denver, CO",
      price: 3200,
      status: "For Rent",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      image: "/placeholder.svg?height=200&width=300",
      agent: {
        name: "Mathilde Lewis",
        email: "mathilde@hey.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "Jan 14, 2025",
    },
    {
      id: "P26673",
      address: "333 Sunset Blvd, Los Angeles, CA",
      price: 1850000,
      status: "Pending",
      type: "House",
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
      image: "/placeholder.svg?height=200&width=300",
      agent: {
        name: "Julius Vaughan",
        email: "juliusvaughan@gmail.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "Jan 14, 2025",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <div className="relative">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.address}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button variant="secondary" size="icon" className="rounded-full h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full h-8 w-8">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
            <Badge
              className="absolute bottom-2 left-2"
              variant={
                property.status === "For Sale"
                  ? "default"
                  : property.status === "For Rent"
                    ? "outline"
                    : property.status === "Pending"
                      ? "secondary"
                      : "destructive"
              }
            >
              {property.status}
            </Badge>
          </div>
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{property.address}</h3>
                <p className="text-sm text-muted-foreground">{property.type}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  {property.status === "For Rent" ? `$${property.price}/mo` : `$${property.price.toLocaleString()}`}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{property.bedrooms} bd</span>
              </div>
              <div>
                <span>{property.bathrooms} ba</span>
              </div>
              <div>
                <span>{property.area} sqft</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={property.agent.avatar} alt={property.agent.name} />
                <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-xs">{property.agent.name}</div>
            </div>
            <div className="text-xs text-muted-foreground">{property.date}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

