import { cn } from "@/lib/cn";

// Marca de Patagonia Sim Racing. Por ahora es un wordmark con un glifo de
// montaña. Cuando tengas el logo oficial, reemplazá el <svg> por un <Image/>.
export function Brand({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="#0f1922" />
        <path
          d="M5 23L12 11l4 6 3-5 7 11H5z"
          fill="url(#psr-g)"
        />
        <circle cx="22" cy="9" r="2.4" fill="#38bdf8" />
        <defs>
          <linearGradient id="psr-g" x1="5" y1="23" x2="26" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14b8a6" />
            <stop offset="1" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-bold tracking-tight">Patagonia</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand">
            Sim Racing
          </span>
        </span>
      )}
    </span>
  );
}
