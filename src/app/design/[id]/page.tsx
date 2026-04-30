import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDesign, getAllDesignIds } from "@/lib/designs";
import DesignViewer from "@/components/DesignViewer";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllDesignIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const design = await getDesign(id);
  if (!design) return {};
  return {
    title: design.title,
    description: design.description,
  };
}

export default async function DesignPage({ params }: Props) {
  const { id } = await params;
  const design = await getDesign(id);

  if (!design) notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="戻る"
          >
            ←
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-gray-900 text-base truncate">
              {design.title}
            </h1>
            <p className="text-xs text-gray-400">
              {design.difficulty} · {design.estimatedTime} ·
              ¥{design.totalCost.toLocaleString()}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5">
        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
          {design.description}
        </p>
        <DesignViewer design={design} />
      </div>
    </main>
  );
}
