import { useId } from "react";

interface BalloonProps {
  colorFrom: string;
  colorTo: string;
  size?: number;
  className?: string;
}

export function Balloon({ colorFrom, colorTo, size = 100, className }: BalloonProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 100 160"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradientId} cx="32%" cy="26%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor={colorFrom} />
          <stop offset="100%" stopColor={colorTo} />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="52" rx="40" ry="48" fill={`url(#${gradientId})`} />
      <path d="M50 98 L44 108 L56 108 Z" fill={colorTo} />
      <path
        d="M50 108 C 62 118 40 130 52 142"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
