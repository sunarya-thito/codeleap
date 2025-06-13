"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Home
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname.startsWith("/dashboard")
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/courses"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname.startsWith("/courses")
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Courses
      </Link>
      <Link
        href="/assessments"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname.startsWith("/assessments")
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Assessments
      </Link>
      <Link
        href="/articles"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname.startsWith("/articles")
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Articles
      </Link>
    </nav>
  );
}
