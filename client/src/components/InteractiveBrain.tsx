import DetailedBrain from "./DetailedBrain";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
  onInteraction?: () => void;
  active?: boolean;
  started?: boolean;
}
export default function InteractiveBrain({
  className,
  onInteraction,
  active,
  started,
}: Props) {
  return (
    <div
      className={cn(
        "w-24 h-24 mx-auto relative md:w-36 md:h-36",
        className,
        active && "animate-brain-spin",
        started && "pointer-events-none"
      )}
      onClick={() => onInteraction?.()}
    >
      <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-pulse-soft" />
      <div className="absolute inset-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
        <DetailedBrain className="w-20 h-20 text-white md:w-32 md:h-32" aria-hidden="true" />
      </div>
    </div>
  );
}
