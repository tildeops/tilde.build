import type { StorefrontProduct } from "@/lib/storefronts";

type Props = {
  shape: StorefrontProduct["shape"];
  className?: string;
  /** Stroke color hex (defaults to currentColor) */
  stroke?: string;
};

/**
 * Code-drawn product silhouettes used inside the tilde-side mockup tiles.
 * Each shape is hand-tuned for its category — bottles for skincare, chairs for
 * furniture, garments for apparel, and jewelry for the last vertical.
 */
export function ProductSilhouette({ shape, className, stroke = "currentColor" }: Props) {
  const common = {
    className,
    fill: "none",
    stroke,
    strokeWidth: 1.25,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    "aria-hidden": true as const,
  };

  switch (shape) {
    /* ----------------------------- SKINCARE ----------------------------- */
    case "bottle":
      return (
        <svg viewBox="0 0 80 110" {...common}>
          <rect x="34" y="6" width="12" height="10" rx="1.5" />
          <path d="M30 16 H50 V24 H30 Z" />
          <path d="M28 24 Q40 30 52 24 L52 96 Q40 102 28 96 Z" />
          <line x1="32" y1="60" x2="48" y2="60" />
        </svg>
      );
    case "jar":
      return (
        <svg viewBox="0 0 80 110" {...common}>
          <rect x="22" y="12" width="36" height="6" rx="1" />
          <path d="M22 18 V96 Q40 102 58 96 V18" />
          <line x1="22" y1="38" x2="58" y2="38" />
        </svg>
      );
    case "tube":
      return (
        <svg viewBox="0 0 80 110" {...common}>
          <path d="M36 8 L44 8 L48 18 H32 Z" />
          <path d="M30 18 H50 L52 100 Q40 104 28 100 Z" />
          <line x1="32" y1="32" x2="48" y2="32" />
        </svg>
      );
    case "pump":
      return (
        <svg viewBox="0 0 80 110" {...common}>
          <path d="M36 4 V14 H30 V20 H46 V14 H40 V4" />
          <rect x="38" y="20" width="4" height="8" />
          <path d="M26 28 H54 V96 Q40 102 26 96 Z" />
          <line x1="30" y1="62" x2="50" y2="62" />
        </svg>
      );

    /* ----------------------------- FURNITURE ---------------------------- */
    case "lounge":
      return (
        <svg viewBox="0 0 120 90" {...common}>
          <path d="M14 30 L14 14 Q14 8 22 8 L42 8 L48 30" />
          <path d="M14 30 L48 30 L52 38 L96 38 Q104 38 104 46 L104 64 L96 64" />
          <line x1="22" y1="64" x2="22" y2="82" />
          <line x1="96" y1="64" x2="96" y2="82" />
          <line x1="48" y1="38" x2="48" y2="64" />
          <line x1="14" y1="30" x2="22" y2="64" />
        </svg>
      );
    case "stool":
      return (
        <svg viewBox="0 0 80 90" {...common}>
          <ellipse cx="40" cy="30" rx="26" ry="6" />
          <line x1="20" y1="32" x2="14" y2="80" />
          <line x1="40" y1="36" x2="40" y2="80" />
          <line x1="60" y1="32" x2="66" y2="80" />
        </svg>
      );
    case "table":
      return (
        <svg viewBox="0 0 120 80" {...common}>
          <path d="M10 30 L110 30 L106 36 L14 36 Z" />
          <line x1="20" y1="36" x2="20" y2="74" />
          <line x1="100" y1="36" x2="100" y2="74" />
          <line x1="20" y1="74" x2="100" y2="74" />
        </svg>
      );
    case "bench":
      return (
        <svg viewBox="0 0 140 70" {...common}>
          <path d="M10 26 L130 26 L126 32 L14 32 Z" />
          <line x1="22" y1="32" x2="22" y2="62" />
          <line x1="70" y1="32" x2="70" y2="62" />
          <line x1="118" y1="32" x2="118" y2="62" />
          <line x1="22" y1="62" x2="118" y2="62" />
        </svg>
      );

    /* ------------------------------ APPAREL ----------------------------- */
    case "tee":
      return (
        <svg viewBox="0 0 100 110" {...common}>
          <path d="M36 10 Q50 22 64 10 L88 22 L78 38 L72 32 L72 100 L28 100 L28 32 L22 38 L12 22 Z" />
          <path d="M40 12 Q50 20 60 12" />
        </svg>
      );
    case "hoodie":
      return (
        <svg viewBox="0 0 110 120" {...common}>
          <path d="M38 14 Q55 4 72 14 L90 26 L82 44 L76 38 L76 108 L34 108 L34 38 L28 44 L20 26 Z" />
          <path d="M38 14 Q55 26 72 14 Q72 22 65 28 L55 30 L45 28 Q38 22 38 14 Z" />
          <line x1="55" y1="30" x2="55" y2="50" />
          <circle cx="55" cy="56" r="3" />
        </svg>
      );
    case "pant":
      return (
        <svg viewBox="0 0 90 130" {...common}>
          <path d="M14 8 L76 8 L72 60 L62 124 L48 124 L45 70 L42 124 L28 124 L18 60 Z" />
          <line x1="14" y1="20" x2="76" y2="20" />
        </svg>
      );
    case "cap":
      return (
        <svg viewBox="0 0 130 70" {...common}>
          <path d="M22 46 Q34 18 64 18 Q92 18 96 46 Z" />
          <path d="M22 46 L120 46 Q120 54 100 54 L22 54 Z" />
          <line x1="64" y1="20" x2="64" y2="44" />
        </svg>
      );

    /* ------------------------------ JEWELRY ----------------------------- */
    case "ring":
      return (
        <svg viewBox="0 0 100 100" {...common}>
          <ellipse cx="50" cy="64" rx="32" ry="22" />
          <ellipse cx="50" cy="64" rx="22" ry="14" />
          <path d="M38 44 L62 44 L56 22 L44 22 Z" />
          <circle cx="50" cy="30" r="3" />
        </svg>
      );
    case "pendant":
      return (
        <svg viewBox="0 0 100 130" {...common}>
          <path d="M10 14 Q50 32 90 14" />
          <path d="M50 32 L42 50 L50 86 L58 50 Z" />
          <circle cx="50" cy="38" r="3" />
        </svg>
      );
    case "hoop":
      return (
        <svg viewBox="0 0 100 110" {...common}>
          <circle cx="50" cy="56" r="36" />
          <circle cx="50" cy="56" r="28" />
          <line x1="50" y1="20" x2="50" y2="14" />
        </svg>
      );
    case "cuff":
      return (
        <svg viewBox="0 0 120 100" {...common}>
          <path d="M14 50 Q14 18 60 18 Q106 18 106 50 L106 60 Q90 50 60 50 Q30 50 14 60 Z" />
          <circle cx="22" cy="58" r="3" />
          <circle cx="98" cy="58" r="3" />
        </svg>
      );

    default:
      return null;
  }
}
