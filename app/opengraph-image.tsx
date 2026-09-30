import { ImageResponse } from "next/og";

export const alt = "Habeeb Oke — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#05050f",
          position: "relative",
          overflow: "hidden",
          fontFamily: "monospace",
        }}
      >
        {/* Star field */}
        {Array.from({ length: 55 }).map((_, i) => {
          const x = ((i * 137.508 + 23) % 100).toFixed(2);
          const y = ((i * 97.34 + 11) % 100).toFixed(2);
          const sz = i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5;
          const op = 0.18 + (i % 7) * 0.08;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: sz,
                height: sz,
                borderRadius: "50%",
                background: "#fff",
                opacity: op,
              }}
            />
          );
        })}

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: "#ffffff",
          }}
        />

        {/* ND logo mark — top right */}
        <svg
          style={{ position: "absolute", top: 60, right: 72 }}
          width="72"
          height="72"
          viewBox="0 0 200 200"
          fill="none"
        >
          <rect width="200" height="200" rx="28" fill="#ffffff" fillOpacity="0.08" />
          <rect x="24" y="38" width="22" height="124" fill="white" />
          <polygon points="46,38 72,38 108,162 82,162" fill="white" />
          <rect x="96" y="38" width="22" height="124" fill="white" />
          <path d="M118 38 C172 38 176 66 176 100 C176 134 172 162 118 162 L96 162 L96 38 Z" fill="white" />
          <path d="M118 58 C154 58 156 76 156 100 C156 124 154 142 118 142 L116 142 L116 58 Z" fill="#05050f" />
        </svg>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px 72px 88px",
            width: "100%",
          }}
        >
          {/* Label */}
          <div style={{ display: "flex", fontSize: 15, color: "#565656", letterSpacing: "0.1em" }}>
            // habeeb oke · native.dev
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: "#ebebeb",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
              }}
            >
              Software
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: "#ebebeb",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
              }}
            >
              Engineer.
            </div>
            <div
              style={{
                fontSize: 20,
                color: "#7a7a7a",
                marginTop: 20,
                maxWidth: 580,
                lineHeight: 1.6,
              }}
            >
              I don't just write code. I solve problems other people give up on.
            </div>
          </div>

          {/* Footer row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 10 }}>
              {["React Native", "Next.js", "Backend", "AI / ML"].map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 13,
                    color: "#7a7a7a",
                    border: "1px solid #1d1d1d",
                    borderRadius: 4,
                    padding: "5px 12px",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 14, color: "#3a3a3a", letterSpacing: "0.04em" }}>
              native-dev.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
