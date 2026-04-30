"use client";

import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import type { Design } from "@/types/design";
import PartsList from "./PartsList";
import AssemblyWizard from "./AssemblyWizard";

const DiagramViewer = dynamic(() => import("./DiagramViewer"), { ssr: false });
const Model3DViewer = dynamic(() => import("./Model3DViewer"), { ssr: false });

type Tab = "parts" | "diagram" | "model3d" | "assembly";

const TABS: { id: Tab; label: string }[] = [
  { id: "parts", label: "部品" },
  { id: "diagram", label: "2D図" },
  { id: "model3d", label: "3D" },
  { id: "assembly", label: "手順" },
];

interface Props {
  design: Design;
}

export default function DesignViewer({ design }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("parts");

  return (
    <div>
      <div className="flex border-b border-gray-100 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[300px]">
        {activeTab === "parts" && <PartsList parts={design.parts} />}

        {activeTab === "diagram" && (
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                図面を読み込み中...
              </div>
            }
          >
            <DiagramViewer diagram={design.diagram2d} parts={design.parts} />
          </Suspense>
        )}

        {activeTab === "model3d" && (
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                3Dモデルを読み込み中...
              </div>
            }
          >
            <Model3DViewer model={design.model3d} parts={design.parts} />
          </Suspense>
        )}

        {activeTab === "assembly" && (
          <AssemblyWizard steps={design.assembly} parts={design.parts} />
        )}
      </div>
    </div>
  );
}
