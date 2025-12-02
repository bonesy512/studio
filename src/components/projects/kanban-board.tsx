"use client";

import { useEffect, useState, useMemo } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Task, getTasks, User, getUsers } from "@/lib/projects-service-mock";
import { createTaskAction, updateTaskStatusAction } from "@/app/actions/projects";
import { KanbanColumn } from "./kanban-column";
import { TaskCard } from "./task-card";
import { TaskDialog } from "./task-dialog";
import { createPortal } from "react-dom";

interface KanbanBoardProps {
    projectId: string;
}

type TaskStatus = Task['status'];

const COLUMNS: { id: TaskStatus; title: string }[] = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
];

export function KanbanBoard({ projectId }: KanbanBoardProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [targetColumn, setTargetColumn] = useState<TaskStatus>('todo');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        loadData();
    }, [projectId]);

    const loadData = async () => {
        const [fetchedTasks, fetchedUsers] = await Promise.all([
            getTasks(projectId),
            getUsers()
        ]);
        setTasks(fetchedTasks);
        setUsers(fetchedUsers);
    };

    const openCreateDialog = (status: TaskStatus) => {
        setEditingTask(null);
        setTargetColumn(status);
        setIsDialogOpen(true);
    };

    const handleSaveTask = async (taskData: Partial<Task>) => {
        if (editingTask) {
            // Edit logic would go here (not implemented in mock actions yet)
            console.log("Editing task", taskData);
        } else {
            // Create logic
            const newTask: Omit<Task, 'id'> = {
                projectId,
                title: taskData.title!,
                description: taskData.description,
                status: taskData.status || targetColumn,
                priority: 'medium',
                order: tasks.filter(t => t.status === (taskData.status || targetColumn)).length,
                assignedTo: taskData.assignedTo,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Optimistic update
            const tempId = Math.random().toString();
            const optimisticTask = { ...newTask, id: tempId } as Task;
            setTasks(prev => [...prev, optimisticTask]);

            try {
                await createTaskAction(newTask);
                // Reload to get real ID
                const fetchedTasks = await getTasks(projectId);
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Failed to create task", error);
                setTasks(prev => prev.filter(t => t.id !== tempId));
            }
        }
    };

    const tasksByStatus = useMemo(() => {
        const grouped: Record<TaskStatus, Task[]> = {
            "todo": [],
            "in-progress": [],
            "review": [],
            "done": [],
        };

        tasks.forEach(task => {
            if (grouped[task.status]) {
                grouped[task.status].push(task);
            }
        });

        return grouped;
    }, [tasks]);

    function onDragStart(event: DragStartEvent) {
        const { active } = event;
        const task = tasks.find((t) => t.id === active.id);
        if (task) setActiveTask(task);
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.sortable?.containerId !== "columns";
        const isOverTask = over.data.current?.sortable?.containerId !== "columns";

        if (!isActiveTask) return;

        // Dropping over a column (empty or not)
        const isOverColumn = COLUMNS.some(col => col.id === overId);

        if (isOverColumn) {
            // Visual placeholder handled by dnd-kit
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTask = tasks.find(t => t.id === activeId);
        if (!activeTask) return;

        let newStatus: TaskStatus | undefined;

        if (COLUMNS.some(col => col.id === overId)) {
            newStatus = overId as TaskStatus;
        } else {
            const overTask = tasks.find(t => t.id === overId);
            if (overTask) {
                newStatus = overTask.status;
            }
        }

        if (newStatus) {
            // Optimistic Update
            setTasks((prev) => {
                const updatedTasks = [...prev];
                const taskIndex = updatedTasks.findIndex(t => t.id === activeId);
                updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status: newStatus! };

                if (activeTask.status === newStatus) {
                    const oldIndex = prev.findIndex((t) => t.id === activeId);
                    const newIndex = prev.findIndex((t) => t.id === overId);
                    return arrayMove(prev, oldIndex, newIndex);
                }

                return updatedTasks;
            });

            // Server Action
            updateTaskStatusAction(activeId, newStatus, 0).catch(err => {
                console.error("Failed to update task status", err);
                loadTasks();
            });
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="flex h-full gap-4 overflow-x-auto pb-4">
                {COLUMNS.map((col) => (
                    <KanbanColumn
                        key={col.id}
                        id={col.id}
                        title={col.title}
                        tasks={tasksByStatus[col.id]}
                        onAddTask={() => openCreateDialog(col.id)}
                    />
                ))}
            </div>

            {createPortal(
                <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} /> : null}
                </DragOverlay>,
                document.body
            )}

            <TaskDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleSaveTask}
                users={users}
                defaultStatus={targetColumn}
                taskToEdit={editingTask}
            />
        </DndContext>
    );
}
