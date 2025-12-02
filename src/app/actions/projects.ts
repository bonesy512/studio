// 'use server'; 
// ^ DISABLED for Offline Mode (Mock Service). 
// Real Server Actions cannot access localStorage.
// Uncomment this when switching to real Firestore.

import {
    createProject as createProjectService,
    updateTaskStatus as updateTaskStatusService,
    getProjects as getProjectsService,
    getTasks as getTasksService,
    createTask as createTaskService,
    Project,
    Task
} from "@/lib/projects-service-mock";

// Mock revalidatePath for client-side usage
const revalidatePath = (path: string) => {
    console.log(`[Mock] Revalidating path: ${path}`);
};

export async function getProjectsAction(): Promise<Project[]> {
    return await getProjectsService();
}

export async function getTasksAction(projectId: string): Promise<Task[]> {
    return await getTasksService(projectId);
}

export async function createTaskAction(task: Omit<Task, 'id'>) {
    await createTaskService(task);
    revalidatePath('/dashboard/projects');
}

export async function createProjectAction(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    await createProjectService(project);
    revalidatePath('/dashboard/projects');
}

export async function updateTaskStatusAction(taskId: string, newStatus: Task['status'], newOrder: number) {
    await updateTaskStatusService(taskId, newStatus, newOrder);
    revalidatePath('/dashboard/projects');
}
