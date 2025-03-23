import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@repo/design-system/components/ui/card';
import { UpcomingTasks } from '../components/dashboard/upcoming-tasks';
import { Suspense } from 'react';

export default function UpcomingTasksPage() {
    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks due soon</CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<UpcomingTasksLoading />}>
                    <UpcomingTasks />
                </Suspense>
            </CardContent>
        </Card>
    );
}

function UpcomingTasksLoading() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                    <div className="animate-pulse h-12 w-12 rounded-full bg-muted" />
                    <div className="space-y-2 flex-1">
                        <div className="animate-pulse h-4 bg-muted rounded w-3/4" />
                        <div className="animate-pulse h-4 bg-muted rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
} 