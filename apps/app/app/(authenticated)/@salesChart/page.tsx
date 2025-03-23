import { Card, CardHeader, CardTitle, CardContent } from '@repo/design-system/components/ui/card';
import { SalesChart } from '../components/dashboard/sales-chart';
import { Suspense } from 'react';

export default function SalesChartPage() {
    return (
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Sales</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <Suspense fallback={<SalesChartLoading />}>
                    <SalesChart />
                </Suspense>
            </CardContent>
        </Card>
    );
}

function SalesChartLoading() {
    return (
        <div className="h-[350px] flex items-center justify-center">
            <div className="space-y-4 w-full">
                <div className="animate-pulse h-4 bg-muted rounded w-full" />
                <div className="animate-pulse h-4 bg-muted rounded w-3/4" />
                <div className="animate-pulse h-4 bg-muted rounded w-1/2" />
            </div>
        </div>
    );
} 