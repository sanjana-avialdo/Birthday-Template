export interface CreateStep {
  slug: string;
  label: string;
  description: string;
}

export const CREATE_STEPS: CreateStep[] = [
  { slug: "names", label: "Names", description: "Who is this card for, and from whom?" },
  { slug: "message", label: "Message", description: "Write the birthday message." },
  { slug: "photos", label: "Photos", description: "Upload photos and videos to feature." },
  { slug: "music", label: "Music", description: "Pick a song to play in the background." },
  { slug: "wishes", label: "Wishes", description: "Invite others to leave a wish." },
  { slug: "review", label: "Review", description: "Preview and share the finished card." },
];
