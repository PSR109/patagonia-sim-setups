import Image from "next/image";
import { cn } from "@/lib/cn";

// Marca de Patagonia Sim Racing. Usa el logo oficial (helmet + PSR) tomado de
// patagoniasimracing.cl (public/psr-logo.png), con el wordmark al lado.
export function Brand({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Image
        src="/psr-logo.png"
        width={28}
        height={28}
        alt="Patagonia Sim Racing"
        priority
        className="shrink-0 rounded-md"
      />
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
