"use client";

import { useState, useCallback } from "react";
import { ImageIcon, Link2 } from "lucide-react";

export default function CoverUploadCard() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setFileName(file.name);
    },
    [],
  );

  return (
    <div
      dir="rtl"
      className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
    >
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        صورة الغلاف والترويج
      </h3>

      <label
        htmlFor="cover-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition ${
          isDragging
            ? "border-emerald-400 bg-emerald-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <ImageIcon className="h-6 w-6 text-gray-400" />
        <p className="text-sm text-gray-600">
          {fileName ?? "اسحب وأفلت صورة الغلاف هنا"}
        </p>
        <p className="text-xs text-gray-400">
          JPG, PNG - الحد الأقصى 2MB
        </p>
        <input
          id="cover-upload"
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      <div className="mt-5">
        <label
          htmlFor="promo-url"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          رابط فيديو ترويجي (YouTube/Vimeo)
        </label>
        <div className="relative">
          <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="promo-url"
            type="url"
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-9 pl-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>
    </div>
  );
}