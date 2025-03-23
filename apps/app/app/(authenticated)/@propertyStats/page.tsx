import { Card, CardHeader, CardTitle, CardContent } from '@repo/design-system/components/ui/card';
import { PropertyStats } from '../components/dashboard/property-stats';
import { Suspense } from 'react';

export default function PropertyStatsPage() {
    return (
        <Suspense fallback={<PropertyStatsLoading />}>
            <PropertyStats />
        </Suspense>
    );
}

function PropertyStatsLoading() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Property Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="animate-pulse h-4 bg-muted rounded w-3/4" />
                    <div className="animate-pulse h-4 bg-muted rounded w-1/2" />
                </div>
            </CardContent>
        </Card>
    );
} 