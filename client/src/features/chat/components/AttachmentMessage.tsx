"use client";

import React from 'react';
import { FileText, Download } from 'lucide-react';

interface AttachmentMessageProps {
  fileName: string;
  fileUrl: string;
  myMessage: boolean;
}

export default function AttachmentMessage({ fileName, fileUrl, myMessage }: AttachmentMessageProps) {
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents clicking the download button from bubbling events up to the message frame
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleDownload}
      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all max-w-sm ${
        myMessage 
          ? 'bg-[#005438] border-emerald-700/30 text-white hover:bg-[#00402a]' 
          : 'bg-slate-50 border-slate-100 text-slate-800 hover:bg-slate-100'
      }`}
      dir="rtl"
    >
      <div className={`p-2.5 rounded-lg flex-shrink-0 ${
        myMessage ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-200 text-slate-600'
      }`}>
        <FileText size={22} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs md:text-sm font-semibold truncate">
          {fileName || 'ملف مرفق'}
        </p>
        <span className={`text-[10px] uppercase font-medium ${
          myMessage ? 'text-emerald-300' : 'text-slate-400'
        }`}>
          {fileName.split('.').pop() || 'file'} Document
        </span>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        className={`p-2 rounded-full transition-colors flex items-center justify-center flex-shrink-0 ${
          myMessage 
            ? 'bg-emerald-800 text-white hover:bg-emerald-700' 
            : 'bg-white text-slate-600 hover:bg-slate-200 shadow-sm'
        }`}
        aria-label="تحميل الملف"
      >
        <Download size={16} />
      </button>
    </div>
  );
}