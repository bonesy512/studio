import { TimelineEvent } from "@/lib/crm-service-mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, FileText, CheckCircle2, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TimelineItemProps {
    event: TimelineEvent;
}

export function TimelineItem({ event }: TimelineItemProps) {
    const getIcon = () => {
        switch (event.type) {
            case 'email_sent':
                return <Mail className="h-4 w-4 text-blue-500" />;
            case 'note_added':
                return <FileText className="h-4 w-4 text-gray-500" />;
            case 'project_state_changed':
                return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case 'invoice_paid':
                return <DollarSign className="h-4 w-4 text-yellow-500" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    return (
        <div className="flex gap-4 pb-8 relative last:pb-0">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-8 bottom-0 w-px bg-border last:hidden" />

            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm">
                {getIcon()}
            </div>

            <div className="flex flex-col flex-1 gap-2">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                        {event.createdBy}
                        <span className="text-muted-foreground font-normal ml-1">
                            {event.type === 'email_sent' && 'sent an email'}
                            {event.type === 'note_added' && 'added a note'}
                            {event.type === 'project_state_changed' && 'updated project status'}
                            {event.type === 'invoice_paid' && 'recorded payment'}
                        </span>
                    </div>
                    <time className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
                    </time>
                </div>
                <Card className="bg-muted/50 border-none shadow-none">
                    <CardContent className="p-3 text-sm">
                        {event.content}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
