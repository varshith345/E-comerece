import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const Image = (): Promise<ImageResponse> => {
  return Promise.resolve(
    new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 88px",
            backgroundColor: "#F2EDE3",
            backgroundImage:
              "radial-gradient(70% 80% at 90% 0%, rgba(255,61,0,0.22) 0%, transparent 60%)",
            color: "#111111",
            fontFamily: "Georgia, serif",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6B6A63",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: "#FF3D00",
                  boxShadow: "0 0 0 6px rgba(255,61,0,0.18)",
                }}
              />
              <span style={{ color: "#111111" }}>
                voltage<span style={{ color: "#FF3D00" }}>/</span>collective
              </span>
            </div>
            <span>est. mmxxvi — san francisco</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontStyle: "italic",
                fontSize: 168,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              Sound.
            </div>
            <div
              style={{
                fontStyle: "italic",
                fontSize: 168,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                paddingLeft: 80,
              }}
            >
              Pixels.
            </div>
            <div
              style={{
                display: "flex",
                fontStyle: "italic",
                fontSize: 168,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              <span>Power</span>
              <span style={{ color: "#FF3D00" }}>.</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6B6A63",
            }}
          >
            <span>— a small, deliberate catalog of electronics</span>
            <span>catalog · 012 / 012</span>
          </div>
        </div>
      ),
      { ...size },
    ),
  );
};

export default Image;
