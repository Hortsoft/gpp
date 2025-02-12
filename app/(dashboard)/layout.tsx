'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CircleIcon, Home, LogOut, Flower } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userPromise } = useUser();
  const user = use(userPromise);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Flower className="h-6 w-6 text-green-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">Garden Projects</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Pricing
          </Link>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  Ideas
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col gap-1">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/option1" className="flex w-full items-center">
                      <span>Option 1</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/option2" className="flex w-full items-center">
                      <span>Option 2</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  Projects
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col gap-1">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/option3" className="flex w-full items-center">
                      <span>Option 3</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/option4" className="flex w-full items-center">
                      <span>Option 4</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  Maintenance
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col gap-1">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/option5" className="flex w-full items-center">
                      <span>Option 5</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/option6" className="flex w-full items-center">
                      <span>Option 6</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer size-9">
                    <AvatarImage alt={user.name || ''} />
                    <AvatarFallback>
                      {user.email
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col gap-1">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/dashboard" className="flex w-full items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <form action={handleSignOut} className="w-full">
                    <button type="submit" className="flex w-full">
                      <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>

            </>
          ) : (
            <Button
              asChild
              className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <span className="text-sm text-gray-500">&copy; 2023 Garden Projects. All rights reserved.</span>
        <div className="flex space-x-4">
          <Link href="/about" className="text-sm text-gray-700 hover:text-gray-900">About</Link>
          <Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </section>
  );
}
