import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { getTimelineEvents } from "@/lib/crm-service-mock";
import { TimelineItem } from "@/components/crm/timeline-item";

interface PageProps {
    params: Promise<{ companyId: string }>;
}

export default async function ActivityPage({ params }: PageProps) {
    const { companyId } = await params;
    const events = await getTimelineEvents(companyId);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activity Feed
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-2">
                {events.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">No recent activity.</p>
                ) : (
                    <div className="space-y-0">
                        {events.map(event => (
                            <TimelineItem key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
