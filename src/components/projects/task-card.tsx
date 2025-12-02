import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Task } from "@/lib/projects-service";

interface TaskCardProps {
    task: Task;
    onEdit?: () => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const priorityColor = {
        low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4">
            <Card
                className="cursor-grab active:cursor-grabbing hover:shadow-lg transition-all shadow-sm border-muted-foreground/20"
                onClick={(e) => {
                    // Prevent click when dragging (dnd-kit handles this usually, but good to be safe)
                    // Actually, dnd-kit might swallow clicks. We might need a separate edit button if onClick on card doesn't work well with drag.
                    // But usually it works if not dragging.
                    if (onEdit) onEdit();
                }}
            >
                <CardHeader className="p-5 pb-2 space-y-0">
                    <div className="flex justify-between items-start">
                        <Badge variant="secondary" className={`text-[10px] px-2 py-0.5 ${priorityColor[task.priority || 'medium']}`}>
                            {task.priority || 'medium'}
                        </Badge>
                        {task.assignedTo && (
                            <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-[10px]">
                                    {/* Placeholder for now, ideally fetch user name */}
                                    U
                                </AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    <CardTitle className="text-base font-medium pt-3 leading-tight">
                        {task.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-2">
                    {task.dueDate && (
                        <p className="text-xs text-muted-foreground">
                            Due: {format(new Date(task.dueDate), "MMM d")}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
