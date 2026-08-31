/** Shared by the client components and by the pre-paint script in app/layout.tsx. */
export const INTRO_STORAGE_KEY = "sky-intro";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Delay before the wordmark lifts away. */
export const INTRO_LIFT_MS = 900;
/** Total curtain lifetime before it is unmounted. Must exceed INTRO_LIFT_MS. */
export const INTRO_TOTAL_MS = 1250;
/** Curtain fade-out duration, in seconds (Motion transitions use seconds). */
export const INTRO_EXIT_S = 0.65;
/** Progress bar sweep, in seconds. Should complete at roughly INTRO_LIFT_MS. */
export const INTRO_BAR_S = 0.85;
