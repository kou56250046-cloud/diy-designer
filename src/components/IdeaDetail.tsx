"use client";

import { useState } from "react";
import type { Idea } from "@/types/idea";
import ConceptSection from "./ConceptSection";
import PartsList from "./PartsList";
import StepsList from "./StepsList";

type Tab = "concept" | "parts" | "steps";

const TABS: { id: Tab; label: string }[] = [
  { id: "concept", label: "概念" },
  { id: "parts", label: "部品" },
  { id: "steps", label: "手順" },
];

interface Props {
  idea: Idea;
}

export default function IdeaDetail({ idea }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("concept");

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
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "concept" && <ConceptSection idea={idea} />}
      {activeTab === "parts" && <PartsList parts={idea.parts} />}
      {activeTab === "steps" && <StepsList steps={idea.steps} />}
    </div>
  );
}
