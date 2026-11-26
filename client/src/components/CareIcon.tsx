import type { SVGProps } from "react";

export type CareIconName =
  | "care"
  | "calendar"
  | "specialties"
  | "services"
  | "location"
  | "phone"
  | "help"
  | "message"
  | "heart"
  | "child"
  | "skin";

type CareIconProps = SVGProps<SVGSVGElement> & {
  name: CareIconName;
  size?: number;
};

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CareIcon({ name, size = 24, ...props }: CareIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      {...common}
      {...props}
    >
      {name === "care" && (
        <>
          <path d="M9 30.5 18.4 12c1.3-2.7 5.2-2.7 6.5 0L34 30.5" />
          <path d="M13.5 23.5h21" />
          <circle cx="24" cy="31.5" r="3.4" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "calendar" && (
        <>
          <rect x="9" y="11" width="30" height="27" rx="4" />
          <path d="M15 8v7M33 8v7M9 19h30" />
          <path d="M17 26h5M26 26h5M17 32h5" />
        </>
      )}
      {name === "specialties" && (
        <>
          <circle cx="24" cy="14" r="5" />
          <path d="M14 35c.9-6.1 4.2-9 10-9s9.1 2.9 10 9" />
          <path d="M10 20h7M31 20h7" />
        </>
      )}
      {name === "services" && (
        <>
          <path d="M14 8h16l5 5v27H14z" />
          <path d="M30 8v7h7M19 22h11M19 28h11M19 34h7" />
        </>
      )}
      {name === "location" && (
        <>
          <path d="M24 39s11-10.2 11-20a11 11 0 1 0-22 0c0 9.8 11 20 11 20Z" />
          <circle cx="24" cy="19" r="3.5" />
        </>
      )}
      {name === "phone" && (
        <>
          <path d="M17 10.5 21 9l3.2 7-3.5 2.2c1.7 3.5 4.1 6 7.5 7.6l2.1-3.4 7 3.2-1.5 4c-.8 2.1-2.8 3.4-5 3.1C21.1 31.3 16.7 26.9 15.1 17c-.4-2.2.1-4.9 1.9-6.5Z" />
        </>
      )}
      {name === "help" && (
        <>
          <circle cx="24" cy="24" r="15" />
          <path d="M19.7 19.5a4.6 4.6 0 1 1 7 4c-1.7 1-2.7 1.7-2.7 4" />
          <circle cx="24" cy="32.5" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "message" && (
        <>
          <path d="M10 12.5a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H23l-7 5v-5h-2a4 4 0 0 1-4-4Z" />
          <path d="M17 17h14M17 22h9" />
        </>
      )}
      {name === "heart" && (
        <>
          <path d="M24 36S10 28.3 10 18.6A7 7 0 0 1 23 15a7 7 0 0 1 13 3.6C36 28.3 24 36 24 36Z" />
          <path d="M18 22h3l2-4 3 8 2-4h2" />
        </>
      )}
      {name === "child" && (
        <>
          <circle cx="24" cy="13" r="4" />
          <path d="M18 36c.7-7 2.7-11 6-11s5.3 4 6 11M14 22l5 3M34 22l-5 3" />
          <path d="M20 19h8" />
        </>
      )}
      {name === "skin" && (
        <>
          <path d="M13 32c0-7 3-12 7-15 2-1.5 3.2-4.5 4-7 .4-1.4 2.3-1.5 2.8-.1.8 2.1.9 4.5.4 6.6 2.9 1.9 5.8 4.8 7.8 8.5" />
          <path d="M15 36h20" />
          <circle cx="20" cy="23" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="28" cy="25" r="1.1" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
