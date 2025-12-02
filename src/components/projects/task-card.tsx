import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Task } from "@/lib/projects-service";

interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
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
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3">
            <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                <CardHeader className="p-4 pb-2 space-y-0">
                    <div className="flex justify-between items-start">
                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${priorityColor[task.priority]}`}>
                            {task.priority}
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
                    <CardTitle className="text-sm font-medium pt-2 leading-tight">
                        {task.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                    {task.dueDate && (
                        <p className="text-xs text-muted-foreground">
                            Due: {format(task.dueDate, "MMM d")}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
