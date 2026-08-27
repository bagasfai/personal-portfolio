"use client";

import Blob from "./Blob";

/** The five drifting colour blobs and their tuning. */
const BLOBS = [
  {
    factor: 1.1,
    className: "left-[-6%] top-[6%] w-[42vw] h-[42vw]",
    varName: "--blob-lav",
    anim: "blobDrift 22s ease-in-out",
    delay: "0s",
    opacity: 0.75,
    blur: 28,
  },
  {
    factor: 0.8,
    className: "right-[-8%] top-[2%] w-[38vw] h-[38vw]",
    varName: "--blob-blue",
    anim: "blobDrift 26s ease-in-out",
    delay: "2s",
    opacity: 0.7,
    blur: 30,
  },
  {
    factor: 1.4,
    className: "right-[6%] bottom-[-6%] w-[40vw] h-[40vw]",
    varName: "--blob-peach",
    anim: "blobDrift 24s ease-in-out",
    delay: "1s",
    opacity: 0.72,
    blur: 30,
  },
  {
    factor: 1.0,
    className: "left-[8%] bottom-[-10%] w-[36vw] h-[36vw]",
    varName: "--blob-mint",
    anim: "blobDrift 28s ease-in-out",
    delay: "3s",
    opacity: 0.7,
    blur: 28,
  },
  {
    factor: 1.6,
    className: "left-[36%] top-[34%] w-[30vw] h-[30vw]",
    varName: "--blob-blush",
    anim: "blobDrift 30s ease-in-out",
    delay: "1.5s",
    opacity: 0.6,
    blur: 32,
  },
];

export default function BlobField() {
  return (
    <>
      {BLOBS.map((b) => (
        <Blob key={b.varName} {...b} />
      ))}
    </>
  );
}
