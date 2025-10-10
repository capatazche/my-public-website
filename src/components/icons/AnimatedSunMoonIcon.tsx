import type React from 'react';

/**
 * Single SVG icon that animates between Sun and Moon using CSS transforms.
 * It renders both shapes and cross-fades/scales between them.
 *
 * By convention in this project, when theme === 'light' we show the Moon icon
 * (indicating you can switch to dark), and when theme === 'dark' we show the Sun.
 */
export const AnimatedSunMoonIcon = ({
  theme,
  className,
  ...props
}: ({ theme: 'light' | 'dark' } & React.SVGProps<SVGSVGElement>)) => {
  const showMoon = theme === 'light';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={["inline-block", className].filter(Boolean).join(' ')}
      aria-hidden
      {...props}
    >
      {/* Sun group */}
      <g
        className={[
          "origin-center transition-all duration-500 ease-out",
          showMoon ? "opacity-0 scale-0 rotate-180" : "opacity-100 scale-100 rotate-0",
        ].join(' ')}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m4.93 19.07 1.41-1.41" />
        <path d="m17.66 6.34 1.41-1.41" />
      </g>

      {/* Moon group */}
      <g
        className={[
          "origin-center transition-all duration-500 ease-out",
          showMoon ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-180",
        ].join(' ')}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </g>
    </svg>
  );
};
