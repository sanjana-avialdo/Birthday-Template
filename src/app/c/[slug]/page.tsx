import { CardExperience } from "@/components/card/CardExperience";

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-12">
      <CardExperience slug={slug} />
    </div>
  );
}
