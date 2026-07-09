import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface MediaBody {
  storagePath?: string;
  mediaType?: string;
  position?: number;
  caption?: string;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const { cardId } = await params;
  const { storagePath, mediaType, position, caption } = (await request.json()) as MediaBody;

  if (!storagePath || (mediaType !== "image" && mediaType !== "video")) {
    return NextResponse.json({ error: "storagePath and a valid mediaType are required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("card_media").insert({
    card_id: cardId,
    storage_path: storagePath,
    media_type: mediaType,
    position: position ?? 0,
    caption: caption?.trim() || null,
  });

  if (error) {
    console.error("Failed to insert card_media row:", error);
    return NextResponse.json({ error: "Failed to save media" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
