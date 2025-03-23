import { AnalyticsProvider } from '@repo/analytics';
import { AuthProvider } from '@repo/auth/provider';
import type { ThemeProviderProps } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type DesignSystemProviderProperties = ThemeProviderProps & {
  children: React.ReactNode;
};

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>
      <AnalyticsProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AnalyticsProvider>
    </AuthProvider>
  </ThemeProvider>
);

export { DragDropContext, Droppable, Draggable, DotsHorizontalIcon, PlusIcon, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis }