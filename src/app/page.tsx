import type { Metadata } from "next";
import { getAllDesigns } from "@/lib/designs";
import DesignCard from "@/components/DesignCard";

export const metadata: Metadata = {
  title: "100均DIY設計図",
  description: "ダイソー・セリアの商品だけで作れる折り畳み収納DIYの設計図集",
};

export default async function HomePage() {
  const designs = await getAllDesigns();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">100均 DIY 設計図</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            ダイソー・セリアだけで作れる収納DIY
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {designs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🔨</p>
            <p className="text-sm">まだ設計図がありません</p>
            <p className="text-xs mt-1">
              Claude Codeチャットで作りたいものを入力してください
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-400">{designs.length}件の設計図</p>
            {designs.map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
