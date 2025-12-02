import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "@/lib/projects-service";
import { TaskCard } from "./task-card";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
    id: string;
    title: string;
    tasks: Task[];
    onAddTask?: () => void;
    onEditTask?: (task: Task) => void;
}

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function KanbanColumn({ id, title, tasks, onAddTask, onEditTask }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div className="flex flex-col h-full w-96 shrink-0">
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-semibold text-sm text-foreground/80 uppercase tracking-wider">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {tasks.length}
                    </span>
                    {onAddTask && (
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onAddTask}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <div
                ref={setNodeRef}
                className={cn(
                    "flex-1 bg-muted/30 rounded-lg p-3 overflow-y-auto min-h-[150px]",
                    "border border-transparent hover:border-border/50 transition-colors"
                )}
            >
                <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onEdit={() => onEditTask?.(task)} />
                    ))}
                </SortableContext>
                {tasks.length === 0 && (
                    <div className="h-full flex items-center justify-center text-muted-foreground/40 text-sm italic">
                        Drop tasks here
                    </div>
                )}
            </div>
        </div>
    );
}
