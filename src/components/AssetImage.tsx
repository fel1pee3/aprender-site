import Image, { type ImageProps } from "next/image";
import { assetUrl } from "@/lib/asset-url";

/** Preserve Next's sizing, loading and optimization while versioning local src. */
export default function AssetImage({ src, ...props }: ImageProps) {
  return <Image {...props} src={assetUrl(src)} />;
}
