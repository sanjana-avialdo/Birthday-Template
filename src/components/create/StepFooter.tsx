import Link from "next/link";
import { CREATE_STEPS } from "@/lib/steps";

export function StepFooter({ currentSlug }: { currentSlug: string }) {
  const index = CREATE_STEPS.findIndex((step) => step.slug === currentSlug);
  const prev = CREATE_STEPS[index - 1];
  const next = CREATE_STEPS[index + 1];

  return (
    <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6 dark:border-white/15">
      {prev ? (
        <Link href={`/create/${prev.slug}`} className="text-sm underline underline-offset-4">
          Back to {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/create/${next.slug}`}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
        >
          Continue to {next.label}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
