import '@repo/design-system/styles/globals.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import type { ReactNode } from 'react';
import { AuthProvider } from '@repo/auth/provider';


type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <AuthProvider>
        <DesignSystemProvider>
          <div>{children}</div>
        </DesignSystemProvider>
      </AuthProvider>
      <Toolbar />
    </body>
  </html>
);

export default RootLayout;
