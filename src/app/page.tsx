import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Make someone&apos;s birthday unforgettable</h1>
      <p className="max-w-md text-foreground/70">
        Create a personalized, unlockable birthday card with photos, videos, music, and wishes from friends.
      </p>
      <Link
        href="/create"
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
      >
        Create a card
      </Link>
    </div>
  );
}
