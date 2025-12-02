"use client";

import { useState, useOptimistic, startTransition } from "react";
import { Company } from "@/lib/crm-service-mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal, Building2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { CompanyDialog } from "@/components/crm/company-dialog";
import { createCompanyAction } from "@/app/actions/crm";

interface CompaniesClientPageProps {
    initialCompanies: Company[];
}

type OptimisticAction =
    | { type: 'add'; company: Company }
    | { type: 'update'; company: Company }
    | { type: 'delete'; id: string };

export function CompaniesClientPage({ initialCompanies }: CompaniesClientPageProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
    const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null);

    const [optimisticCompanies, addOptimisticAction] = useOptimistic(
        initialCompanies,
        (state, action: OptimisticAction) => {
            switch (action.type) {
                case 'add':
                    return [action.company, ...state];
                case 'update':
                    return state.map(c => c.id === action.company.id ? action.company : c);
                case 'delete':
                    return state.filter(c => c.id !== action.id);
                default:
                    return state;
            }
        }
    );

    const filteredCompanies = optimisticCompanies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSeedData = async () => {
        // Seed data doesn't need optimistic updates as it's a bulk dev action
        const company1 = await createCompanyAction({
            name: "Mingle Masters TX",
            email: "hello@minglemasters.com",
            phone: "512-555-0123",
            status: "active",
            tags: ["Events", "VIP"],
            address: "123 Event Horizon Blvd, Austin, TX"
        });
        const company2 = await createCompanyAction({
            name: "ProJob",
            email: "contact@projob.app",
            status: "active",
            tags: ["Tech", "SaaS"],
        });
        const company3 = await createCompanyAction({
            name: "ClevrSol",
            email: "info@clevrsol.io",
            status: "lead",
            tags: ["Consulting"],
        });
        window.location.reload();
    };

    const handleCreateCompany = () => {
        setCompanyToEdit(null);
        setIsCompanyDialogOpen(true);
    };

    const handleEditCompany = (company: Company) => {
        setCompanyToEdit(company);
        setIsCompanyDialogOpen(true);
    };

    const handleOptimisticUpdate = (action: OptimisticAction) => {
        startTransition(() => {
            addOptimisticAction(action);
        });
    };

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
                    <p className="text-muted-foreground">
                        Manage your client companies and organizations.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSeedData}>Seed Data</Button>
                    <Button onClick={handleCreateCompany}>
                        <Plus className="mr-2 h-4 w-4" /> Add Company
                    </Button>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search companies..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Card>
                <CardHeader className="p-0" />
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCompanies.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No companies found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCompanies.map((company) => (
                                    <TableRow key={company.id} className={company.id.startsWith('temp-') ? 'opacity-50' : ''}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
                                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span>{company.name}</span>
                                                    <span className="text-xs text-muted-foreground">{company.email || "-"}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                company.status === 'active' ? 'default' :
                                                    company.status === 'lead' ? 'secondary' : 'outline'
                                            }>
                                                {company.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {company.aggregated_revenue > 0
                                                ? `$${company.aggregated_revenue.toLocaleString()}`
                                                : <span className="text-muted-foreground text-sm">-</span>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1 flex-wrap">
                                                {company.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0 h-5">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/crm/${company.id}`}>View Dashboard</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditCompany(company)}>Edit Company</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <CompanyDialog
                open={isCompanyDialogOpen}
                onOpenChange={setIsCompanyDialogOpen}
                companyToEdit={companyToEdit}
                onOptimisticUpdate={handleOptimisticUpdate}
            />
        </div>
    );
}
