import fs from "fs";
import path from "path";
import type { Idea } from "@/types/idea";

const IDEAS_DIR = path.join(process.cwd(), "data", "ideas");

export async function getAllIdeas(): Promise<Idea[]> {
  if (!fs.existsSync(IDEAS_DIR)) return [];

  const files = fs
    .readdirSync(IDEAS_DIR)
    .filter((f) => f.endsWith(".json"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(IDEAS_DIR, file), "utf-8");
      return JSON.parse(raw) as Idea;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export async function getIdea(id: string): Promise<Idea | null> {
  const filePath = path.join(IDEAS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Idea;
}

export async function getAllIdeaIds(): Promise<string[]> {
  if (!fs.existsSync(IDEAS_DIR)) return [];
  return fs
    .readdirSync(IDEAS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}
