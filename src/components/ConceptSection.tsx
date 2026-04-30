import Image from "next/image";
import type { Idea } from "@/types/idea";

interface Props {
  idea: Idea;
}

export default function ConceptSection({ idea }: Props) {
  return (
    <div className="space-y-4">
      {idea.imageUrl && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={idea.imageUrl}
            alt={idea.title}
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
          />
        </div>
      )}

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
        <p className="text-xs text-amber-600 font-medium mb-1">アイデアの核心</p>
        <p className="text-sm text-gray-800 font-medium leading-relaxed">
          {idea.concept}
        </p>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{idea.description}</p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          🎯 {idea.purpose}
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          ⏱ {idea.estimatedTime}
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          💰 ¥{idea.totalCost.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
