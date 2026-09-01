import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg,#9db4ff,#c9a6ff 55%,#ffb3c8)",
        }}
      >
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Georgia, serif",
          }}
        >
          B
        </span>
      </div>
    ),
    size,
  );
}
