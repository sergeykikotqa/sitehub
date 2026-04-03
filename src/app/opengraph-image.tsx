import { createOgImage, size } from "@/lib/og";

export const contentType = "image/png";
export { size };

export default function Image() {
  return createOgImage({
    eyebrow: "sitehub",
    title: "MBLMaster и MESTO",
    description:
      "Два реальных кейса в мебельной нише: коммерческий сайт под Иркутск и эмоциональный лендинг с одним Telegram CTA.",
    accent: "#b88458",
  });
}
