import type { Metadata } from "next";
import { getAllIdeas } from "@/lib/ideas";
import IdeaCard from "@/components/IdeaCard";

export const metadata: Metadata = {
  title: "100均DIY アイデア集",
  description: "ダイソー・セリアの商品だけで作れる収納DIYアイデア集",
};

export default async function HomePage() {
  const ideas = await getAllIdeas();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">100均 DIY アイデア集</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            ダイソー・セリアだけで作れる収納DIY
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {ideas.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">💡</p>
            <p className="text-sm">まだアイデアがありません</p>
            <p className="text-xs mt-1">
              Claude Codeチャットで用途を入力してください
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-400">{ideas.length}件のアイデア</p>
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
