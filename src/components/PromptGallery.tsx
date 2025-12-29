'use client';

import { useState } from 'react';
import { PromptItem } from '../types/prompt';
import { usePrompts } from '../hooks/usePrompts';
import PromptCard from './PromptCard';
import PromptModal from './PromptModal';
import { Search, X } from 'lucide-react';

interface PromptGalleryProps {
  initialItems: PromptItem[];
}

export default function PromptGallery({ initialItems }: PromptGalleryProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    filteredItems,
    allTags,
  } = usePrompts(initialItems);

  const [selectedItem, setSelectedItem] = useState<PromptItem | null>(null);
  const [displayCount, setDisplayCount] = useState(24);

  const visibleItems = filteredItems.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-12 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">OpenNana提示词图库</h1>
          <p className="text-slate-400 text-lg">浏览、筛选和搜索提示词案例图库，快速复制提示词，探索灵感。</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="搜索案例编号、标题或提示词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            {(searchQuery || selectedTag) && (
              <button 
                onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <X size={16} />
                清除筛选
              </button>
            )}
            <span className="text-slate-500">
              共 {filteredItems.length} / {initialItems.length} 个案例
              {selectedTag && ` · 标签: ${selectedTag}`}
            </span>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-800">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                selectedTag === tag
              ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20'
              : 'bg-[#1e293b] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleItems.map(item => (
          <PromptCard 
            key={item.id} 
            item={item} 
            onClick={setSelectedItem} 
          />
        ))}
      </div>

      {/* Load More Button */}
      {displayCount < filteredItems.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setDisplayCount(prev => prev + 24)}
            className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-sky-500/20"
          >
            加载更多案例
          </button>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-xl font-medium">没有找到匹配的案例</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
            className="mt-4 text-sky-500 hover:underline"
          >
            重置所有过滤器
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <PromptModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}
