import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getIdea, getAllIdeaIds } from "@/lib/ideas";
import IdeaDetail from "@/components/IdeaDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllIdeaIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const idea = await getIdea(id);
  if (!idea) return { title: "Not Found" };
  return {
    title: `${idea.emoji} ${idea.title}`,
    description: idea.concept,
  };
}

export default async function IdeaPage({ params }: Props) {
  const { id } = await params;
  const idea = await getIdea(id);
  if (!idea) notFound();

  const DIFFICULTY_STYLE: Record<typeof idea.difficulty, string> = {
    初級: "text-green-600 bg-green-50",
    中級: "text-yellow-600 bg-yellow-50",
    上級: "text-red-600 bg-red-50",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            ←
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl shrink-0">{idea.emoji}</span>
            <h1 className="text-base font-bold text-gray-900 truncate">
              {idea.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5">
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${DIFFICULTY_STYLE[idea.difficulty]}`}
          >
            {idea.difficulty}
          </span>
          <span className="text-xs text-gray-500">⏱ {idea.estimatedTime}</span>
          <span className="text-xs font-semibold text-gray-800">
            ¥{idea.totalCost.toLocaleString()}
          </span>
        </div>

        <IdeaDetail idea={idea} />
      </div>
    </main>
  );
}
