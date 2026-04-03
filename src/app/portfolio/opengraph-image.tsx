import { createOgImage, size } from "@/lib/og";

export const contentType = "image/png";
export { size };

export default async function Image() {
  return createOgImage({
    eyebrow: "Портфолио",
    title: "MBLMaster\nи MESTO",
    description:
      "Системный коммерческий сайт с категориями и видеообзорами.\nИ короткий лендинг, где всё держится на ритме и proof-сценах.",
    accent: "#9f6b43",
    previews: [
      {
        src: "/uploads/mblmaster-og.png",
        objectPosition: "center top",
      },
      {
        src: "/uploads/mesto-og.png",
        objectPosition: "center top",
      },
    ],
    footerLeft: "СайтХаб",
    footerRight: "индекс решений",
  });
}
