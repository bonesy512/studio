import { getCompanyById } from "@/lib/crm-service-mock";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, MapPin, DollarSign, Briefcase } from "lucide-react";

interface PageProps {
    params: Promise<{ companyId: string }>;
}

export default async function CompanyPage({ params }: PageProps) {
    const { companyId } = await params;
    const company = await getCompanyById(companyId);

    if (!company) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        {company.name}
                        <Badge variant={company.status === 'active' ? 'default' : 'secondary'}>
                            {company.status}
                        </Badge>
                    </h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Client Profile
                    </p>
                </div>
                <div className="flex gap-2">
                    {/* Actions like Edit, etc. can go here */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${company.aggregated_revenue.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Lifetime value
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contact Info</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium truncate" title={company.email}>
                            {company.email || "N/A"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {company.phone || "N/A"}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Location</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium">
                            {company.address || "No address listed"}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tags</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-1">
                            {company.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0">
                                    {tag}
                                </Badge>
                            ))}
                            {company.tags.length === 0 && <span className="text-xs text-muted-foreground">No tags</span>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
