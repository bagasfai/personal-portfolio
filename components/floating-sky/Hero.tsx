"use client";

import { motion } from "motion/react";
import { useParallax } from "./useParallax";
import { EASE_REVEAL } from "./motionVariants";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.18 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_REVEAL } },
};

const islandVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: EASE_REVEAL } },
};

function AvatarSlot() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[linear-gradient(160deg,#dbe4ff,#f3d9f0)]">
      <span className="font-[family-name:var(--font-instrument-serif),Georgia,serif] italic text-[52px] text-[#7a7fc4]">B</span>
    </div>
  );
}

export default function Hero({ entered }: { entered: boolean }) {
  const island = useParallax(0.7);
  const companion = useParallax(1.7);

  return (
    <section
      id="hero"
      data-screen-label="Hero"
      className="relative z-2 min-h-screen flex items-center justify-center pt-30 px-[7vw] pb-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={entered ? "show" : "hidden"}
        className="w-full max-w-[1180px] flex flex-wrap items-center justify-between gap-12"
      >
        {/* text */}
        <div className="flex-[1_1_380px] min-w-[300px]">
          <motion.div
            variants={textVariants}
            className="inline-flex items-center gap-2.25 py-[7px] px-3.75 rounded-full bg-[var(--glass)] border border-[var(--glass-brd)] backdrop-blur-[12px] text-[12.5px] font-semibold tracking-[0.4px] text-[var(--ink-soft)] mb-6.5"
          >
            <span className="w-[7px] h-[7px] rounded-full bg-[#8fd6a8] shadow-[0_0_8px_#8fd6a8] [animation:twinkle_3s_ease-in-out_infinite]" />
            FULL-STACK DEVELOPER · BUILDING ABOVE THE CLOUDS
          </motion.div>

          <motion.p variants={textVariants} className="mb-1.5 font-[family-name:var(--font-caveat),cursive] text-[28px] font-semibold text-[var(--ink-soft)]">
            Hi, I&apos;m Bagaskara —
          </motion.p>

          <motion.h1
            variants={textVariants}
            className="m-0 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(46px,7vw,88px)] leading-[1.02] tracking-[-0.5px] text-[var(--ink)] text-balance"
          >
            I build{" "}
            <em className="italic bg-[linear-gradient(120deg,#8fa8ff,#c69bff_60%,#ff9fc0)] bg-clip-text text-transparent">calm</em>, thoughtful software, somewhere{" "}
            <em className="italic">above&nbsp;the&nbsp;clouds.</em>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="mt-6.5 max-w-[440px] text-[17px] leading-[1.7] font-normal text-[var(--ink-soft)] text-pretty"
          >
            A developer who cares about the quiet details — the ones you feel before you notice. Come drift through a few things I&apos;ve made.
          </motion.p>

          <motion.div variants={textVariants} className="flex flex-wrap gap-3.5 mt-8.5">
            <motion.a
              href="#my-story"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="inline-flex items-center gap-2.5 py-3.75 px-[27px] rounded-full no-underline font-semibold text-[15px] text-white bg-[linear-gradient(135deg,#9db4ff,#c9a6ff_55%,#ffb3c8)] shadow-[0_14px_32px_rgba(150,140,225,0.4),inset_0_1px_0_rgba(255,255,255,0.5)]"
            >
              Wander my work&nbsp;<span className="text-[17px]">→</span>
            </motion.a>
            <motion.a
              href="#horizon"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="inline-flex items-center gap-2 py-3.75 px-[26px] rounded-full no-underline font-semibold text-[15px] text-[var(--ink)] bg-[var(--glass)] border border-[var(--glass-brd)] backdrop-blur-[12px]"
            >
              Say hello
            </motion.a>
          </motion.div>

          <motion.div variants={textVariants} className="flex items-center gap-2.5 mt-11 text-[var(--ink-soft)] text-[12.5px] tracking-[0.5px] font-medium">
            <span className="inline-block w-[22px] h-[34px] rounded-xl border-[1.5px] border-[var(--ink-soft)] opacity-60 relative">
              <span className="absolute left-1/2 top-[7px] -translate-x-1/2 w-[3px] h-[7px] rounded-[2px] bg-[var(--ink-soft)] [animation:bob_1.8s_ease-in-out_infinite]" />
            </span>
            KEEP DRIFTING
          </motion.div>
        </div>

        {/* floating island + avatar */}
        <motion.div variants={islandVariants} className="flex-[0_1_440px] min-w-[300px] h-[480px] relative">
          <motion.div style={{ x: island.x, y: island.y }} className="absolute inset-0">
            <div className="absolute inset-0 [animation:floatA_9s_ease-in-out_infinite]">
              <div className="absolute left-1/2 bottom-[34px] w-[290px] h-[64px] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--shadow),transparent_76%)] blur-[7px]" />
              <div className="absolute left-1/2 top-[214px] -translate-x-1/2 w-[236px] h-[230px] bg-[linear-gradient(180deg,var(--rock1),var(--rock2))] [clip-path:polygon(3%_0,97%_0,88%_30%,74%_52%,58%_78%,50%_100%,42%_78%,26%_52%,12%_30%)] rounded-t-[44%] shadow-[inset_14px_0_24px_rgba(255,255,255,0.18),inset_-18px_0_26px_rgba(0,0,0,0.12)]" />
              <div className="absolute left-1/2 top-[184px] -translate-x-1/2 w-[310px] h-[118px] rounded-full bg-[linear-gradient(180deg,var(--grass1),var(--grass2))] shadow-[inset_0_10px_20px_rgba(255,255,255,0.45),inset_0_-14px_22px_rgba(60,120,80,0.22)]" />

              {/* plants */}
              <div className="absolute left-[26%] top-[180px] w-[30px] h-[44px] origin-bottom [animation:sway_4.6s_ease-in-out_infinite]">
                <div className="absolute bottom-0 left-[13px] w-[3px] h-6 bg-[var(--grass2)] rounded-[2px]" />
                <div className="absolute bottom-4 left-[1px] w-[14px] h-5 bg-[linear-gradient(160deg,var(--grass1),var(--grass2))] rounded-[0_82%_32%_82%] rotate-[-32deg]" />
                <div className="absolute bottom-4 right-[1px] w-[14px] h-5 bg-[linear-gradient(200deg,var(--grass1),var(--grass2))] rounded-[82%_0_82%_32%] rotate-[32deg]" />
                <div className="absolute bottom-6 left-[9px] w-3 h-[18px] bg-[linear-gradient(180deg,var(--grass1),var(--grass2))] rounded-[80%_80%_30%_30%]" />
              </div>
              <div className="absolute right-[24%] top-[186px] w-6 h-[34px] origin-bottom [animation:sway_5.4s_ease-in-out_infinite_.6s]">
                <div className="absolute bottom-0 left-2.5 w-[3px] h-[18px] bg-[var(--grass2)] rounded-[2px]" />
                <div className="absolute bottom-3 left-0 w-[11px] h-4 bg-[linear-gradient(160deg,var(--grass1),var(--grass2))] rounded-[0_82%_32%_82%] rotate-[-30deg]" />
                <div className="absolute bottom-3 right-0 w-[11px] h-4 bg-[linear-gradient(200deg,var(--grass1),var(--grass2))] rounded-[82%_0_82%_32%] rotate-[30deg]" />
              </div>

              {/* avatar */}
              <div className="absolute left-1/2 top-9 -translate-x-1/2 [animation:floatC_6s_ease-in-out_infinite]">
                <div className="relative w-[168px] h-[168px] rounded-full p-2.25 bg-[var(--glass)] border border-[var(--glass-brd)] backdrop-blur-[10px] shadow-[0_20px_44px_rgba(120,110,190,0.3),inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <AvatarSlot />
                  </div>
                  <div className="absolute top-1.5 right-2.5 w-[15px] h-[15px] rounded-full bg-white opacity-70 blur-[1px]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* companion island */}
          <motion.div style={{ x: companion.x, y: companion.y }} className="absolute -left-[4%] bottom-[8%] w-[90px] h-[70px]">
            <div className="[animation:floatB_7s_ease-in-out_infinite_1s]">
              <div className="absolute left-1/2 top-[26px] -translate-x-1/2 w-16 h-15 bg-[linear-gradient(180deg,var(--rock1),var(--rock2))] [clip-path:polygon(6%_0,94%_0,72%_60%,50%_100%,28%_60%)] rounded-t-[40%]" />
              <div className="absolute left-1/2 top-3.5 -translate-x-1/2 w-[82px] h-8 rounded-full bg-[linear-gradient(180deg,var(--grass1),var(--grass2))]" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
