import { useState, useMemo } from 'react';
import { PromptItem } from '../types/prompt';

export function usePrompts(initialItems: PromptItem[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toString().includes(searchQuery) ||
        item.prompts.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = !selectedTag || item.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [initialItems, searchQuery, selectedTag]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialItems.forEach(item => {
      item.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialItems]);

  return {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    filteredItems,
    allTags,
  };
}
