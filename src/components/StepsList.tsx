import type { IdeaStep } from "@/types/idea";

interface Props {
  steps: IdeaStep[];
}

export default function StepsList({ steps }: Props) {
  return (
    <div className="space-y-4">
      {steps.map((s) => (
        <div key={s.step} className="flex gap-3">
          <div className="shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
            {s.step}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-1">{s.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
            {s.tip && (
              <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 leading-relaxed">
                💡 {s.tip}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
