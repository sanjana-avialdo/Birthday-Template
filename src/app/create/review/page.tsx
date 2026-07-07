export default function ReviewStepPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">
        Review everything, then publish to get a shareable link.
      </p>

      <div className="rounded-lg border border-black/10 px-4 py-3 text-sm text-foreground/70 dark:border-white/15">
        A summary of the recipient, message, photos, music, and wishes will appear here before publishing.
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-6 dark:border-white/15">
        <a href="/create/wishes" className="text-sm underline underline-offset-4">
          Back to Wishes
        </a>
        <button
          type="button"
          disabled
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background opacity-50"
        >
          Publish card
        </button>
      </div>
    </div>
  );
}
