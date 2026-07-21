"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { revealVariants, revealViewport } from "./motionVariants";
import { createLibraryDecor, getArticles } from "./data";

export default function Blog() {
  const papers = useMemo(() => createLibraryDecor().papers, []);
  const articles = useMemo(() => getArticles(), []);

  return (
    <section
      id="journal"
      data-screen-label="Journal"
      className="relative z-2 min-h-screen flex flex-col items-center justify-center pt-32.5 px-[6vw] pb-35"
    >
      {papers.map((pp, i) => (
        <div
          key={i}
          style={
            {
              "--paper-left": pp.left,
              "--paper-top": pp.top,
              "--paper-w": pp.w,
              "--paper-h": pp.h,
              "--paper-anim": `paperDrift ${pp.dur} ease-in-out ${pp.delay} infinite`,
            } as React.CSSProperties
          }
          className="absolute left-[var(--paper-left)] top-[var(--paper-top)] w-[var(--paper-w)] h-[var(--paper-h)] rounded-[3px] bg-[linear-gradient(160deg,#ffffff,#f2eefc)] shadow-[0_8px_20px_rgba(110,100,180,0.16)] opacity-70 [animation:var(--paper-anim)] pointer-events-none"
        />
      ))}

      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="text-center max-w-[660px] mb-13"
      >
        <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-[var(--ink-soft)]">the floating library</p>
        <h2
          className="mb-4 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(34px,4.8vw,56px)] leading-[1.05] tracking-[-0.4px] text-[var(--ink)] text-balance"
        >
          Words I&apos;ve left on the <em className="italic">shelves.</em>
        </h2>
        <p className="mx-auto max-w-[460px] text-base leading-[1.7] text-[var(--ink-soft)] text-pretty">
          A quiet reading room in the sky. Notes on building calm software, and the small things I learn along the way.
        </p>
      </motion.div>

      <div className="relative w-full max-w-[1000px]">
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] gap-6.5">
          {articles.map((a, i) => (
            <motion.a
              key={a.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              custom={i}
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              whileHover={{ y: -6, boxShadow: "0 30px 60px rgba(110,100,180,.3)" }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="no-underline block rounded-3xl overflow-hidden bg-[var(--glass)] border border-[var(--glass-brd)] backdrop-blur-[16px] backdrop-saturate-[1.2] shadow-[0_20px_44px_rgba(110,100,180,0.2),inset_0_1px_0_rgba(255,255,255,0.55)]"
            >
              <div
                style={{ "--banner-bg": `linear-gradient(150deg,${a.c1},${a.c2})` } as React.CSSProperties}
                className="relative h-[120px] overflow-hidden bg-[image:var(--banner-bg)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.4),transparent_55%)]" />
                <span className="absolute left-4 bottom-3 font-[family-name:var(--font-instrument-serif),serif] text-[34px] text-white opacity-90">{a.glyph}</span>
                <span className="absolute top-3 right-3.5 py-1 px-2.5 rounded-full text-[10.5px] font-bold tracking-[0.4px] text-white bg-white/22 border border-white/40 backdrop-blur-[6px]">
                  {a.topic}
                </span>
              </div>
              <div className="pt-[19px] px-[21px] pb-[21px]">
                <div className="flex items-center gap-2 mb-2.25 text-[11.5px] font-semibold text-[var(--ink-soft)] opacity-80">
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>{a.read}</span>
                </div>
                <h3 className="mb-2 font-[family-name:var(--font-instrument-serif),serif] font-normal text-[21px] leading-[1.2] text-[var(--ink)]">{a.title}</h3>
                <p className="mb-3.5 text-[13.5px] leading-[1.6] text-[var(--ink-soft)] text-pretty">
                  {a.excerpt}
                </p>
                <span style={{ "--read-color": a.c2 } as React.CSSProperties} className="text-[13px] font-bold text-[color:var(--read-color)]">
                  Read →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
