"use client";

import type { IdeaPart } from "@/types/idea";

const STORE_COLOR: Record<IdeaPart["store"], string> = {
  ダイソー: "bg-red-50 text-red-700 border-red-200",
  セリア: "bg-blue-50 text-blue-700 border-blue-200",
  どちらでも: "bg-gray-50 text-gray-600 border-gray-200",
};

interface Props {
  parts: IdeaPart[];
}

export default function PartsList({ parts }: Props) {
  const totalCost = parts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div>
      <div className="space-y-2">
        {parts.map((part) => (
          <div
            key={part.id}
            className="bg-white rounded-xl border border-gray-100 p-3"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-medium text-sm text-gray-900">
                    {part.name}
                  </span>
                  <span
                    className={`shrink-0 text-xs px-1.5 py-0.5 rounded border ${STORE_COLOR[part.store]}`}
                  >
                    {part.store}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  ¥{part.price} × {part.quantity}個 ={" "}
                  <span className="font-medium text-gray-700">
                    ¥{(part.price * part.quantity).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {part.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">合計（税込）</span>
        <span className="text-lg font-bold text-gray-900">
          ¥{totalCost.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
