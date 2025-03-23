"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@repo/design-system/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@repo/design-system/components/ui/dialog"
import { Input } from "@repo/design-system/components/ui/input"
import { Label } from "@repo/design-system/components/ui/label"
import { Textarea } from "@repo/design-system/components/ui/textarea"
import { toast } from "@repo/design-system/hooks/use-toast"
import { Plus, Trash2 } from "lucide-react"
import { Checkbox } from "@repo/design-system/components/ui/checkbox"

interface CreateFormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateFormModal({ open, onOpenChange }: CreateFormModalProps) {
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState([
        { id: 1, type: "text", label: "Full Name", required: true },
        { id: 2, type: "email", label: "Email Address", required: true },
        { id: 3, type: "tel", label: "Phone Number", required: false },
    ])

    const handleAddField = () => {
        const newId = Math.max(0, ...fields.map((f) => f.id)) + 1
        setFields([...fields, { id: newId, type: "text", label: "New Field", required: false }])
    }

    const handleRemoveField = (id: number) => {
        setFields(fields.filter((field) => field.id !== id))
    }

    const handleUpdateField = (id: number, updates: Partial<(typeof fields)[0]>) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            onOpenChange(false)
            toast({
                title: "Form created successfully",
                description: "Your new client intake form has been created.",
            })
        }, 1000)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Client Intake Form</DialogTitle>
                    <DialogDescription>Design a form to collect information from potential clients.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="formTitle">Form Title</Label>
                            <Input id="formTitle" placeholder="Client Intake Form" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="formDescription">Form Description</Label>
                            <Textarea
                                id="formDescription"
                                placeholder="Please fill out this form to help us understand your real estate needs..."
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Form Fields</h3>
                                <Button type="button" variant="outline" size="sm" onClick={handleAddField}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Field
                                </Button>
                            </div>

                            {fields.map((field) => (
                                <div key={field.id} className="border rounded-md p-3 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Field #{field.id}</h4>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveField(field.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`field-${field.id}-label`}>Field Label</Label>
                                            <Input
                                                id={`field-${field.id}-label`}
                                                value={field.label}
                                                onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`field-${field.id}-type`}>Field Type</Label>
                                            <select
                                                id={`field-${field.id}-type`}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={field.type}
                                                onChange={(e) => handleUpdateField(field.id, { type: e.target.value })}
                                            >
                                                <option value="text">Text</option>
                                                <option value="email">Email</option>
                                                <option value="tel">Phone</option>
                                                <option value="number">Number</option>
                                                <option value="textarea">Text Area</option>
                                                <option value="select">Dropdown</option>
                                                <option value="checkbox">Checkbox</option>
                                                <option value="radio">Radio Buttons</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`field-${field.id}-required`}
                                            checked={field.required}
                                            onCheckedChange={(checked) => handleUpdateField(field.id, { required: checked === true })}
                                        />
                                        <Label htmlFor={`field-${field.id}-required`}>Required field</Label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Form"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

