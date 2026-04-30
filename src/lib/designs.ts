import fs from "fs";
import path from "path";
import type { Design } from "@/types/design";

const DESIGNS_DIR = path.join(process.cwd(), "data", "designs");

export async function getAllDesigns(): Promise<Design[]> {
  if (!fs.existsSync(DESIGNS_DIR)) return [];

  const files = fs
    .readdirSync(DESIGNS_DIR)
    .filter((f) => f.endsWith(".json"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(DESIGNS_DIR, file), "utf-8");
      return JSON.parse(raw) as Design;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export async function getDesign(id: string): Promise<Design | null> {
  const filePath = path.join(DESIGNS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Design;
}

export async function getAllDesignIds(): Promise<string[]> {
  if (!fs.existsSync(DESIGNS_DIR)) return [];
  return fs
    .readdirSync(DESIGNS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}
