"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CREATE_STEPS } from "@/lib/steps";

export function StepNav() {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").pop();

  return (
    <ol className="flex flex-wrap gap-2 text-sm">
      {CREATE_STEPS.map((step, index) => {
        const isActive = step.slug === activeSlug;
        return (
          <li key={step.slug}>
            <Link
              href={`/create/${step.slug}`}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 transition-colors ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-black/10 text-foreground/70 hover:border-black/30 dark:border-white/15 dark:hover:border-white/30"
              }`}
            >
              <span className="font-medium">{index + 1}</span>
              {step.label}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
