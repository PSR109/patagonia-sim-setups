import Image from "next/image";
import { cn } from "@/lib/cn";

// Marca de Patagonia Sim Racing. Logo oficial (helmet + PSR) de
// patagoniasimracing.cl (public/psr-logo.png) con wordmark en tipografía display.
export function Brand({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 -z-10 rounded-lg bg-brand/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        <Image
          src="/psr-logo.png"
          width={30}
          height={30}
          alt="Patagonia Sim Racing"
          priority
          className="shrink-0 rounded-md ring-1 ring-white/10"
        />
      </span>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-bold tracking-tight text-fg">
            Patagonia
          </span>
          <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-brand">
            Sim Racing
          </span>
        </span>
      )}
    </span>
  );
}
