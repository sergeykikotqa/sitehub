import { createOgImage, size } from "@/lib/og";
import { siteSettings } from "@/lib/site-config";

export const contentType = "image/png";
export { size };
export const dynamic = "force-static";

export default async function Image() {
  return createOgImage({
    eyebrow: "Подход студии",
    title: siteSettings.portfolio.title,
    description:
      "Два реальных кейса в мебельной нише: системный коммерческий сайт и короткий лендинг с proof-блоками и одним CTA.",
    accent: "#b88458",
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
    footerRight: siteSettings.portfolio.title,
  });
}
