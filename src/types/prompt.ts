export interface PromptSource {
  name: string;
  url: string;
}

export interface PromptItem {
  id: number;
  slug: string;
  title: string;
  source: PromptSource | null;
  model: string | null;
  images: string[];
  prompts: string[];
  examples: string[];
  notes: string[];
  originFile: string;
  description: string;
  tags: string[];
  coverImage: string | null;
}

export interface PromptData {
  generatedAt: string;
  total: number;
  items: PromptItem[];
}
