"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface AudioRig {
  ctx: AudioContext;
  master: GainNode;
}

function getAudioContextCtor(): typeof AudioContext | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

const FADE_IN_S = 2.4;
const FADE_OUT_S = 0.7;

/**
 * Synthesized ambient soundscape (chord pad + filtered breeze noise) — no audio file.
 * Built lazily on first enable, closed on unmount. Mirrors the reference's Web Audio graph.
 */
export function useAmbientSound() {
  const [soundOn, setSoundOn] = useState(false);
  const soundOnRef = useRef(false);
  const rigRef = useRef<AudioRig | null>(null);
  const suspendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildAudio = useCallback((): AudioRig | null => {
    if (rigRef.current) return rigRef.current;
    const AC = getAudioContextCtor();
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    // gentle chord pad — soft detuned voices (A major-ish, airy)
    const padGain = ctx.createGain();
    padGain.gain.value = 0.16;
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 900;
    padFilter.Q.value = 0.6;
    padGain.connect(padFilter);
    padFilter.connect(master);

    const freqs = [220, 277.18, 329.63, 440]; // A3 C#4 E4 A4
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (i - 1.5) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.25 / freqs.length;
      o.connect(g);
      g.connect(padGain);
      // slow independent swell
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.017;
      const lfoG = ctx.createGain();
      lfoG.gain.value = 0.11 / freqs.length;
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      o.start();
      lfo.start();
    });

    // soft breeze — filtered noise, slowly sweeping
    const bufSize = 2 * ctx.sampleRate;
    const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02; // brown-ish, softer
      data[i] = last * 3.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 480;
    noiseFilter.Q.value = 0.5;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.05;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);

    const windLfo = ctx.createOscillator();
    windLfo.frequency.value = 0.07;
    const windLfoG = ctx.createGain();
    windLfoG.gain.value = 0.035;
    windLfo.connect(windLfoG);
    windLfoG.connect(noiseGain.gain);

    const sweepLfo = ctx.createOscillator();
    sweepLfo.frequency.value = 0.03;
    const sweepG = ctx.createGain();
    sweepG.gain.value = 220;
    sweepLfo.connect(sweepG);
    sweepG.connect(noiseFilter.frequency);

    noise.start();
    windLfo.start();
    sweepLfo.start();

    rigRef.current = { ctx, master };
    return rigRef.current;
  }, []);

  const setSound = useCallback(
    async (on: boolean) => {
      const rig = buildAudio();
      if (!rig) return;

      if (suspendTimerRef.current) {
        clearTimeout(suspendTimerRef.current);
        suspendTimerRef.current = null;
      }

      if (on) {
        try {
          if (rig.ctx.state === "suspended") await rig.ctx.resume();
        } catch {
          // autoplay policy — will retry on next gesture
        }
      }

      const now = rig.ctx.currentTime;
      rig.master.gain.cancelScheduledValues(now);
      rig.master.gain.setValueAtTime(
        Math.max(0.0001, rig.master.gain.value),
        now,
      );
      rig.master.gain.linearRampToValueAtTime(
        on ? 0.5 : 0.0001,
        now + (on ? FADE_IN_S : FADE_OUT_S),
      );

      if (!on) {
        // Let the ramp finish, then stop the graph entirely. Without this the
        // oscillators and noise source keep running for the rest of the session,
        // costing CPU and battery to produce silence.
        suspendTimerRef.current = setTimeout(
          () => {
            rig.ctx.suspend().catch(() => {
              // already closed — nothing to suspend
            });
            suspendTimerRef.current = null;
          },
          FADE_OUT_S * 1000 + 100,
        );
      }

      soundOnRef.current = on;
      setSoundOn(on);
      try {
        localStorage.setItem("sky-sound", on ? "1" : "0");
      } catch {
        // storage unavailable — sound preference just won't persist
      }
    },
    [buildAudio],
  );

  const toggleSound = useCallback(() => {
    setSound(!soundOnRef.current);
  }, [setSound]);

  useEffect(() => {
    let wantSound = false;
    try {
      wantSound = localStorage.getItem("sky-sound") === "1";
    } catch {
      wantSound = false;
    }
    if (!wantSound) return;
    const onGesture = () => {
      setSound(true);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (suspendTimerRef.current) clearTimeout(suspendTimerRef.current);
      if (rigRef.current) {
        try {
          rigRef.current.ctx.close();
        } catch {
          // already closed
        }
      }
    };
  }, []);

  return { soundOn, toggleSound };
}
