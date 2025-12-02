import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    query,
    where,
    orderBy,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'archived';
    budget?: number;
    client?: string;
    deadline?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Task {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    assignedTo?: string; // User UID
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Projects
export const getProjects = async (): Promise<Project[]> => {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('updatedAt', 'desc'));

    // Timeout after 10 seconds
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firestore fetch timed out')), 10000)
    );

    const snapshotPromise = getDocs(q);
    const snapshot = await Promise.race([snapshotPromise, timeoutPromise]) as any;

    return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate(),
    })) as Project[];
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const projectsRef = collection(db, 'projects');
    const docRef = await addDoc(projectsRef, {
        ...project,
        deadline: project.deadline ? Timestamp.fromDate(project.deadline) : null,
        status: project.status || 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
};

// Tasks
export const getTasks = async (projectId: string): Promise<Task[]> => {
    const tasksRef = collection(db, 'tasks');
    const q = query(
        tasksRef,
        where('projectId', '==', projectId),
        orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dueDate: (doc.data().dueDate as Timestamp)?.toDate(),
    })) as Task[];
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<string> => {
    const tasksRef = collection(db, 'tasks');
    const docRef = await addDoc(tasksRef, {
        ...task,
        dueDate: task.dueDate ? Timestamp.fromDate(task.dueDate) : null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
};

export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
    const taskRef = doc(db, 'tasks', taskId);
    const dataToUpdate: any = { ...updates, updatedAt: serverTimestamp() };

    if (updates.dueDate) {
        dataToUpdate.dueDate = Timestamp.fromDate(updates.dueDate);
    }

    await updateDoc(taskRef, dataToUpdate);
};

export const updateTaskStatus = async (taskId: string, newStatus: Task['status'], newOrder: number): Promise<void> => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
        status: newStatus,
        order: newOrder,
        updatedAt: serverTimestamp(),
    });
};
