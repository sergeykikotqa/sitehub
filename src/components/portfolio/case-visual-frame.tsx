import Image from "next/image";

import type { CaseVisualAsset } from "@/lib/case-presentation";
import { cn } from "@/lib/utils";

type CaseVisualFrameProps = {
  asset: CaseVisualAsset;
  className?: string;
  loadPriority?: "auto" | "high";
  tone?: "light" | "dark";
};

function getAspectClass(aspect: CaseVisualAsset["aspect"]) {
  switch (aspect) {
    case "wide":
      return "aspect-[16/10]";
    case "portrait":
      return "aspect-[4/5]";
    case "square":
      return "aspect-square";
    default:
      return "aspect-[4/3]";
  }
}

export function CaseVisualFrame({
  asset,
  className,
  loadPriority = "auto",
  tone = "light",
}: CaseVisualFrameProps) {
  return (
    <figure className={cn("space-y-3", className)}>
      <div
        className={cn(
          "editorial-visual-frame relative overflow-hidden",
          getAspectClass(asset.aspect),
          tone === "dark" && "editorial-visual-frame-dark",
        )}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          fetchPriority={loadPriority === "high" ? "high" : undefined}
          loading={loadPriority === "high" ? "eager" : undefined}
          className="object-cover"
          style={{ objectPosition: asset.objectPosition ?? "center top" }}
          sizes="(min-width: 1280px) 42vw, (min-width: 768px) 70vw, 100vw"
        />
      </div>
      {asset.caption ? (
        <figcaption
          className={cn(
            "editorial-caption",
            tone === "dark" && "text-white/62",
          )}
        >
          {asset.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
