import Image from 'next/image';
import { PromptItem } from '../types/prompt';
import { useState } from 'react';

interface PromptCardProps {
  item: PromptItem;
  onClick: (item: PromptItem) => void;
}

export default function PromptCard({ item, onClick }: PromptCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="bg-[#1e293b] rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-sky-500 transition-all group flex flex-col h-full"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[4/3] w-full bg-slate-800">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-slate-700 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {item.coverImage ? (
          <Image
            src={`/${item.coverImage}`}
            alt={item.title}
            fill
            className={`object-cover group-hover:scale-105 transition-all duration-500 ${
              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-white font-medium text-lg line-clamp-2 mb-3">
          案例 {item.id}: {item.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-auto">
          {item.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#334155] text-sky-400"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-xs text-slate-500 self-center">+{item.tags.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}
