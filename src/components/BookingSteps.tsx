import { Check } from "lucide-react";

const STEPS = ["Package", "Booking", "Payment", "Receipt", "Confirm"] as const;

export function BookingSteps({ current }: { current: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <ol className="flex items-center justify-center gap-2 md:gap-4 flex-wrap text-[10px] md:text-xs uppercase tracking-[0.25em]">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={label} className="flex items-center gap-2 md:gap-4">
            <span
              className={[
                "inline-flex items-center gap-2 px-3 py-2 border transition-all",
                done ? "border-primary/60 text-primary bg-primary/5" :
                active ? "border-primary text-primary shadow-gold" :
                "border-border/50 text-muted-foreground",
              ].join(" ")}
            >
              <span className="w-5 h-5 inline-flex items-center justify-center border border-current rounded-full text-[10px]">
                {done ? <Check size={10} /> : n}
              </span>
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px w-4 md:w-8 bg-border/60" />}
          </li>
        );
      })}
    </ol>
  );
}