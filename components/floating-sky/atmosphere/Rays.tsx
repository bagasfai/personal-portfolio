"use client";

export default function Rays() {
  return (
    <div className="rays absolute inset-0 opacity-(--ray-op) [transition:opacity_1s_ease] bg-[conic-gradient(from_200deg_at_76%_-6%,transparent_0deg,rgba(255,255,255,.5)_12deg,transparent_24deg,transparent_40deg,rgba(255,255,255,.4)_52deg,transparent_64deg)] mix-blend-soft-light animate-[rayPulse_12s_ease-in-out_infinite]" />
  );
}
