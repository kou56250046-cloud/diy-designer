"use client";

import { useState } from "react";
import type { AssemblyStep, Part } from "@/types/design";

interface Props {
  steps: AssemblyStep[];
  parts: Part[];
}

export default function AssemblyWizard({ steps, parts }: Props) {
  const [current, setCurrent] = useState(0);

  const step = steps[current];
  const highlightedParts = parts.filter((p) =>
    step.highlightPartIds.includes(p.id)
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? "bg-gray-900 flex-1"
                : i < current
                  ? "bg-gray-400 w-4"
                  : "bg-gray-200 w-4"
            }`}
          />
        ))}
      </div>

      <div className="text-xs text-gray-400 text-right">
        {current + 1} / {steps.length}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
            {step.step}
          </span>
          <h3 className="font-bold text-gray-900">{step.title}</h3>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {step.description}
        </p>

        {step.tip && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
            <span className="font-medium">コツ：</span>
            {step.tip}
          </div>
        )}
      </div>

      {highlightedParts.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">このステップで使う部品</p>
          <div className="flex flex-wrap gap-2">
            {highlightedParts.map((part) => (
              <div
                key={part.id}
                className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-1"
              >
                <div
                  className="w-3 h-3 rounded-sm border border-gray-300"
                  style={{ backgroundColor: part.color }}
                />
                <span className="text-xs text-gray-700">{part.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-30 active:scale-95 transition-transform"
        >
          ← 前のステップ
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          disabled={current === steps.length - 1}
          className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium disabled:opacity-30 active:scale-95 transition-transform"
        >
          次のステップ →
        </button>
      </div>

      {current === steps.length - 1 && (
        <div className="text-center py-4 text-2xl">
          完成！お疲れ様でした
        </div>
      )}
    </div>
  );
}
