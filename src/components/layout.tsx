import type React from "react";
import Link from "next/link";
import { Code } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { BackButton } from "@/components/back-button";

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  backButtonFallback?: string;
}

export function Layout({
  children,
  showBackButton = false,
  backButtonFallback = "/you",
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Link href="/" className="flex items-center gap-2">
              <Code className="h-6 w-6 text-green-600" />
              <span>CodeLeaf</span>
            </Link>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {showBackButton && (
          <div className="container py-4 mx-auto">
            <BackButton fallbackHref={backButtonFallback} />
          </div>
        )}
        {children}
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col gap-4 mx-auto md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2025 CodeLeaf. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
