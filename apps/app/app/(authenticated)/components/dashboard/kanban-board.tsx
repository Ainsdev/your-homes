"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { Badge } from "@repo/design-system/components/ui/badge"
import { Button } from "@repo/design-system/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@repo/design-system/components/ui/card"
import { DotsHorizontalIcon, DragDropContext, Draggable, Droppable, PlusIcon } from "@repo/design-system"


interface KanbanBoardProps {
  priority?: string
  status?: string
}

export function KanbanBoard({ priority, status }: KanbanBoardProps) {
  // This would come from your API in a real app
  const initialTasks = {
    todo: [
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
    ],
    inProgress: [
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
    ],
    review: [
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
    ],
    completed: [
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
    ],
  }

  // Filter tasks based on priority or status if provided
  const filteredTasks = {
    todo: initialTasks.todo.filter(
      (task) => (!priority || task.priority === priority) && (!status || task.status === status),
    ),
    inProgress: initialTasks.inProgress.filter(
      (task) => (!priority || task.priority === priority) && (!status || task.status === status),
    ),
    review: initialTasks.review.filter(
      (task) => (!priority || task.priority === priority) && (!status || task.status === status),
    ),
    completed: initialTasks.completed.filter(
      (task) => (!priority || task.priority === priority) && (!status || task.status === status),
    ),
  }

  const [tasks, setTasks] = useState(filteredTasks)

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the task that was dragged
    const sourceColumn = tasks[source.droppableId as keyof typeof tasks]
    const taskToMove = sourceColumn[source.index]

    // Create a new state object
    const newTasks = { ...tasks }

    // Remove from source column
    newTasks[source.droppableId as keyof typeof tasks] = [
      ...sourceColumn.slice(0, source.index),
      ...sourceColumn.slice(source.index + 1),
    ]

    // Add to destination column
    const destColumn = tasks[destination.droppableId as keyof typeof tasks]
    newTasks[destination.droppableId as keyof typeof tasks] = [
      ...destColumn.slice(0, destination.index),
      taskToMove,
      ...destColumn.slice(destination.index),
    ]

    setTasks(newTasks)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">To Do</h3>
            <Badge variant="outline">{tasks.todo.length}</Badge>
          </div>
          <Droppable droppableId="todo">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 min-h-[200px]">
                {tasks.todo.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <CardHeader className="p-3 pb-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={
                                task.priority === "High"
                                  ? "destructive"
                                  : task.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{task.property}</div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.client.avatar} alt={task.client.name} />
                              <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.client.name}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button variant="outline" className="w-full">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            )}
          </Droppable>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">In Progress</h3>
            <Badge variant="outline">{tasks.inProgress.length}</Badge>
          </div>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 min-h-[200px]">
                {tasks.inProgress.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <CardHeader className="p-3 pb-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={
                                task.priority === "High"
                                  ? "destructive"
                                  : task.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{task.property}</div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.client.avatar} alt={task.client.name} />
                              <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.client.name}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button variant="outline" className="w-full">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            )}
          </Droppable>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Review</h3>
            <Badge variant="outline">{tasks.review.length}</Badge>
          </div>
          <Droppable droppableId="review">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 min-h-[200px]">
                {tasks.review.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <CardHeader className="p-3 pb-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={
                                task.priority === "High"
                                  ? "destructive"
                                  : task.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{task.property}</div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.client.avatar} alt={task.client.name} />
                              <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.client.name}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button variant="outline" className="w-full">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            )}
          </Droppable>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Completed</h3>
            <Badge variant="outline">{tasks.completed.length}</Badge>
          </div>
          <Droppable droppableId="completed">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 min-h-[200px]">
                {tasks.completed.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing opacity-70"
                      >
                        <CardHeader className="p-3 pb-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={
                                task.priority === "High"
                                  ? "destructive"
                                  : task.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{task.property}</div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.client.avatar} alt={task.client.name} />
                              <AvatarFallback>{task.client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.client.name}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button variant="outline" className="w-full">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  )
}

