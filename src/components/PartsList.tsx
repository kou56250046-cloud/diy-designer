"use client";

import { useState } from "react";
import type { Part } from "@/types/design";

const STORE_COLOR: Record<Part["store"], string> = {
  ダイソー: "bg-red-50 text-red-700 border-red-200",
  セリア: "bg-blue-50 text-blue-700 border-blue-200",
  どちらでも: "bg-gray-50 text-gray-600 border-gray-200",
};

interface Props {
  parts: Part[];
}

export default function PartsList({ parts }: Props) {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const totalCost = parts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <>
      <div className="space-y-3">
        {parts.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedPart(part)}
            className="w-full text-left bg-white rounded-xl border border-gray-100 p-3 hover:border-gray-300 hover:shadow-sm transition-all active:scale-95"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg shrink-0 border border-gray-200"
                style={{ backgroundColor: part.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-sm text-gray-900 truncate">
                    {part.name}
                  </span>
                  <span
                    className={`shrink-0 text-xs px-1.5 py-0.5 rounded border ${STORE_COLOR[part.store]}`}
                  >
                    {part.store}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  ¥{part.price} × {part.quantity}個 ={" "}
                  <span className="font-medium text-gray-700">
                    ¥{(part.price * part.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
              <span className="text-gray-400 text-sm">›</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">合計（税込）</span>
        <span className="text-lg font-bold text-gray-900">
          ¥{totalCost.toLocaleString()}
        </span>
      </div>

      {selectedPart && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setSelectedPart(null)}
        >
          <div
            className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-xl border border-gray-200 shrink-0"
                style={{ backgroundColor: selectedPart.color }}
              />
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {selectedPart.name}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded border ${STORE_COLOR[selectedPart.store]}`}
                >
                  {selectedPart.store}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {selectedPart.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">価格</div>
                <div className="font-semibold">¥{selectedPart.price}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">必要数量</div>
                <div className="font-semibold">{selectedPart.quantity}個</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">サイズ（mm）</div>
                <div className="font-semibold text-xs">
                  W{selectedPart.dimensions.width} × H
                  {selectedPart.dimensions.height} × D
                  {selectedPart.dimensions.depth}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">小計</div>
                <div className="font-semibold">
                  ¥{(selectedPart.price * selectedPart.quantity).toLocaleString()}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedPart(null)}
              className="mt-5 w-full py-3 bg-gray-900 text-white rounded-xl font-medium"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}
