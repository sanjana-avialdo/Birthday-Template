import { MediaDropzone } from "@/components/create/MediaDropzone";
import { StepFooter } from "@/components/create/StepFooter";

export default function PhotosStepPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">Upload the photos and videos to feature in the card.</p>

      <MediaDropzone />

      <StepFooter currentSlug="photos" />
    </div>
  );
}
