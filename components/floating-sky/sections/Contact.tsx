import Reveal from "../motion/Reveal";
import LanternRow from "./LanternRow";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      id="horizon"
      aria-labelledby="horizon-heading"
      data-screen-label="Horizon"
      className="relative z-2 min-h-screen flex flex-col items-center justify-center pt-30 px-[6vw] pb-30"
    >
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[120%] h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,var(--sunset),transparent_68%)] pointer-events-none z-0" />

      <LanternRow />

      <div className="relative z-3 w-full max-w-230 flex flex-wrap items-center gap-12.5 justify-center">
        <Reveal custom={0} className="flex-[1_1_320px] min-w-70">
          <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-(--ink-soft)">
            the sunset island
          </p>
          <h2
            id="horizon-heading"
            className="mb-5 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(36px,5vw,60px)] leading-[1.03] tracking-[-0.5px] text-(--ink) text-balance"
          >
            Let&apos;s build something <em className="italic">gentle</em>{" "}
            together.
          </h2>
          <p className="mb-6 max-w-100 text-[16.5px] leading-[1.75] text-(--ink-soft) text-pretty">
            The lanterns are lit and the kettle&apos;s on. If you&apos;ve got an
            idea worth drifting toward, leave a note — I read every one.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:hello@bagaskara.dev"
              className="inline-flex items-center gap-2 py-2.75 px-4.5 rounded-full no-underline text-sm font-semibold text-(--ink) bg-(--glass) border border-(--glass-brd) backdrop-blur-[10px]"
            >
              ✦ hello@bagaskara.dev
            </a>
            <a
              href="https://github.com/bagasfai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.75 px-4.5 rounded-full no-underline text-sm font-semibold text-(--ink) bg-(--glass) border border-(--glass-brd) backdrop-blur-[10px]"
            >
              GitHub
            </a>
          </div>
        </Reveal>

        <Reveal custom={1} className="flex-[1_1_340px] min-w-75">
          <div className="animate-[towerFloat_9s_ease-in-out_infinite]">
            <div className="pt-7 px-7 pb-6.5 rounded-[30px] bg-(--glass) border border-(--glass-brd) backdrop-blur-[20px] backdrop-saturate-[1.3] shadow-[0_30px_64px_rgba(110,100,180,0.28),inset_0_1px_0_rgba(255,255,255,0.6)] overflow-hidden">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
