import Reveal from "../motion/Reveal";
import PaperDrift from "./PaperDrift";
import { getArticles } from "@/content/articles";

export default function Blog() {
  const articles = getArticles();

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      data-screen-label="Journal"
      className="relative z-2 min-h-screen flex flex-col items-center justify-center pt-32.5 px-[6vw] pb-35"
    >
      <PaperDrift />

      <Reveal className="text-center max-w-165 mb-13">
        <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-(--ink-soft)">
          the floating library
        </p>
        <h2
          id="journal-heading"
          className="mb-4 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(34px,4.8vw,56px)] leading-[1.05] tracking-[-0.4px] text-(--ink) text-balance"
        >
          Words I&apos;ve left on the <em className="italic">shelves.</em>
        </h2>
        <p className="mx-auto max-w-115 text-base leading-[1.7] text-(--ink-soft) text-pretty">
          A quiet reading room in the sky. Notes on building calm software, and
          the small things I learn along the way.
        </p>
      </Reveal>

      <div className="relative w-full max-w-250">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6.5">
          {articles.map((a, i) => (
            <Reveal
              key={a.title}
              custom={i}
              as="article"
              className="journal-card block rounded-3xl overflow-hidden bg-(--glass) border border-(--glass-brd) backdrop-blur-lg backdrop-saturate-[1.2] shadow-[0_20px_44px_rgba(110,100,180,0.2),inset_0_1px_0_rgba(255,255,255,0.55)]"
            >
              <div
                style={
                  {
                    "--banner-bg": `linear-gradient(150deg,${a.c1},${a.c2})`,
                  } as React.CSSProperties
                }
                className="relative h-30 overflow-hidden bg-(image:--banner-bg)"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.4),transparent_55%)]" />
                <span className="absolute left-4 bottom-3 font-[family-name:var(--font-instrument-serif),serif] text-[34px] text-white opacity-90">
                  {a.glyph}
                </span>
                <span className="absolute top-3 right-3.5 py-1 px-2.5 rounded-full text-[10.5px] font-bold tracking-[0.4px] text-white bg-white/22 border border-white/40 backdrop-blur-[6px]">
                  {a.topic}
                </span>
              </div>
              <div className="pt-4.75 px-5.25 pb-5.25">
                <div className="flex items-center gap-2 mb-2.25 text-[11.5px] font-semibold text-(--ink-soft) opacity-80">
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>{a.read}</span>
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-instrument-serif),serif] font-normal text-[21px] leading-[1.2] text-(--ink)">
                  {a.title}
                </h3>
                <p className="mb-3.5 text-[13.5px] leading-[1.6] text-(--ink-soft) text-pretty">
                  {a.excerpt}
                </p>
                <span
                  style={{ "--read-color": a.c2 } as React.CSSProperties}
                  className="text-[13px] font-bold text-(--read-color)"
                >
                  Read →
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
