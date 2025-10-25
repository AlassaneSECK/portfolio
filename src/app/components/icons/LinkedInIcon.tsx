import type { SVGProps } from "react";

// Icône LinkedIn en SVG : mêmes props que GitHub pour garder une API homogène.
export default function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20.45 3H3.55A.55.55 0 0 0 3 3.55v16.9c0 .3.25.55.55.55h16.9c.3 0 .55-.25.55-.55V3.55A.55.55 0 0 0 20.45 3ZM8.5 18.46H5.77V9.88H8.5v8.58ZM7.14 8.67A1.58 1.58 0 1 1 7.13 5.5a1.58 1.58 0 0 1 .01 3.17Zm11.32 9.79h-2.72v-4.51c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.59H9.79V9.88h2.61v1.17h.04c.36-.68 1.24-1.4 2.56-1.4 2.74 0 3.24 1.8 3.24 4.14v4.67Z"
      />
    </svg>
  );
}
