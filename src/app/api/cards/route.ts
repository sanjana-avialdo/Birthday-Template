import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashPin } from "@/lib/pin";
import { generateSlug } from "@/lib/slug";

const MAX_SLUG_ATTEMPTS = 3;

export async function POST(request: Request) {
  const formData = await request.formData();

  const recipientName = String(formData.get("recipientName") ?? "").trim();
  const senderName = String(formData.get("senderName") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const musicUrl = String(formData.get("musicUrl") ?? "").trim();
  const pin = String(formData.get("pin") ?? "").trim();
  const pinHint = String(formData.get("pinHint") ?? "").trim();
  const files = formData.getAll("media").filter((item): item is File => item instanceof File);

  if (!recipientName || !senderName) {
    return NextResponse.json({ error: "Recipient and sender name are required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const pinHash = pin ? await hashPin(pin) : null;

  let cardId: string | null = null;
  let slug: string | null = null;

  for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS && !cardId; attempt++) {
    const candidateSlug = generateSlug(recipientName);
    const { data, error } = await supabase
      .from("cards")
      .insert({
        slug: candidateSlug,
        recipient_name: recipientName,
        sender_name: senderName,
        message: message || null,
        music_url: musicUrl || null,
        pin_hash: pinHash,
        pin_hint: pinHint || null,
      })
      .select("id, slug")
      .single();

    if (data) {
      cardId = data.id;
      slug = data.slug;
    } else if (error?.code !== "23505") {
      console.error("Failed to insert card:", error);
      return NextResponse.json(
        { error: `Failed to create card: ${error?.message ?? "unknown error"}` },
        { status: 500 },
      );
    }
  }

  if (!cardId || !slug) {
    return NextResponse.json({ error: "Could not generate a unique link, try again" }, { status: 500 });
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const mediaType = file.type.startsWith("video") ? "video" : "image";
    const path = `${cardId}/${i}-${file.name}`;

    const { error: uploadError } = await supabase.storage.from("card-media").upload(path, file, {
      contentType: file.type,
    });

    if (uploadError) {
      console.error("Failed to upload media:", uploadError);
      continue;
    }

    const { data: publicUrl } = supabase.storage.from("card-media").getPublicUrl(path);

    const { error: mediaInsertError } = await supabase.from("card_media").insert({
      card_id: cardId,
      storage_path: publicUrl.publicUrl,
      media_type: mediaType,
      position: i,
    });

    if (mediaInsertError) console.error("Failed to insert card_media row:", mediaInsertError);
  }

  return NextResponse.json({ slug });
}
