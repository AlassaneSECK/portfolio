"use client";

import { useMemo } from "react";

type VideoVariant = "desktop" | "mobile";
type VideoFormat = "mp4" | "webm";

type AdaptiveVideoProps = {
  assetId: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";
  ariaLabel?: string;
  controlsList?: string;
  variants?: VideoVariant[];
  formats?: VideoFormat[];
};

const DEFAULT_VARIANTS: VideoVariant[] = ["mobile", "desktop"];
const DEFAULT_FORMATS: VideoFormat[] = ["mp4"];
const VARIANT_MEDIA: Record<VideoVariant, string | undefined> = {
  desktop: undefined,
  mobile: "(max-width: 767px)"
};

export default function AdaptiveVideo({
  assetId,
  className,
  poster,
  autoPlay = false,
  controls = false,
  loop = false,
  muted,
  playsInline = true,
  preload,
  ariaLabel,
  controlsList,
  variants,
  formats
}: AdaptiveVideoProps) {
  const resolvedMuted = typeof muted === "boolean" ? muted : autoPlay;
  const resolvedPreload = preload || (autoPlay ? "auto" : "metadata");
  const selectedVariants = variants && variants.length > 0 ? variants : DEFAULT_VARIANTS;
  const selectedFormats = formats && formats.length > 0 ? formats : DEFAULT_FORMATS;

  const sources = useMemo(
    () =>
      selectedVariants.flatMap((variant) =>
        selectedFormats.map((format) => {
          const searchParams = new URLSearchParams({
            asset: assetId,
            variant,
            format
          });

          return {
            key: `${variant}-${format}`,
            src: `/api/video?${searchParams.toString()}`,
            type: `video/${format}`,
            media: VARIANT_MEDIA[variant]
          };
        })
      ),
    [assetId, selectedFormats, selectedVariants]
  );

  const classNames = className ? className : undefined;

  return (
    <video
      className={classNames}
      poster={poster}
      autoPlay={autoPlay}
      controls={controls}
      loop={loop}
      muted={resolvedMuted}
      playsInline={playsInline}
      preload={resolvedPreload}
      aria-label={ariaLabel}
      controlsList={controls ? controlsList || "nodownload" : undefined}
      disablePictureInPicture
    >
      {sources.map((source) => (
        <source key={source.key} src={source.src} type={source.type} media={source.media} />
      ))}
      Votre navigateur ne supporte pas la lecture vidéo HTML5.
    </video>
  );
}
