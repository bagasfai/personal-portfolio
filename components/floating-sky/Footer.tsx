import { FULL_NAME } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative z-2 text-center px-[7vw] pt-5 pb-17.5">
      <p className="mx-auto max-w-110 text-[14.5px] leading-[1.7] text-(--ink-soft)">
        You&apos;ve drifted the whole sky —{" "}
        <em className="italic font-[family-name:var(--font-instrument-serif),serif] text-[17px]">
          thank you for wandering
        </em>{" "}
        through it with me. <span className="opacity-70">✦</span>
      </p>
      <p className="mt-4 font-[family-name:var(--font-caveat),cursive] text-xl text-(--ink-soft)">
        — {FULL_NAME}
      </p>
    </footer>
  );
}
