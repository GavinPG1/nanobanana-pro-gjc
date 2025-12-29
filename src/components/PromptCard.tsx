import Image from 'next/image';
import { PromptItem } from '../types/prompt';

interface PromptCardProps {
  item: PromptItem;
  onClick: (item: PromptItem) => void;
}

export default function PromptCard({ item, onClick }: PromptCardProps) {
  return (
    <div 
      className="bg-[#1e293b] rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-sky-500 transition-all group"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[4/3] w-full">
        {item.coverImage ? (
          <Image
            src={`/${item.coverImage}`}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium text-lg line-clamp-2 mb-3">
          案例 {item.id}: {item.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#334155] text-sky-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
