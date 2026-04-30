import Link from "next/link";
import type { Design } from "@/types/design";

const DIFFICULTY_COLOR: Record<Design["difficulty"], string> = {
  初級: "bg-green-100 text-green-800",
  中級: "bg-yellow-100 text-yellow-800",
  上級: "bg-red-100 text-red-800",
};

interface Props {
  design: Design;
}

export default function DesignCard({ design }: Props) {
  const partCount = design.parts.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <Link href={`/design/${design.id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow active:scale-95">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="font-bold text-gray-900 text-base leading-tight">
            {design.title}
          </h2>
          <span
            className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[design.difficulty]}`}
          >
            {design.difficulty}
          </span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {design.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <span>¥{design.totalCost.toLocaleString()}</span>
          </span>
          <span className="text-gray-300">|</span>
          <span>{design.estimatedTime}</span>
          <span className="text-gray-300">|</span>
          <span>部品 {partCount}点</span>
        </div>
      </div>
    </Link>
  );
}
