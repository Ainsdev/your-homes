import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { Badge } from "@repo/design-system/components/ui/badge"
import { Button } from "@repo/design-system/components/ui/button"
import { Checkbox } from "@repo/design-system/components/ui/checkbox"
import { DotsHorizontalIcon } from "@repo/design-system"

interface TaskListProps {
  priority?: string
  status?: string
}

export function TaskList({ priority, status }: TaskListProps) {
  // This would come from your API in a real app
  const tasks = [
    {
      id: "T1001",
      title: "Property viewing with Ammar Foley",
      status: "To Do",
      priority: "High",
      dueDate: "Today, 3:00 PM",
      client: {
        name: "Ammar Foley",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "123 Main St, New York, NY",
    },
    {
      id: "T1002",
      title: "Follow up with Sienna Hewitt",
      status: "To Do",
      priority: "Medium",
      dueDate: "Today, 5:00 PM",
      client: {
        name: "Sienna Hewitt",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "456 Park Ave, Boston, MA",
    },
    {
      id: "T1003",
      title: "Submit listing for 789 Ocean Dr",
      status: "In Progress",
      priority: "High",
      dueDate: "Today, 11:59 PM",
      client: {
        name: "Pippa Wilkinson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "789 Ocean Dr, Miami, FL",
    },
    {
      id: "T1004",
      title: "Open house preparation",
      status: "In Progress",
      priority: "Medium",
      dueDate: "Jan 18, 2025",
      client: {
        name: "Olly Schroeder",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "101 Lake View, Chicago, IL",
    },
    {
      id: "T1005",
      title: "Contract review meeting",
      status: "Review",
      priority: "High",
      dueDate: "Jan 25, 2025",
      client: {
        name: "Mathilde Lewis",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "555 River Rd, Austin, TX",
    },
    {
      id: "T1006",
      title: "Monthly client newsletter",
      status: "To Do",
      priority: "Low",
      dueDate: "Jan 31, 2025",
      client: {
        name: "Team",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "N/A",
    },
    {
      id: "T1007",
      title: "Update property photos",
      status: "Completed",
      priority: "Medium",
      dueDate: "Jan 10, 2025",
      client: {
        name: "Julius Vaughan",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "333 Sunset Blvd, Los Angeles, CA",
    },
    {
      id: "T1008",
      title: "Client follow-up call",
      status: "Completed",
      priority: "Low",
      dueDate: "Jan 8, 2025",
      client: {
        name: "Zaid Schwartz",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      property: "444 River Rd, Austin, TX",
    },
  ].filter((task) => (!priority || task.priority === priority) && (!status || task.status === status))

  return (
    <div className="border rounded-md">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium">
                <Checkbox />
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">Task</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Priority</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Due Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Client</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Property</th>
              <th className="h-12 px-4 text-left align-middle font-medium"></th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {tasks.map((task) => (
              <tr key={task.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">
                  <Checkbox checked={task.status === "Completed"} />
                </td>
                <td className="p-4 align-middle">
                  <div className="font-medium">{task.title}</div>
                </td>
                <td className="p-4 align-middle">
                  <Badge
                    variant={
                      task.status === "To Do"
                        ? "outline"
                        : task.status === "In Progress"
                          ? "default"
                          : task.status === "Review"
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {task.status}
                  </Badge>
                </td>
                <td className="p-4 align-middle">
                  <Badge
                    variant={
                      task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </td>
                <td className="p-4 align-middle">{task.dueDate}</td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={task.client.avatar} alt={task.client.name} />
                      <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">{task.client.name}</div>
                  </div>
                </td>
                <td className="p-4 align-middle">{task.property}</td>
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

