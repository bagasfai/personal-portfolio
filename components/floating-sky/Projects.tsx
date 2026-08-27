"use client";

import { useMemo } from "react";
import { m } from "motion/react";
import { revealVariants, revealViewport } from "./motionVariants";
import { getProjects } from "@/content/projects";
import type { Project } from "@/lib/types";

function Tower({ p }: { p: Project }) {
  return (
    <m.div
      className="tower relative [align-self:var(--tower-align)] mt-(--tower-lift)"
      custom={p.i}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      style={
        {
          "--tower-align": p.align,
          "--tower-lift": p.lift,
        } as React.CSSProperties
      }
    >
      <div
        style={
          {
            "--glow-bg": `radial-gradient(closest-side, ${p.glow}, transparent 74%)`,
          } as React.CSSProperties
        }
        className="tower-glow absolute left-1/2 -bottom-6.5 w-[78%] h-15 -translate-x-1/2 rounded-full pointer-events-none blur-xs bg-(image:--glow-bg)"
      />

      <div className="tower-badges absolute inset-0 pointer-events-none z-6">
        {p.badges.map((b) => (
          <div
            key={b.name}
            style={
              {
                "--orbit": b.orbit,
                "--badge-anim": `badgeOrbit ${b.dur} linear ${b.delay} infinite`,
              } as React.CSSProperties
            }
            className="absolute left-1/2 top-1/2 animate-(--badge-anim)"
          >
            <span className="inline-block -translate-x-1/2 -translate-y-1/2 py-1 px-2.5 rounded-full text-[11px] font-bold whitespace-nowrap text-(--ink) bg-(--glass) border border-(--glass-brd) backdrop-blur-sm shadow-[0_6px_16px_rgba(110,100,180,0.2)]">
              {b.name}
            </span>
          </div>
        ))}
      </div>

      <div
        style={
          {
            "--tower-anim": `towerFloat ${p.float} ease-in-out ${p.delay} infinite`,
          } as React.CSSProperties
        }
        className="relative z-4 animate-(--tower-anim)"
      >
        <div className="rounded-t-[26px] rounded-b-[22px] overflow-hidden bg-(--glass) border border-(--glass-brd) backdrop-blur-[18px] backdrop-saturate-[1.25] shadow-[0_26px_54px_rgba(110,100,180,0.26),inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div
            style={
              {
                "--header-bg": `linear-gradient(150deg, ${p.c1}, ${p.c2})`,
              } as React.CSSProperties
            }
            className="relative h-37.5 flex items-center justify-center overflow-hidden bg-(image:--header-bg)"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.45),transparent_55%)]" />
            <span className="font-[family-name:var(--font-instrument-serif),serif] text-[44px] text-white opacity-90 [text-shadow:0_3px_12px_rgba(0,0,0,0.15)]">
              {p.glyph}
            </span>
            <span className="absolute top-3 left-3.5 py-1 px-2.75 rounded-full text-[10.5px] font-bold tracking-[0.5px] text-white bg-white/22 border border-white/40 backdrop-blur-[6px]">
              {p.tag}
            </span>
            <span className="absolute top-3 right-3.5 text-[11px] font-semibold text-white opacity-85">
              {p.year}
            </span>
          </div>
          <div className="pt-5 px-5.5 pb-5.5">
            <h3 className="mb-2 font-[family-name:var(--font-instrument-serif),serif] font-normal text-2xl text-(--ink)">
              {p.name}
            </h3>
            <p className="mb-4.5 text-sm leading-[1.6] text-(--ink-soft) min-h-16.5 text-pretty">
              {p.desc}
            </p>
            <div className="tower-links flex gap-2.5">
              {p.demoLink && (
                <a
                  href={p.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={
                    {
                      "--live-bg": `linear-gradient(135deg,${p.c1},${p.c2})`,
                      "--live-shadow": `0 8px 20px ${p.glow}`,
                    } as React.CSSProperties
                  }
                  className="flex-1 text-center py-2.5 px-3.5 rounded-full no-underline text-[13px] font-bold text-white bg-(image:--live-bg) shadow-(--live-shadow)"
                >
                  Live demo
                </a>
              )}
              {p.githubLink && (
                <a
                  href={p.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none py-2.5 px-4 rounded-full no-underline text-[13px] font-bold text-(--ink) bg-(--glass-brd) border border-(--glass-brd)"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="relative h-11 -mt-0.5">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[64%] h-10 bg-[linear-gradient(180deg,var(--rock1),var(--rock2))] [clip-path:polygon(4%_0,96%_0,78%_52%,50%_100%,22%_52%)] rounded-t-[30%]" />
          <div className="absolute left-1/2 -top-1.25 -translate-x-1/2 w-[74%] h-4 rounded-full bg-[linear-gradient(180deg,var(--grass1),var(--grass2))]" />
        </div>
      </div>
    </m.div>
  );
}

export default function Projects() {
  const projects = useMemo(() => getProjects(), []);

  return (
    <section
      id="creations"
      aria-labelledby="creations-heading"
      data-screen-label="Creations"
      className="relative z-2 min-h-screen flex flex-col items-center justify-center pt-30 px-[6vw] pb-37.5"
    >
      <m.div
        variants={revealVariants}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="text-center max-w-165 mb-14"
      >
        <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-(--ink-soft)">
          the floating city
        </p>
        <h2 id="creations-heading" className="mb-4 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(34px,4.8vw,56px)] leading-[1.05] tracking-[-0.4px] text-(--ink) text-balance">
          A skyline of things I&apos;ve <em className="italic">built.</em>
        </h2>
        <p className="mx-auto max-w-115 text-base leading-[1.7] text-(--ink-soft) text-pretty">
          Every tower is a project, moored to its own scrap of land. Hover to
          raise one into the light and see it up close.
        </p>
      </m.div>

      <div
        id="city"
        className="relative w-full max-w-280 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-8.5 gap-y-7.5 items-end"
      >
        {projects.map((p) => (
          <Tower key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}
