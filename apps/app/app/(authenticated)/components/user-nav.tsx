'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@repo/design-system/components/ui/dropdown-menu';
import { useClerk, useOrganization, useOrganizationList, useUser } from '@repo/auth/client';

export function UserNav() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut, openUserProfile, openCreateOrganization, openOrganizationProfile } = useClerk();
    const { organization, isLoaded: orgIsLoaded } = useOrganization();
    const { isLoaded: orgListLoaded } = useOrganizationList();

    // Don't render anything while loading
    if (!isLoaded || !orgIsLoaded || !orgListLoaded) {
        return (
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                    <AvatarFallback>...</AvatarFallback>
                </Avatar>
            </Button>
        );
    }

    // Check both isSignedIn and user existence
    if (isSignedIn && user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                        <Avatar className='h-8 w-8'>
                            <AvatarImage
                                src={user.imageUrl ?? ''}
                                alt={user.fullName ?? ''}
                            />
                            <AvatarFallback>{user.fullName?.[0] ?? 'U'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end' forceMount>
                    <DropdownMenuLabel className='font-normal'>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-sm font-medium leading-none'>
                                {user.fullName}
                            </p>
                            <p className='text-xs leading-none text-muted-foreground'>
                                {user.primaryEmailAddress?.emailAddress}
                            </p>
                            {organization && (
                                <p className='text-xs leading-none text-muted-foreground mt-1'>
                                    Organization: {organization.name}
                                </p>
                            )}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => openUserProfile()}>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                        {!organization && (
                            <DropdownMenuItem onClick={() => openCreateOrganization()}>
                                Create Organization
                            </DropdownMenuItem>
                        )}
                        {organization && (
                            <DropdownMenuItem onClick={() => openOrganizationProfile()}>
                                Organization Settings
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return null;
}
