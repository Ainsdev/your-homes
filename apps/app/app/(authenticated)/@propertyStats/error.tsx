'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';

export default function PropertyStatsError({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Something went wrong!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Failed to load property stats
                </p>
                <Button onClick={() => reset()}>Try again</Button>
            </CardContent>
        </Card>
    );
} 