import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.fullName} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0a0a0b",
          color: "#f3f1ec",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -200,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(242,193,78,0.35) 0%, rgba(242,193,78,0) 65%)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 24, color: "#a7a39b" }}>
          <span>adnanriaz.dev</span>
          <span style={{ color: "#f2c14e" }}>● available · 30+ hrs/week</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, lineHeight: 1.02, letterSpacing: -3 }}>
            I take web and mobile products
          </div>
          <div style={{ fontSize: 86, lineHeight: 1.02, letterSpacing: -3, fontStyle: "italic", color: "#f2c14e" }}>
            from spec to shipped.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "sans-serif" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34 }}>{site.fullName}</span>
            <span style={{ fontSize: 24, color: "#a7a39b", marginTop: 6 }}>{site.role} · {site.tagline}</span>
          </div>
          <span style={{ fontSize: 22, color: "#a7a39b" }}>7+ yrs · US startups since 2022 · Islamabad</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
