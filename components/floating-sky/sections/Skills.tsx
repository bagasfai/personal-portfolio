import Reveal from "../motion/Reveal";
import CrystalField from "./CrystalField";
import { getCrystals } from "@/content/crystals";

export default function Skills() {
  const crystals = getCrystals();

  return (
    <section
      id="workshop"
      aria-labelledby="workshop-heading"
      data-screen-label="Workshop"
      className="relative z-2 min-h-screen flex flex-col items-center justify-center pt-30 px-[6vw] pb-32.5"
    >
      <Reveal className="text-center max-w-160 mb-8">
        <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-(--ink-soft)">
          the workshop
        </p>
        <h2
          id="workshop-heading"
          className="mb-4 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(34px,4.8vw,56px)] leading-[1.05] tracking-[-0.4px] text-(--ink) text-balance"
        >
          Tools I&apos;ve shaped into <em className="italic">stones.</em>
        </h2>
        <p className="mx-auto max-w-110 text-base leading-[1.7] text-(--ink-soft) text-pretty">
          Each crystal holds a craft. Drift your cursor near — they&apos;ll shy
          away — and rest on one to hear its story.
        </p>
      </Reveal>

      <div className="relative w-full max-w-250 min-h-140 mt-5 flex items-center justify-center">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-85 h-37.5 animate-[anvilFloat_9s_ease-in-out_infinite] pointer-events-none">
          <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-70 h-11 rounded-full bg-[radial-gradient(closest-side,var(--shadow),transparent_76%)] blur-[6px]" />
          <div className="absolute left-1/2 top-11 -translate-x-1/2 w-46 h-25 bg-[linear-gradient(180deg,var(--rock1),var(--rock2))] [clip-path:polygon(5%_0,95%_0,80%_44%,60%_78%,50%_100%,40%_78%,20%_44%)] rounded-t-[40%]" />
          <div className="absolute left-1/2 top-6.5 -translate-x-1/2 w-59.5 h-14 rounded-full bg-[linear-gradient(180deg,var(--grass1),var(--grass2))] shadow-[inset_0_6px_14px_rgba(255,255,255,0.4),inset_0_-8px_14px_rgba(60,120,80,0.2)]" />
        </div>

        {/* One server-rendered node per crystal, in getCrystals() order. CrystalField
            positions them and drives the repel; everything inside is plain markup. */}
        <CrystalField>
          {crystals.map((k) => (
            // A real button rather than a div with tabIndex: this is the control that
            // reveals the crystal's tooltip, so it should be focusable for the same
            // reason it is hoverable, and announce itself as something you can act on.
            <button
              key={k.name}
              type="button"
              aria-describedby={`crystal-tip-${k.i}`}
              style={
                {
                  "--k-bob-anim": `floatC ${k.bob} ease-in-out ${k.delay} infinite`,
                } as React.CSSProperties
              }
              className="block relative w-full h-full p-0 border-0 bg-transparent text-left cursor-default transform-3d animate-(--k-bob-anim)"
            >
              <div
                style={
                  {
                    "--k-glow-bg": `radial-gradient(circle, ${k.glow}, transparent 68%)`,
                    "--k-glow-anim": `shimmer ${k.bob} ease-in-out infinite`,
                  } as React.CSSProperties
                }
                className="absolute inset-[-30%] rounded-full opacity-50 blur-[6px] bg-(image:--k-glow-bg) animate-(--k-glow-anim)"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  style={
                    {
                      "--k-spin-anim": `spinY ${k.spin} linear infinite`,
                    } as React.CSSProperties
                  }
                  className="crystal-gem w-[70%] h-[70%] transform-3d animate-(--k-spin-anim)"
                >
                  <div
                    style={
                      {
                        "--k-gem-bg": `linear-gradient(150deg, ${k.c1}, ${k.c2})`,
                      } as React.CSSProperties
                    }
                    className="w-full h-full bg-(image:--k-gem-bg) [clip-path:polygon(50%_0,100%_34%,82%_100%,18%_100%,0_34%)] shadow-[inset_0_3px_10px_rgba(255,255,255,0.7),inset_0_-8px_14px_rgba(0,0,0,0.16)] rounded-md"
                  />
                </div>
              </div>

              <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 py-1 px-2.75 rounded-full text-[11.5px] font-bold tracking-[0.2px] whitespace-nowrap text-(--ink) bg-(--glass) border border-(--glass-brd)">
                {k.name}
              </div>

              <div
                id={`crystal-tip-${k.i}`}
                className="crystal-tip absolute left-1/2 bottom-[calc(100%+14px)] w-53 py-3.75 px-4.25 rounded-[20px] bg-(--glass) border border-(--glass-brd) backdrop-blur-[18px] backdrop-saturate-[1.3] shadow-[0_22px_50px_rgba(110,100,180,0.3)] pointer-events-none z-20">
                <div className="flex items-center justify-between mb-1.75">
                  <span className="font-[family-name:var(--font-instrument-serif),serif] text-xl text-(--ink)">
                    {k.name}
                  </span>
                  <span
                    style={
                      {
                        "--k-years-color": k.c2,
                        "--k-years-bg": k.glow,
                      } as React.CSSProperties
                    }
                    className="text-[11px] font-bold tracking-[0.4px] py-0.75 px-2.25 rounded-full text-(--k-years-color) bg-(--k-years-bg)"
                  >
                    {k.years}
                  </span>
                </div>
                <p className="m-0 text-[13px] leading-[1.55] text-(--ink-soft) text-pretty">
                  {k.desc}
                </p>
              </div>
            </button>
          ))}
        </CrystalField>
      </div>
    </section>
  );
}
