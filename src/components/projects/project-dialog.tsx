"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createProject } from "@/lib/projects-service-mock";
import { updateProjectAction } from "@/app/actions/projects";
import { Project } from "@/lib/projects-service-mock";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    client: z.string().min(2, {
        message: "Client name must be at least 2 characters.",
    }),
    description: z.string().optional(),
    budget: z.coerce.number().optional(), // Use coerce to handle string input
    deadline: z.date().optional(),
});

interface ProjectDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onProjectSaved?: () => void;
    trigger?: React.ReactNode;
    projectToEdit?: Project | null;
}

export function ProjectDialog({ open, onOpenChange, onProjectSaved, trigger, projectToEdit }: ProjectDialogProps) {
    const [loading, setLoading] = useState(false);
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined;
    const showOpen = isControlled ? open : internalOpen;
    const setShowOpen = isControlled ? onOpenChange : setInternalOpen;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            client: "",
            description: "",
            budget: 0,
        },
    });

    // Reset form when projectToEdit changes or dialog opens
    useEffect(() => {
        if (showOpen) {
            if (projectToEdit) {
                form.reset({
                    name: projectToEdit.name,
                    client: projectToEdit.client || "",
                    description: projectToEdit.description || "",
                    budget: projectToEdit.budget || 0,
                    deadline: projectToEdit.deadline ? new Date(projectToEdit.deadline) : undefined,
                });
            } else {
                form.reset({
                    name: "",
                    client: "",
                    description: "",
                    budget: 0,
                    deadline: undefined,
                });
            }
        }
    }, [showOpen, projectToEdit, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            if (projectToEdit) {
                await updateProjectAction(projectToEdit.id, {
                    name: values.name,
                    client: values.client,
                    description: values.description || "",
                    budget: values.budget,
                    deadline: values.deadline,
                });
            } else {
                await createProject({
                    name: values.name,
                    client: values.client,
                    description: values.description || "",
                    budget: values.budget,
                    deadline: values.deadline,
                    status: 'active',
                });
            }

            setShowOpen?.(false);
            onProjectSaved?.();
        } catch (error) {
            console.error("Failed to save project", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={showOpen} onOpenChange={setShowOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{projectToEdit ? "Edit Project" : "Create Project"}</DialogTitle>
                    <DialogDescription>
                        {projectToEdit ? "Update project details." : "Add a new project to your workspace."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Website Redesign" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="client"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Corp" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Budget ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="5000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Deadline</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Project details..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {projectToEdit ? "Save Changes" : "Create Project"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
