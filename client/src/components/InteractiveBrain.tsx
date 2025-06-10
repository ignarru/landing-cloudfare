import DetailedBrain from "./DetailedBrain";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
  active?: boolean;
  started?: boolean;
}

export default function InteractiveBrain({ className, active, started }: Props) {
  return (
    <div
      className={cn(
        "w-20 h-20 mx-auto relative md:w-28 md:h-28",
        className,
        active && "animate-brain-spin",
        started && "pointer-events-none"
      )}
    >
      <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-pulse-soft" />
      <div className="absolute inset-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
        <DetailedBrain className="w-16 h-16 text-white md:w-24 md:h-24" aria-hidden="true" />
      </div>
    </div>
  );
}
