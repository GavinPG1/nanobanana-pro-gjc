'use client';

import Image from 'next/image';
import { PromptItem } from '../types/prompt';
import { X, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PromptModalProps {
  item: PromptItem;
  onClose: () => void;
}

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/gh/GavinPG1/nanobanana-pro-gjc@main/public';

export default function PromptModal({ item, onClose }: PromptModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#0f172a] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-800">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Side: Image(s) */}
        <div className="w-full md:w-3/5 h-[40vh] md:h-auto bg-black flex items-center justify-center overflow-y-auto custom-scrollbar p-4">
          <div className="flex flex-col gap-4 w-full">
            {item.images.map((img, idx) => (
              <div key={idx} className="relative w-full aspect-square md:aspect-auto">
                <img 
                  src={`${CDN_BASE_URL}/${img}`} 
                  alt={`${item.title} ${idx + 1}`}
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-2/5 flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#1e293b]/50">
          <div className="p-6 md:p-8 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                案例 {item.id}: {item.title}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-slate-400 text-sm space-y-1">
                <p>来源: {item.source?.name || '未知'}</p>
                <p>模型: {item.model || 'Nano banana pro'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">提示词</h3>
              
              {item.prompts.map((prompt, index) => (
                <div key={index} className="relative group bg-[#0f172a] rounded-xl p-4 border border-slate-800">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">
                      提示词 {index + 1}
                    </span>
                    <button 
                      onClick={() => handleCopy(prompt, index)}
                      className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-slate-800/50 px-2 py-1 rounded-md"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check size={14} className="text-green-500" />
                          <span>已复制</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>复制</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {prompt}
                  </p>
                </div>
              ))}

              {item.notes.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">使用笔记</h4>
                  <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                    {item.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
