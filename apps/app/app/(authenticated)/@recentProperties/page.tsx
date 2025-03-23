import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@repo/design-system/components/ui/card';
import { RecentProperties } from '../components/dashboard/recent-properties';
import { Suspense } from 'react';

export const revalidate = 30; // Revalidate every 30 seconds

export default function RecentPropertiesPage() {
    return (
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Propiedades Recientes</CardTitle>
                <CardDescription>Propiedades agregadas o actualizadas recientemente</CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<RecentPropertiesLoading />}>
                    <RecentProperties />
                </Suspense>
            </CardContent>
        </Card>
    );
}

function RecentPropertiesLoading() {
    return (
        <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-3">
                    <div className="animate-pulse h-4 bg-muted rounded w-3/4" />
                    <div className="animate-pulse h-4 bg-muted rounded w-1/2" />
                    <div className="flex justify-between items-center">
                        <div className="animate-pulse h-4 bg-muted rounded w-1/4" />
                        <div className="animate-pulse h-4 bg-muted rounded w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}