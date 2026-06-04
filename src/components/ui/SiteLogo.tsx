import Image from "next/image";
import Link from "next/link";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

type SiteLogoProps = {
  href?: string;
  variant?: "header" | "hero" | "footer" | "badge";
  className?: string;
};

const variants = {
  header: {
    src: kmbeautyOfficial.assets.headerLogo,
    width: 252,
    height: 61,
  },
  hero: {
    src: kmbeautyOfficial.assets.heroLogo,
    width: 428,
    height: 278,
  },
  footer: {
    src: kmbeautyOfficial.assets.whiteLogo,
    width: 282,
    height: 68,
  },
  badge: {
    src: kmbeautyOfficial.assets.whiteBadgeLogo,
    width: 276,
    height: 178,
  },
} as const;

export function SiteLogo({
  href = "/",
  variant = "header",
  className = "",
}: SiteLogoProps) {
  const asset = variants[variant];

  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 ${className}`.trim()}
      aria-label="KM Beauty"
    >
      <Image
        src={asset.src}
        alt="KM Beauty Estetica Avancada"
        width={asset.width}
        height={asset.height}
        className="h-auto w-auto max-w-full"
        priority={variant !== "footer"}
      />
    </Link>
  );
}
