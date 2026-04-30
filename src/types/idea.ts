export type Difficulty = "初級" | "中級" | "上級";
export type Store = "ダイソー" | "セリア" | "どちらでも";
export type CreativityType = "定番アレンジ" | "意外な組み合わせ" | "ミックス";

export interface IdeaPart {
  id: string;
  name: string;
  store: Store;
  price: number;
  quantity: number;
  description: string;
}

export interface IdeaStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
}

export interface Idea {
  id: string;
  title: string;
  concept: string;
  description: string;
  purpose: string;
  difficulty: Difficulty;
  estimatedTime: string;
  totalCost: number;
  createdAt: string;
  creativityType: CreativityType;
  emoji: string;
  imageUrl?: string;
  parts: IdeaPart[];
  steps: IdeaStep[];
}
