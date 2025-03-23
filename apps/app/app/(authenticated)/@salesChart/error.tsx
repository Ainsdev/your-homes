'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';

export default function SalesChartError({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Something went wrong!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Failed to load sales data
                </p>
                <Button onClick={() => reset()}>Try again</Button>
            </CardContent>
        </Card>
    );
} 