"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  fallbackHref?: string;
}

export function BackButton({ fallbackHref = "/you" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, go to fallback URL
      router.push(fallbackHref);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1">
      <ChevronLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  );
}
