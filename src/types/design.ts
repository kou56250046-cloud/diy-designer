export type Difficulty = "初級" | "中級" | "上級";
export type Store = "ダイソー" | "セリア" | "どちらでも";

export interface PartDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Part {
  id: string;
  name: string;
  store: Store;
  price: number;
  quantity: number;
  description: string;
  dimensions: PartDimensions;
  color: string;
}

export interface AssemblyStep {
  step: number;
  title: string;
  description: string;
  highlightPartIds: string[];
  tip?: string;
}

export interface Diagram2DPart {
  partId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface Diagram2D {
  viewWidth: number;
  viewHeight: number;
  parts: Diagram2DPart[];
}

export interface Model3DPart {
  partId: string;
  position: [number, number, number];
  rotation: [number, number, number];
  dimensions: [number, number, number];
  color: string;
}

export interface Model3D {
  parts: Model3DPart[];
}

export interface Design {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  totalCost: number;
  createdAt: string;
  parts: Part[];
  assembly: AssemblyStep[];
  diagram2d: Diagram2D;
  model3d: Model3D;
}
