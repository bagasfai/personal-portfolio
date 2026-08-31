import { ImageResponse } from "next/og";

export const alt = "Bagaskara — Floating Sky Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(160deg,#cfe0ff 0%,#eef1ff 46%,#fff4ec 100%)",
          color: "#3b3e63",
        }}
      >
        {/* Drawn, not typed: next/og has no font covering U+2726, so the glyph
            rendered as tofu. A rotated square needs no font at all. */}
        <div
          style={{
            width: 26,
            height: 26,
            background: "linear-gradient(135deg,#9db4ff,#c9a6ff 55%,#ffb3c8)",
            transform: "rotate(45deg)",
            borderRadius: 6,
            opacity: 0.9,
          }}
        />
        <div style={{ fontSize: 84, letterSpacing: -1, marginTop: 26 }}>
          Bagaskara
        </div>
        <div style={{ fontSize: 30, color: "#6a6d90", marginTop: 16 }}>
          building calm software, above the clouds
        </div>
      </div>
    ),
    size,
  );
}
