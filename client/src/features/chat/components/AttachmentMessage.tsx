"use client";

import React, { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';

interface AttachmentMessageProps {
  fileName: string;
  fileUrl: string;
  myMessage: boolean;
}

export default function AttachmentMessage({ fileName, fileUrl, myMessage }: AttachmentMessageProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // 🎯 CLOUDINARY DIRECT DOWNLOAD CONVERSION
  const getDownloadableUrl = (url: string) => {
    if (url && url.includes('res.cloudinary.com') && url.includes('/upload/')) {
      return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents layout selection bubbling
    
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const targetUrl = getDownloadableUrl(fileUrl);
      
      // 🎯 FIXED: Fetch file as binary blob to bypass cross-origin browser download bans
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error("فشل تحميل الملف من الخادم");
      
      const blob = await response.blob();
      
      // Create a secure local file object pointer
      const localBlobUrl = window.URL.createObjectURL(blob);
      
      // Trigger the local fallback download seamlessly
      const link = document.createElement('a');
      link.href = localBlobUrl;
      link.setAttribute('download', fileName || 'download');
      document.body.appendChild(link);
      link.click();
      
      // Clean up the temporary browser memory variables safely
      document.body.removeChild(link);
      window.URL.revokeObjectURL(localBlobUrl);
    } catch (error) {
      console.error("Download pipeline execution failure:", error);
      // Fallback: If blob fetch is blocked by CORS settings, fall back to opening in a new tab
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      onClick={handleDownload}
      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all min-w-[260px] max-w-sm ${
        myMessage 
          ? 'bg-[#005438] border-emerald-700/30 text-white hover:bg-[#00402a]' 
          : 'bg-slate-50 border-slate-100 text-slate-800 hover:bg-slate-100'
      }`}
      dir="rtl"
    >
      {/* File Type Icon Frame Container */}
      <div className={`p-2.5 rounded-lg flex-shrink-0 ${
        myMessage ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-200 text-slate-600'
      }`}>
        <FileText size={22} />
      </div>

      {/* Title Details Context Column */}
      <div className="flex-1 min-w-0 text-right">
        <p className="text-xs md:text-sm font-semibold truncate">
          {fileName || 'ملف مرفق'}
        </p>
        <span className={`text-[10px] uppercase font-bold tracking-wider block mt-0.5 ${
          myMessage ? 'text-emerald-300' : 'text-slate-400'
        }`}>
          {fileName.split('.').pop() || 'file'} Document
        </span>
      </div>

      {/* Animated Download Action Status Button Indicator */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className={`p-2 rounded-full transition-colors flex items-center justify-center flex-shrink-0 ${
          myMessage 
            ? 'bg-emerald-800 text-white hover:bg-emerald-700' 
            : 'bg-white text-slate-600 hover:bg-slate-200 shadow-sm'
        }`}
        aria-label="تحميل الملف"
      >
        {isDownloading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Download size={16} />
        )}
      </button>
    </div>
  );
}