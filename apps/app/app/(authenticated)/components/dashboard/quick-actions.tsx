"use client"

import { useState } from "react"
import { Building2, Users, ListTodo } from "lucide-react"
import { Button } from "@repo/design-system/components/ui/button"
import { Card, CardContent } from "@repo/design-system/components/ui/card"
import { AddClientModal } from "../modals/add-client-modal"
import { AddPropertyModal } from "../modals/add-property-modal"
import { AddTaskModal } from "../modals/add-task-modal"

export function QuickActions() {
    const [clientModalOpen, setClientModalOpen] = useState(false)
    const [propertyModalOpen, setPropertyModalOpen] = useState(false)
    const [taskModalOpen, setTaskModalOpen] = useState(false)

    return (
        <>
            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Button
                            variant="secondary"
                            className="flex items-center justify-start sm:flex-col sm:items-center sm:justify-center h-14 sm:h-20 gap-3 sm:gap-2 px-4"
                            onClick={() => setClientModalOpen(true)}
                        >
                            <Users className="h-5 w-5" />
                            <span>Agregar Cliente</span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="flex items-center justify-start sm:flex-col sm:items-center sm:justify-center h-14 sm:h-20 gap-3 sm:gap-2 px-4"
                            onClick={() => setPropertyModalOpen(true)}
                        >
                            <Building2 className="h-5 w-5" />
                            <span>Agregar Propiedad</span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="flex items-center justify-start sm:flex-col sm:items-center sm:justify-center h-14 sm:h-20 gap-3 sm:gap-2 px-4"
                            onClick={() => setTaskModalOpen(true)}
                        >
                            <ListTodo className="h-5 w-5" />
                            <span>Agregar Tarea</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <AddClientModal open={clientModalOpen} onOpenChange={setClientModalOpen} />
            <AddPropertyModal open={propertyModalOpen} onOpenChange={setPropertyModalOpen} />
            <AddTaskModal open={taskModalOpen} onOpenChange={setTaskModalOpen} />
        </>
    )
}

