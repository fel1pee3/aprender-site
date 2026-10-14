import type { CSSProperties } from "react";

const paths: Record<string, React.ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </>
  ),
  "arrow-up": (
    <>
      <path d="M6 18 18 6M6 6h12v12" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6m0-6-9 9M10 4H4v16h16v-6" />
    </>
  ),
  chevron: <path d="m8 4 8 8-8 8" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  phone: (
    <path d="m7 3 3 5-3 3c1 3 3 5 6 6l3-3 5 3c-1 4-3 5-6 4C8 19 3 14 3 7c0-2 1-3 4-4Z" />
  ),
  check: <path d="m4 12 5 5L20 6" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M15 8V3H3v13h5" />
    </>
  ),
  book: (
    <>
      <path d="M12 6C9 4 5 4 2 5v15c4-1 7-1 10 1 3-2 6-2 10-1V5c-3-1-7-1-10 1Zm0 0v15" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M2 21v-4a7 7 0 0 1 14 0v4M16 4a3 3 0 0 1 0 6m3 3a5 5 0 0 1 3 4v4" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C5 2 1 9 6 17c8 5 15 1 14-14Z" />
      <path d="M3 22 16 9" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18M7 16v-5m5 5V6m5 10v-7" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};
export function Icon({
  name,
  size = 22,
  className,
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {paths[name] ?? paths.arrow}
    </svg>
  );
}
