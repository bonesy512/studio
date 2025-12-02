import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export default function InvoicesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Invoices
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-sm">Invoices will appear here.</p>
                {/* TODO: Implement Invoices List linked to this company */}
            </CardContent>
        </Card>
    );
}
