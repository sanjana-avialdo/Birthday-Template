import { CardExperience } from "@/components/card/CardExperience";

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <CardExperience slug={slug} />;
}
