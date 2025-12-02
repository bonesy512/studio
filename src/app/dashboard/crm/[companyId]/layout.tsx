import { ReactNode } from "react";

export default function CompanyDashboardLayout({
    children,
    activity,
    projects,
    invoices,
}: {
    children: ReactNode;
    activity: ReactNode;
    projects: ReactNode;
    invoices: ReactNode;
}) {
    return (
        <div className="flex flex-col space-y-6 h-full">
            {children}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
                <div className="xl:col-span-2 space-y-6 flex flex-col">
                    {projects}
                    {invoices}
                </div>
                <div className="xl:col-span-1 flex flex-col h-full">
                    {activity}
                </div>
            </div>
        </div>
    );
}
