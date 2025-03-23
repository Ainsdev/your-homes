import { env } from '@/env';
import { auth, currentUser } from '@repo/auth/server';
import { SidebarInset, SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { showBetaFeature } from '@repo/feature-flags';
import { NotificationsProvider } from '@repo/notifications/components/provider';
import { secure } from '@repo/security';
import type { ReactNode } from 'react';
import { PostHogIdentifier } from './components/posthog-identifier';
import KBar from './components/kbar';
import AppSidebar from './components/app-sidebar';
import Header from './components/header';
import { Toaster } from "@repo/design-system/components/ui/toaster"  // Update this import

type AppLayoutProperties = {
  children: ReactNode;
  propertyStats: ReactNode;
  salesChart: ReactNode;
  upcomingTasks: ReactNode;
  recentProperties: ReactNode;
  recentClients: ReactNode;
};

const AppLayout = async ({
  children,
  propertyStats,
  salesChart,
  upcomingTasks,
  recentProperties,
  recentClients
}: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  const betaFeature = await showBetaFeature();

  if (!user) {
    return redirectToSignIn();
  }

  return (
    <NotificationsProvider userId={user.id}>
      <KBar>
        <SidebarProvider>
          {betaFeature && (
            <div className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
              Beta feature now available
            </div>
          )}
          <AppSidebar />
          <SidebarInset className="p-0">
            <Header />
            <div className="flex flex-col gap-4 md:gap-8 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              {children}
              {propertyStats}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {salesChart}
                {upcomingTasks}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {recentProperties}
                {recentClients}
              </div>

            </div>
          </SidebarInset>
          <PostHogIdentifier />
        </SidebarProvider>
      </KBar>
      <Toaster />
    </NotificationsProvider>
  );
};

export default AppLayout;
