"use client";

import { Project } from "@/lib/projects-service-mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, User, FileText } from "lucide-react";
import { format } from "date-fns";

interface ProjectHeaderProps {
    project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Budget
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {project.budget ? `$${project.budget.toLocaleString()}` : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Estimated cost
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Client
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold truncate">
                        {project.client || "Internal"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Project owner
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Deadline
                    </CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {project.deadline ? format(new Date(project.deadline), "MMM d, yyyy") : "No Date"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Target completion
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Scope
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-sm font-medium line-clamp-2">
                        {project.description || "No scope defined"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        <Badge variant="outline">View Details</Badge>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
