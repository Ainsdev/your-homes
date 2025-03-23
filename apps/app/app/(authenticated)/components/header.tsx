import { Separator } from '@repo/design-system/components/ui/separator';
import { SidebarTrigger } from '@repo/design-system/components/ui/sidebar';
import React from 'react';
import { UserNav } from './user-nav';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import { NotificationsTrigger } from '@repo/notifications/components/trigger';
import SearchInput from './kbar/search-input';
import { Breadcrumb } from '@repo/design-system/components/ui/breadcrumb';

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNav />
        <div className="flex shrink-0 items-center gap-px">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            asChild
          >
            <div className="h-4 w-4">
              <NotificationsTrigger />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
