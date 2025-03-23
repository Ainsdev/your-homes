import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { Badge } from "@repo/design-system/components/ui/badge"
import { Button } from "@repo/design-system/components/ui/button"
import { Checkbox } from "@repo/design-system/components/ui/checkbox"
import { DotsHorizontalIcon } from "@repo/design-system"

interface PropertyListProps {
  filter?: string
}

export function PropertyList({ filter }: PropertyListProps) {
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
      agent: {
        name: "Julius Vaughan",
        email: "juliusvaughan@gmail.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "Jan 14, 2025",
    },
    {
      id: "P26672",
      address: "444 River Rd, Austin, TX",
      price: 675000,
      status: "Sold",
      type: "Condo",
      bedrooms: 2,
      bathrooms: 2,
      area: 1350,
      agent: {
        name: "Zaid Schwartz",
        email: "zaid@zaidstudio.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "Jan 14, 2025",
    },
  ].filter((property) => !filter || property.status === filter)

  return (
    <div className="border rounded-md">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium">
                <Checkbox />
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">Property</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Agent</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium"></th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {properties.map((property) => (
              <tr
                key={property.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">
                  <Checkbox />
                </td>
                <td className="p-4 align-middle">
                  <div className="font-medium">{property.address}</div>
                  <div className="text-xs text-muted-foreground">
                    {property.bedrooms} bd | {property.bathrooms} ba | {property.area} sqft
                  </div>
                </td>
                <td className="p-4 align-middle">{property.type}</td>
                <td className="p-4 align-middle">
                  {property.status === "For Rent" ? `$${property.price}/mo` : `$${property.price.toLocaleString()}`}
                </td>
                <td className="p-4 align-middle">
                  <Badge
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
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={property.agent.avatar} alt={property.agent.name} />
                      <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">{property.agent.name}</div>
                  </div>
                </td>
                <td className="p-4 align-middle">{property.date}</td>
                <td className="p-4 align-middle">
                  <Button variant="ghost" size="icon">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

