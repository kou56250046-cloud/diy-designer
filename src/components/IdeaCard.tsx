import Link from "next/link";
import type { Idea } from "@/types/idea";

const CREATIVITY_STYLE: Record<Idea["creativityType"], string> = {
  定番アレンジ: "bg-amber-50 text-amber-700 border-amber-200",
  意外な組み合わせ: "bg-purple-50 text-purple-700 border-purple-200",
  ミックス: "bg-teal-50 text-teal-700 border-teal-200",
};

const DIFFICULTY_STYLE: Record<Idea["difficulty"], string> = {
  初級: "text-green-600",
  中級: "text-yellow-600",
  上級: "text-red-600",
};

interface Props {
  idea: Idea;
}

export default function IdeaCard({ idea }: Props) {
  return (
    <Link href={`/idea/${idea.id}`} className="block">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-300 hover:shadow-sm transition-all active:scale-95">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0 mt-0.5">{idea.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`text-xs px-1.5 py-0.5 rounded border ${CREATIVITY_STYLE[idea.creativityType]}`}
              >
                {idea.creativityType}
              </span>
              <span className={`text-xs font-medium ${DIFFICULTY_STYLE[idea.difficulty]}`}>
                {idea.difficulty}
              </span>
            </div>
            <h2 className="font-bold text-sm text-gray-900 leading-snug mb-1">
              {idea.title}
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
              {idea.concept}
            </p>
            <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
              <span>⏱ {idea.estimatedTime}</span>
              <span className="font-medium text-gray-700">¥{idea.totalCost.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-gray-300 text-sm shrink-0 mt-1">›</span>
        </div>
      </div>
    </Link>
  );
}
