"use client";
import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { useT } from "./client";
const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function LocalizedLink({ href, ...props }, ref) {
  const t = useT();
  const localized = typeof href === "string" ? t.href(href) : { ...href, pathname: href.pathname ? t.href(href.pathname) : href.pathname };
  return <NextLink ref={ref} href={localized} {...props} />;
});
export default Link;
