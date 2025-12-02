import { Project, Task } from './projects-service';
export type { Project, Task };

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEYS = {
    PROJECTS: 'sc_projects',
    TASKS: 'sc_tasks',
    USERS: 'sc_users'
};

export interface User {
    id: string;
    name: string;
    avatar: string;
}

const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Lindsey Schustereit', avatar: '/avatars/lindsey.jpg' },
    { id: 'u2', name: 'Kozmo', avatar: '/avatars/kozmo.jpg' },
    { id: 'u3', name: 'Designer', avatar: '/avatars/designer.jpg' },
];

export const getUsers = async (): Promise<User[]> => {
    await delay(300);
    return MOCK_USERS;
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
    await delay(500); // Fake network delay
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!data) return [];

    return JSON.parse(data).map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
        deadline: p.deadline ? new Date(p.deadline) : undefined
    }));
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    await delay(500);
    const projects = await getProjects();

    const newProject: Project = {
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([newProject, ...projects]));
    return newProject.id;
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([newProject, ...projects]));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([newProject, ...projects]));
    return newProject.id;
};

export const updateProject = async (projectId: string, updates: Partial<Project>): Promise<void> => {
    await delay(500);
    const projects = await getProjects();
    const index = projects.findIndex(p => p.id === projectId);

    if (index !== -1) {
        // Merge updates, handling date conversions if necessary (though partials usually come as proper types from client)
        // But if coming from JSON, dates might be strings.
        // For simplicity in mock, we assume caller passes correct types.
        projects[index] = { ...projects[index], ...updates, updatedAt: new Date() };
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    }
};

export const deleteProject = async (projectId: string): Promise<void> => {
    await delay(500);
    const projects = await getProjects();
    const updatedProjects = projects.filter(p => p.id !== projectId);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));

    // Also delete tasks for this project
    const tasksData = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (tasksData) {
        const tasks = JSON.parse(tasksData);
        const updatedTasks = tasks.filter((t: any) => t.projectId !== projectId);
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
    }
};

// Tasks
export const getTasks = async (projectId: string): Promise<Task[]> => {
    await delay(300);
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!data) return [];

    const allTasks = JSON.parse(data);
    return allTasks
        .filter((t: any) => t.projectId === projectId)
        .map((t: any) => ({
            ...t,
            dueDate: t.dueDate ? new Date(t.dueDate) : undefined
        }))
        .sort((a: any, b: any) => a.order - b.order);
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<string> => {
    await delay(300);
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    const allTasks = data ? JSON.parse(data) : [];

    const newTask: Task = {
        ...task,
        id: Math.random().toString(36).substr(2, 9),
    };

    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify([...allTasks, newTask]));
    return newTask.id;
};

export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!data) return;

    const allTasks = JSON.parse(data);
    const index = allTasks.findIndex((t: any) => t.id === taskId);

    if (index !== -1) {
        allTasks[index] = { ...allTasks[index], ...updates };
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(allTasks));
    }
};

export const updateTaskStatus = async (taskId: string, newStatus: Task['status'], newOrder: number): Promise<void> => {
    return updateTask(taskId, { status: newStatus, order: newOrder });
};
