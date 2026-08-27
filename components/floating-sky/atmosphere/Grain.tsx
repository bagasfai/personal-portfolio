"use client";

export default function Grain() {
  return (
    <div
      style={{
        backgroundImage:
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>\')',
      }}
      className="grain absolute inset-[-20%] opacity-5 mix-blend-overlay animate-[grainShift_8s_steps(6)_infinite]"
    />
  );
}
