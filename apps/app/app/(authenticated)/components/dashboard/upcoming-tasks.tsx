import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { Badge } from "@repo/design-system/components/ui/badge"
import { Checkbox } from "@repo/design-system/components/ui/checkbox"
import { getUpcomingTasks } from "../../../actions/dashboard/queries"

export async function UpcomingTasks() {
    const tasks = await getUpcomingTasks()

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3">
                    <Checkbox id={task.id} />
                    <div className="grid gap-1.5">
                        <label
                            htmlFor={task.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {task.title}
                        </label>
                        <div className="flex items-center gap-2">
                            <Badge
                                variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}
                                className="text-xs"
                            >
                                {task.priority}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                                {task.dueDate ? new Date(task.dueDate * 1000).toLocaleString() : 'No due date'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

