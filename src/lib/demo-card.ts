export const DEMO_CARD = {
  recipientName: "Shreya",
  senderName: "Your friends",
  musicUrl: null as string | null,
  pinHint: "Guess the date we never forget (DD/MM)",
  locked: true,
  pin: "0101",
  message:
    "It's been an amazing year knowing you. Here's to more laughter, more memories, and more birthdays together.",
  media: [
    {
      id: "p1",
      storagePath: "https://picsum.photos/seed/bday-photo-1/500",
      mediaType: "image" as const,
      caption: "The day we met",
    },
    {
      id: "p2",
      storagePath: "https://picsum.photos/seed/bday-photo-2/500",
      mediaType: "image" as const,
      caption: "That road trip",
    },
    {
      id: "p3",
      storagePath: "https://picsum.photos/seed/bday-photo-3/500",
      mediaType: "image" as const,
      caption: "Your birthday last year",
    },
    {
      id: "p4",
      storagePath: "https://picsum.photos/seed/bday-photo-4/500",
      mediaType: "image" as const,
      caption: "",
    },
    {
      id: "p5",
      storagePath: "https://picsum.photos/seed/bday-photo-5/500",
      mediaType: "image" as const,
      caption: "Late night talks",
    },
    {
      id: "p6",
      storagePath: "https://picsum.photos/seed/bday-photo-6/500",
      mediaType: "image" as const,
      caption: "",
    },
    {
      id: "v1",
      storagePath: "",
      mediaType: "video" as const,
      poster: "https://picsum.photos/seed/bday-video-1/500",
    },
    {
      id: "v2",
      storagePath: "",
      mediaType: "video" as const,
      poster: "https://picsum.photos/seed/bday-video-2/500",
    },
  ],
  timeline: [
    { date: "2019", title: "How we met", description: "A chance encounter that turned into a lifelong friendship." },
    { date: "2021", title: "That road trip", description: "Three days, one playlist, and way too many snacks." },
    { date: "2023", title: "The tough year", description: "You were there for me when it mattered most." },
    { date: "2026", title: "Today", description: "Celebrating another year of you." },
  ],
  reasons: [
    "You always know exactly what to say.",
    "Your laugh is contagious, even over the phone.",
    "You remember the little things that matter to me.",
    "You show up, every single time.",
    "You make ordinary days feel like an adventure.",
  ],
  loveLetter:
    "Dear Shreya,\n\nI don't say this enough, but you mean the world to me. Thank you for every late-night call, every silly memory, and every time you believed in me before I believed in myself.\n\nHere's to celebrating you today, and every day after.\n\nWith love,\nYour friends",
  finalMessage: "This is just the beginning of an amazing new year for you. We love you so much!",
};
