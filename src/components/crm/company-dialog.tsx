"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createCompanyAction, updateCompanyAction } from "@/app/actions/crm";
import { Company } from "@/lib/crm-service-mock";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }).optional().or(z.literal("")),
    phone: z.string().optional(),
    status: z.enum(["active", "lead", "churned"]),
    address: z.string().optional(),
    tags: z.string().optional(), // Comma separated string for input
});

interface CompanyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    companyToEdit?: Company | null;
    onOptimisticUpdate?: (action: any) => void;
}

export function CompanyDialog({ open, onOpenChange, companyToEdit, onOptimisticUpdate }: CompanyDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            status: "lead",
            address: "",
            tags: "",
        },
    });

    useEffect(() => {
        if (companyToEdit) {
            form.reset({
                name: companyToEdit.name,
                email: companyToEdit.email || "",
                phone: companyToEdit.phone || "",
                status: companyToEdit.status,
                address: companyToEdit.address || "",
                tags: companyToEdit.tags.join(", "),
            });
        } else {
            form.reset({
                name: "",
                email: "",
                phone: "",
                status: "lead",
                address: "",
                tags: "",
            });
        }
    }, [companyToEdit, form, open]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const tagsArray = values.tags
                ? values.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "")
                : [];

            const companyData = {
                name: values.name,
                email: values.email || undefined,
                phone: values.phone || undefined,
                status: values.status,
                address: values.address || undefined,
                tags: tagsArray,
            };

            if (onOptimisticUpdate) {
                if (companyToEdit) {
                    onOptimisticUpdate({
                        type: 'update',
                        company: {
                            ...companyToEdit,
                            ...companyData,
                            updatedAt: new Date().toISOString()
                        }
                    });
                } else {
                    onOptimisticUpdate({
                        type: 'add',
                        company: {
                            id: `temp-${Date.now()}`,
                            ...companyData,
                            aggregated_revenue: 0,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        }
                    });
                }
            }

            if (companyToEdit) {
                await updateCompanyAction(companyToEdit.id, companyData);
            } else {
                await createCompanyAction(companyData);
            }

            onOpenChange(false);
            form.reset();
            // router.refresh(); // Server action handles revalidation, but refresh ensures props update if needed
        } catch (error) {
            console.error("Failed to save company", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{companyToEdit ? "Edit Company" : "Add Company"}</DialogTitle>
                    <DialogDescription>
                        {companyToEdit
                            ? "Make changes to the company profile here."
                            : "Add a new client company to your CRM."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="contact@acme.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="(555) 123-4567" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="lead">Lead</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="churned">Churned</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Input placeholder="SaaS, Enterprise, VIP (comma separated)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main St, City, State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {companyToEdit ? "Save Changes" : "Create Company"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
