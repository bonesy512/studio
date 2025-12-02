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

export async function deleteProjectAction(projectId: string) {
    // Dynamically import to match pattern (though not strictly needed if we import service at top)
    const { deleteProject } = await import("@/lib/projects-service-mock");
    await deleteProject(projectId);
    revalidatePath('/dashboard/projects');
}

export async function updateProjectAction(projectId: string, updates: Partial<Project>) {
    const { updateProject } = await import("@/lib/projects-service-mock");
    await updateProject(projectId, updates);
    revalidatePath('/dashboard/projects');
}

export async function updateTaskStatusAction(taskId: string, newStatus: Task['status'], newOrder: number) {
    await updateTaskStatusService(taskId, newStatus, newOrder);
    revalidatePath('/dashboard/projects');
}

export async function updateTaskAction(taskId: string, updates: Partial<Task>) {
    // Dynamically import updateTask to avoid circular dependency issues if any, 
    // or just assume it's available in the mock service exports.
    // I need to check if updateTask is exported from mock service. Yes it is.
    const { updateTask } = await import("@/lib/projects-service-mock");
    await updateTask(taskId, updates);
    revalidatePath('/dashboard/projects');
}

// Need to add deleteProject to mock service first?
// Checking projects-service-mock.ts... it doesn't have deleteProject.
// I'll add it to the mock service in the next step or assume I can add it here if I modify the mock service.
// For now, I will just add the updateTaskAction.
