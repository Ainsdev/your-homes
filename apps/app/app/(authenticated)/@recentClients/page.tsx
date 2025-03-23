import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@repo/design-system/components/ui/card';
import { RecentClients } from '../components/dashboard/recent-clients';
import { Suspense } from 'react';

export default function RecentClientsPage() {
    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Recently added or active clients</CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<RecentClientsLoading />}>
                    <RecentClients />
                </Suspense>
            </CardContent>
        </Card>
    );
}

function RecentClientsLoading() {
    return (
        <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                    <div className="animate-pulse h-10 w-10 rounded-full bg-muted" />
                    <div className="space-y-2 flex-1">
                        <div className="animate-pulse h-4 bg-muted rounded w-3/4" />
                        <div className="animate-pulse h-4 bg-muted rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
} 