import Reveal from "../motion/Reveal";
import PathFill from "./PathFill";
import PathTrail from "./PathTrail";
import { getSteps } from "@/content/steps";

export default function Path() {
  const steps = getSteps();

  return (
    <section
      id="my-journey"
      aria-labelledby="journey-heading"
      data-screen-label="My Journey"
      className="relative z-2 min-h-screen flex flex-col items-center pt-32.5 px-[6vw] pb-37.5"
    >
      <Reveal className="text-center max-w-165 mb-17.5">
        <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-(--ink-soft)">
          the path through time
        </p>
        <h2
          id="journey-heading"
          className="mb-4 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(34px,4.8vw,56px)] leading-[1.05] tracking-[-0.4px] text-(--ink) text-balance"
        >
          Stones I&apos;ve <em className="italic">stepped</em> across.
        </h2>
        <p className="mx-auto max-w-115 text-base leading-[1.7] text-(--ink-soft) text-pretty">
          Each stone is a chapter, suspended in the sky. As you drift downward,
          the ones behind you light up — the trail you&apos;ve already walked.
        </p>
      </Reveal>

      <PathFill>
        <PathTrail>
          {steps.map((s, index) => (
            <div
              key={s.role}
              data-step={s.i}
              style={{ "--step-justify": s.justify } as React.CSSProperties}
              className="relative flex items-center [justify-content:var(--step-justify)] min-h-37.5 mb-6.5"
            >
              <div className="step-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-4">
                <div
                  data-step-stone
                  style={
                    {
                      "--stone-anim": `stoneFloat ${s.float} ease-in-out ${s.delay} infinite`,
                    } as React.CSSProperties
                  }
                  className="relative w-14 h-14 animate-(--stone-anim)"
                >
                  <div className="step-halo absolute inset-[-40%] rounded-full bg-[radial-gradient(circle,#c9a6ff,transparent_66%)] animate-[haloPulse_3.5s_ease-in-out_infinite] pointer-events-none" />
                  <div className="step-stone absolute inset-0 rounded-full border-[1.5px] border-(--glass-brd) backdrop-blur-[10px] flex items-center justify-center text-[19px]">
                    {s.glyph}
                  </div>
                </div>
              </div>

              <Reveal
                custom={index}
                className="step-card w-[calc(50%-60px)] py-5.5 px-6 rounded-3xl bg-(--glass) border border-(--glass-brd) backdrop-blur-lg backdrop-saturate-[1.2] shadow-[0_22px_48px_rgba(110,100,180,0.22),inset_0_1px_0_rgba(255,255,255,0.55)]"
              >
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span
                    style={{ "--accent": s.accent } as React.CSSProperties}
                    className="text-xs font-bold tracking-[0.6px] text-(--accent)"
                  >
                    {s.period}
                  </span>
                  <span className="text-[11.5px] font-semibold text-(--ink-soft) opacity-80">
                    {s.place}
                  </span>
                </div>
                <h3 className="mb-1 font-[family-name:var(--font-instrument-serif),serif] font-normal text-[23px] text-(--ink)">
                  {s.role}
                </h3>
                <p className="mb-3.5 text-sm leading-[1.6] text-(--ink-soft) text-pretty">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.75">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="py-1.25 px-2.75 rounded-full text-[11px] font-bold text-(--ink) bg-(--glass-brd) border border-(--glass-brd)"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </PathTrail>
      </PathFill>
    </section>
  );
}
