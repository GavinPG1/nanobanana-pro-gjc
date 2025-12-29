import PromptGallery from '@/components/PromptGallery';
import { PromptData } from '@/types/prompt';
import promptDataRaw from '@/data/prompts.json';

export default function Home() {
  const data = promptDataRaw as unknown as PromptData;

  return (
    <main className="min-h-screen">
      <PromptGallery initialItems={data.items} />
    </main>
  );
}
