"use client";

import React, { useState } from "react";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import type { Diagram2D, Part } from "@/types/design";

interface Props {
  diagram: Diagram2D;
  parts: Part[];
}

const CANVAS_WIDTH = 340;
const CANVAS_HEIGHT = 300;
const PADDING = 30;

export default function DiagramViewer({ diagram, parts }: Props) {
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  const scaleX = (CANVAS_WIDTH - PADDING * 2) / diagram.viewWidth;
  const scaleY = (CANVAS_HEIGHT - PADDING * 2) / diagram.viewHeight;
  const scale = Math.min(scaleX, scaleY);

  const partsMap = Object.fromEntries(parts.map((p) => [p.id, p]));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <Layer>
            {diagram.parts.map((dp, i) => {
              const part = partsMap[dp.partId];
              const x = PADDING + dp.x * scale;
              const y = PADDING + dp.y * scale;
              const w = dp.width * scale;
              const h = dp.height * scale;
              const isSelected = selectedPartId === dp.partId;

              return (
                <React.Fragment key={`${dp.partId}-${i}`}>
                  <Rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    fill={part?.color ?? "#E0E0E0"}
                    stroke={isSelected ? "#1976D2" : "#90A4AE"}
                    strokeWidth={isSelected ? 2 : 1}
                    opacity={0.85}
                    cornerRadius={2}
                    onClick={() =>
                      setSelectedPartId(isSelected ? null : dp.partId)
                    }
                    onTap={() =>
                      setSelectedPartId(isSelected ? null : dp.partId)
                    }
                  />
                  <Text
                    x={x + 2}
                    y={y + h / 2 - 6}
                    width={w - 4}
                    text={dp.label}
                    fontSize={9}
                    fill="#37474F"
                    align="center"
                    wrap="none"
                    ellipsis
                    listening={false}
                  />
                  <Line
                    points={[x, y + h + 4, x + w, y + h + 4]}
                    stroke="#90A4AE"
                    strokeWidth={0.5}
                    dash={[3, 2]}
                    listening={false}
                  />
                  <Text
                    x={x}
                    y={y + h + 7}
                    width={w}
                    text={`${dp.width}mm`}
                    fontSize={8}
                    fill="#78909C"
                    align="center"
                    listening={false}
                  />
                </React.Fragment>
              );
            })}
          </Layer>
        </Stage>
      </div>

      {selectedPartId && partsMap[selectedPartId] && (
        <div className="border-t border-gray-100 p-3 text-sm">
          <span className="font-medium text-gray-900">
            {partsMap[selectedPartId].name}
          </span>
          <span className="text-gray-500 ml-2">
            {partsMap[selectedPartId].store} ¥{partsMap[selectedPartId].price}
          </span>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 pb-2">
        タップで部品を選択
      </p>
    </div>
  );
}
