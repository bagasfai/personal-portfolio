"use client";

import { useEffect, useMemo, useRef } from "react";
import { m, motionValue, useAnimationFrame } from "motion/react";
import { useSky } from "../SkyContext";
import { getCrystals } from "@/content/crystals";

const REPEL_RADIUS = 150;
const REPEL_STRENGTH = 34;
const REPEL_EASE = 0.12;

/**
 * The repel physics for the workshop crystals. This is the documented exception in
 * spec section 3: the geometry (x, y, size, half) has to be imported on the client
 * because the animation loop needs it, so this component keeps more client code than
 * the other sections. The *prose* — name, years, description — is server-rendered and
 * arrives as `children`, one node per crystal in getCrystals() order.
 */
export default function CrystalField({
  children,
}: {
  children: React.ReactNode[];
}) {
  const crystals = useMemo(() => getCrystals(), []);
  const { cx, cy, reducedMotion } = useSky();

  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef(crystals.map(() => ({ px: 0, py: 0 })));
  const centers = useRef(crystals.map(() => ({ ccx: 0, ccy: 0 })));
  const values = useMemo(
    () => crystals.map(() => ({ x: motionValue(0), y: motionValue(0) })),
    [crystals],
  );

  useEffect(() => {
    const measure = () => {
      crystals.forEach((_, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const r = el.getBoundingClientRect();
        centers.current[i] = {
          ccx: r.left + r.width / 2,
          ccy: r.top + r.height / 2,
        };
      });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [crystals]);

  useAnimationFrame(() => {
    if (reducedMotion) return;
    const pointerX = cx.get();
    const pointerY = cy.get();
    crystals.forEach((_, i) => {
      const { ccx, ccy } = centers.current[i];
      let dx = 0;
      let dy = 0;
      if (pointerX !== 0 || pointerY !== 0) {
        const vx = ccx - pointerX;
        const vy = ccy - pointerY;
        const dist = Math.hypot(vx, vy);
        if (dist < REPEL_RADIUS && dist > 0.1) {
          const push = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          dx = (vx / dist) * push;
          dy = (vy / dist) * push;
        }
      }
      const o = offsets.current[i];
      o.px += (dx - o.px) * REPEL_EASE;
      o.py += (dy - o.py) * REPEL_EASE;
      values[i].x.set(o.px);
      values[i].y.set(o.py);
    });
  });

  return (
    <>
      {crystals.map((k, i) => (
        <m.div
          key={k.name}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          style={
            {
              "--k-left": k.x,
              "--k-top": k.y,
              "--k-size": k.size,
              "--k-half": k.half,
              x: values[i].x,
              y: values[i].y,
            } as unknown as React.CSSProperties
          }
          className="crystal absolute left-(--k-left) top-(--k-top) w-(--k-size) h-(--k-size) ml-(--k-half) mt-(--k-half)"
        >
          {children[i]}
        </m.div>
      ))}
    </>
  );
}
