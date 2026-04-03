import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  size?: "header" | "footer";
  className?: string;
  alt?: string;
};

const sizeClasses: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  header: "h-7 w-[150px] sm:h-8 sm:w-[170px]",
  footer: "h-6 w-[130px] sm:h-7 sm:w-[150px]",
};

export function BrandLogo({
  size = "header",
  className,
  alt = "СайтХаб",
}: BrandLogoProps) {
  return (
    <span className={cn("relative inline-block", sizeClasses[size], className)}>
      <Image
        src="/brand/sitehub-logo.png"
        alt={alt}
        fill
        sizes="(min-width: 1024px) 170px, (min-width: 640px) 150px, 130px"
        className="object-contain"
      />
    </span>
  );
}
