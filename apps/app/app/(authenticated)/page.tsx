import React from 'react';
import type { Metadata } from 'next';
import { QuickActions } from './components/dashboard/quick-actions';

export const metadata: Metadata = {
  title: 'Dashboard - Acme Inc',
  description: 'Real estate management dashboard.',
};

export default function DashboardPage() {
  return (
    <main>
      <QuickActions />
    </main>
  );
}
