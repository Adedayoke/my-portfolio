import { ImageResponse } from "next/og";

export const alt = "Habeeb Oke — Native Dev, Software Engineer";
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
          flexDirection: "column",
          justifyContent: "center",
          background: "#0b0e14",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#5b8def",
            marginBottom: 28,
          }}
        >
          // lagos, nigeria
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 600,
            color: "#e4e7ec",
            marginBottom: 24,
          }}
        >
          Habeeb Oke
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#7c8494",
            maxWidth: 900,
          }}
        >
          I don&apos;t just write code — I solve problems other people give
          up on.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#5b8def",
            marginTop: 48,
          }}
        >
          Native Dev
        </div>
      </div>
    ),
    { ...size }
  );
}
