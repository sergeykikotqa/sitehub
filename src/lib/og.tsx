import { ImageResponse } from "next/og";

type OgTheme = "light" | "dark";

type OgCardOptions = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  theme?: OgTheme;
};

const size = {
  width: 1200,
  height: 630,
};

function createPalette(theme: OgTheme, accent: string) {
  if (theme === "dark") {
    return {
      background: "#151515",
      secondaryBackground: "#241f1b",
      foreground: "#fff7f0",
      muted: "#d4c0ad",
      accent,
      border: "#3b332d",
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

export function createOgImage({
  eyebrow,
  title,
  description,
  accent,
  theme = "light",
}: OgCardOptions) {
  const palette = createPalette(theme, accent);

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
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              padding: "56px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
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
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
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
                maxWidth: "820px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 76,
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
                  fontSize: 30,
                  lineHeight: 1.4,
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
                fontSize: 24,
                color: palette.muted,
              }}
            >
              <div style={{ display: "flex" }}>sitehub portfolio</div>
              <div style={{ display: "flex" }}>mblmaster / mesto</div>
            </div>
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
