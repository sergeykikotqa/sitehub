import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

type OgTheme = "light" | "dark";

type OgPreview = {
  src: string;
  objectPosition?: string;
};

type OgCardOptions = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  theme?: OgTheme;
  previews?: OgPreview[];
  footerLeft?: string;
  footerRight?: string;
};

const size = {
  width: 1200,
  height: 630,
};

function createPalette(theme: OgTheme, accent: string) {
  if (theme === "dark") {
    return {
      background: "#121214",
      secondaryBackground: "#1d1a17",
      foreground: "#fff7f0",
      muted: "#cdb9a8",
      accent,
      border: "#3a332d",
    };
  }

  return {
    background: "#f7f1e8",
    secondaryBackground: "#fffaf4",
    foreground: "#1e1a16",
    muted: "#6d6259",
    accent,
    border: "#d8cbbd",
  };
}

async function imageToDataUri(src: string) {
  const relativePath = src.replace(/^\/+/, "");
  const filePath = path.join(process.cwd(), "public", relativePath);
  const image = await readFile(filePath);
  const extension = path.extname(filePath).slice(1).toLowerCase() || "png";
  const mimeType = extension === "jpg" ? "jpeg" : extension;

  return `data:image/${mimeType};base64,${image.toString("base64")}`;
}

export async function createOgImage({
  eyebrow,
  title,
  description,
  accent,
  theme = "light",
  previews = [],
  footerLeft = "СайтХаб",
  footerRight = "два сценария",
}: OgCardOptions) {
  const palette = createPalette(theme, accent);
  const previewData = await Promise.all(
    previews.map(async (preview) => ({
      dataUri: await imageToDataUri(preview.src),
      objectPosition: preview.objectPosition ?? "center top",
    })),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "44px",
          background: palette.background,
          color: palette.foreground,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: "36px",
            overflow: "hidden",
            border: `1px solid ${palette.border}`,
            background: palette.secondaryBackground,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-90px",
              width: "320px",
              height: "320px",
              borderRadius: "999px",
              background: accent,
              opacity: 0.18,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-130px",
              left: "-70px",
              width: "300px",
              height: "300px",
              borderRadius: "999px",
              background: accent,
              opacity: 0.14,
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              padding: "54px",
              gap: "34px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: previewData.length ? "55%" : "100%",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "12px 22px",
                    borderRadius: "999px",
                    background: accent,
                    color: theme === "dark" ? "#fff7f0" : "#fffaf4",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {eyebrow}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 74,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 28,
                    lineHeight: 1.42,
                    color: palette.muted,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {description}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 22,
                  color: palette.muted,
                }}
              >
                <div style={{ display: "flex" }}>{footerLeft}</div>
                <div style={{ display: "flex" }}>{footerRight}</div>
              </div>
            </div>

            {previewData.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "45%",
                  gap: "18px",
                }}
              >
                {previewData.map((preview, index) => (
                  <div
                    key={`${preview.dataUri}-${index}`}
                    style={{
                      display: "flex",
                      flex: previewData.length === 1 ? 1 : index === 0 ? 1.15 : 0.85,
                      overflow: "hidden",
                      borderRadius: "28px",
                      border: `1px solid ${palette.border}`,
                      background: "#0000000d",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview.dataUri}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: preview.objectPosition,
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

export { size };
