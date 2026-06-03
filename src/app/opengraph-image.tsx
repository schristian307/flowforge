import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#A1A1AA",
            maxWidth: 800,
            lineHeight: 1.3,
          }}
        >
          {SITE.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            width: 80,
            height: 4,
            background: "#3B82F6",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
