import type { SVGProps } from 'react'

/**
 * GitHub mark as an inline SVG.
 * Lucide v1 dropped brand icons, so the logo ships with the app instead.
 */
export function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 .5C5.73.5.6 5.63.6 11.95c0 5.05 3.29 9.33 7.85 10.84.57.11.78-.25.78-.55l-.02-1.94c-3.19.7-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.77 2.69 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.44-2.69 5.42-5.25 5.7.41.36.78 1.07.78 2.16l-.01 3.2c0 .3.2.67.79.55A11.37 11.37 0 0 0 23.4 11.95C23.4 5.63 18.27.5 12 .5Z" />
    </svg>
  )
}
