"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { KanbanBoard } from "@/components/projects/kanban-board";
import { Project, getProjects, createProject } from "@/lib/projects-service-mock";
import { Button } from "@/components/ui/button";
import { Plus, Database } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const { user } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        loadProjects();
    }, []);

    useEffect(() => {
        if (searchParams.get("create") === "true") {
            setIsCreateDialogOpen(true);
        }
    }, [searchParams]);

    const loadProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedProjects = await getProjects();
            setProjects(fetchedProjects);
            if (fetchedProjects.length > 0 && !activeProjectId) {
                setActiveProjectId(fetchedProjects[0].id);
            }
        } catch (error) {
            console.error("Failed to load projects", error);
            setError("Failed to load projects. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleProjectCreated = () => {
        loadProjects();
        // Remove query param
        router.replace("/dashboard/projects");
    };

    const handleSeedData = async () => {
        if (!user) return;
        try {
            // 1. ProJob Monthly Maintenance
            await createProject({
                name: "ProJob Monthly Maintenance",
                description: "Monthly maintenance and updates.",
                client: "ProJob",
                budget: 500,
                status: 'active',
                deadline: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) // 1st of next month
            });

            // 2. Mingle Masters TX
            await createProject({
                name: "Logo Design",
                description: "Logo design for new brand identity.",
                client: "Mingle Masters TX",
                budget: 350,
                status: 'active',
            });

            // 3. ClevrSol
            await createProject({
                name: "Web App Development",
                description: "Full stack web application. In staging, pushing to production 12/15.",
                client: "ClevrSol",
                budget: 1750,
                status: 'completed',
                deadline: new Date("2025-12-15")
            });

            await loadProjects();
        } catch (error) {
            console.error("Failed to seed data", error);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-semibold">Projects</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleSeedData}>
                        <Database className="h-4 w-4 mr-2" />
                        Seed Data
                    </Button>
                    <CreateProjectDialog
                        open={isCreateDialogOpen}
                        onOpenChange={setIsCreateDialogOpen}
                        onProjectCreated={handleProjectCreated}
                        trigger={
                            <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Project
                            </Button>
                        }
                    />
                </div>
            </div>

            <div className="flex-1 overflow-hidden p-4">
                {loading && projects.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center text-muted-foreground">Loading projects...</div>
                    </div>
                ) : error ? (
                    <div className="flex h-full flex-col items-center justify-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Button onClick={loadProjects}>Retry</Button>
                    </div>
                ) : activeProjectId ? (
                    <div className="h-full flex flex-col">
                        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                            {projects.map(p => (
                                <Button
                                    key={p.id}
                                    variant={activeProjectId === p.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setActiveProjectId(p.id)}
                                    className="whitespace-nowrap"
                                >
                                    {p.name}
                                </Button>
                            ))}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <KanbanBoard projectId={activeProjectId} />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <p className="mb-4">No active projects found.</p>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>Create First Project</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
