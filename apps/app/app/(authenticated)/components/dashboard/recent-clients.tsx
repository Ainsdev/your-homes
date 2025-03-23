import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { Button } from "@repo/design-system/components/ui/button"
import { DotsHorizontalIcon } from "@repo/design-system"
import { getRecentClients } from "../../../actions/dashboard/queries"



export async function RecentClients() {
  const clients = await getRecentClients()
  type Client = typeof clients[number];
  return (
    <div className="space-y-4">
      {clients.map((client: Client) => (
        <div key={client.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{client.firstName[0]}{client.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{client.firstName} {client.lastName}</div>
              <div className="text-sm text-muted-foreground">{client.email}</div>
              <div className="text-sm text-muted-foreground">
                {client.clientType} • {client.budget ? `$${client.budget.toLocaleString()}` : 'No budget set'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {client.lastContactDate
                ? `Last contact: ${new Date(client.lastContactDate * 1000).toLocaleDateString()}`
                : 'No contact yet'}
            </div>
            <Button variant="ghost" size="icon">
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

