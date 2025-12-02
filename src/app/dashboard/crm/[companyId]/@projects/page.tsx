import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderKanban, Calendar, DollarSign } from "lucide-react";
import { getProjects } from "@/lib/projects-service-mock";
import { getCompanyById } from "@/lib/crm-service-mock";
import Link from "next/link";
import { format } from "date-fns";

interface PageProps {
    params: Promise<{ companyId: string }>;
}

export default async function ProjectsPage({ params }: PageProps) {
    const { companyId } = await params;
    const company = await getCompanyById(companyId);

    if (!company) {
        return null;
    }

    const allProjects = await getProjects();
    // Filter projects by company name (case-insensitive match)
    const companyProjects = allProjects.filter(
        p => p.client?.toLowerCase() === company.name.toLowerCase()
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FolderKanban className="h-5 w-5" />
                    Projects
                    {companyProjects.length > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                            {companyProjects.length}
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {companyProjects.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-4">
                        No active projects for this company.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {companyProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/dashboard/projects?project=${project.id}`}
                                className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm truncate">
                                            {project.name}
                                        </h4>
                                        {project.description && (
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                {project.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                            {project.budget && (
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="h-3 w-3" />
                                                    {project.budget.toLocaleString()}
                                                </span>
                                            )}
                                            {project.deadline && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {format(project.deadline, 'MMM d, yyyy')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Badge
                                        variant={
                                            project.status === 'active' ? 'default' :
                                                project.status === 'completed' ? 'secondary' : 'outline'
                                        }
                                        className="shrink-0"
                                    >
                                        {project.status}
                                    </Badge>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
