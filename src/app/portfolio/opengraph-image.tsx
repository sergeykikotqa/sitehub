import { createOgImage, size } from "@/lib/og";

export const contentType = "image/png";
export { size };

export default function Image() {
  return createOgImage({
    eyebrow: "portfolio",
    title: "MBLMaster\nи MESTO",
    description:
      "Коммерческий сайт с категориями, кейсами и видеообзорами.\nИ короткий лендинг, где всё держится на ритме и proof-блоках.",
    accent: "#9f6b43",
  });
}
