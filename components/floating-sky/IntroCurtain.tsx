"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { INTRO_EXIT_S, INTRO_LIFT_MS } from "./introTiming";

export default function IntroCurtain({ visible }: { visible: boolean }) {
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setLifting(true), INTRO_LIFT_MS);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <motion.div
      key="curtain"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: INTRO_EXIT_S, ease: "easeInOut" }}
      className="fixed inset-0 z-200 flex items-center justify-center bg-[linear-gradient(180deg,#dbe7ff_0%,#eef1ff_46%,#fff4ec_100%)] pointer-events-none"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[24%] left-[-20%] w-105 h-42.5 opacity-[0.85] blur-[6px] animate-[driftX_34s_linear_infinite] bg-[radial-gradient(closest-side_at_30%_60%,#fff,transparent_72%),radial-gradient(closest-side_at_54%_44%,#fff,transparent_70%),radial-gradient(closest-side_at_74%_60%,#fff,transparent_72%)]" />
        <div className="absolute top-[58%] left-[-20%] w-[320px] h-32.5 opacity-70 blur-[7px] animate-[driftXrev_40s_linear_infinite] bg-[radial-gradient(closest-side_at_30%_60%,#fff,transparent_72%),radial-gradient(closest-side_at_54%_44%,#fff,transparent_70%),radial-gradient(closest-side_at_74%_60%,#fff,transparent_72%)]" />
      </div>

      <motion.div
        animate={{ opacity: lifting ? 0 : 1, y: lifting ? -16 : 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative text-center"
      >
        <div className="text-[34px] mb-2.5 animate-[floatC_4s_ease-in-out_infinite] text-[#8a8fce]">
          ✦
        </div>
        <div className="italic text-[34px] tracking-[0.5px] text-[#4a4d75] font-[family-name:var(--font-instrument-serif),Georgia,serif]">
          Bagaskara
        </div>
        <div className="mt-3.5 w-19 h-0.75 rounded-[3px] mx-auto overflow-hidden bg-[rgba(140,130,200,0.2)]">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="h-full rounded-[3px] bg-[linear-gradient(90deg,#9db4ff,#c9a6ff_55%,#ffb3c8)]"
          />
        </div>
        <div className="mt-3.5 text-[11.5px] tracking-[2px] font-semibold text-[#9a9dc0] font-[family-name:var(--font-manrope),sans-serif]">
          ENTERING THE SKY
        </div>
      </motion.div>
    </motion.div>
  );
}
