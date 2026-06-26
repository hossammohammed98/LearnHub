import React from 'react';
import { Download, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Lesson } from '../types';

interface DetailsProps {
  lesson: Lesson;
  onNavigate: (direction: 'next' | 'prev') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const LessonDetails: React.FC<DetailsProps> = ({ lesson, onNavigate, hasPrev, hasNext }) => {
  return (
    <div className="flex-1 bg-gray-50/30 p-8 overflow-y-auto text-right flex flex-col justify-between">
      
      {/* الجزء العلوي: الفيديو وتفاصيل الدرس ووصفه */}
      <div className="space-y-6">
        <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-sm relative group">
          {lesson.videoUrl ? (
            <video src={lesson.videoUrl} controls className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-slate-950">
              <p className="text-sm text-gray-400">هذا الدرس لا يحتوي على فيديو حالياً أو أنه مغلق.</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
              <p className="text-sm text-gray-400">مدة العرض: {lesson.duration} دقائق</p>
            </div>
            
            <div className="flex items-center gap-3 self-start md:self-center">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2 text-sm">
                <HelpCircle className="w-4 h-4" />
                بدء الاختبار
              </button>
              <button className="border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                تحميل المصادر
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">وصف الدرس</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {lesson.description || "في هذا الدرس سنستكمل شرح المفاهيم البرمجية بدقة، يرجى مراجعة الملحقات في حال وجود ملفات تطبيقية."}
            </p>
          </div>
        </div>
      </div>

      {/* شريط الأزرار السفلي (الدرس التالي والسابق) */}
      <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-100 bg-white p-4 rounded-xl shadow-sm">
        
        {/* زر الدرس التالي */}
        <button
          onClick={() => onNavigate('next')}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            hasNext 
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          <ArrowRight className="w-4 h-4" />
          الدرس التالي
        </button>

        {/* زر الدرس السابق */}
        <button
          onClick={() => onNavigate('prev')}
          disabled={!hasPrev}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            hasPrev 
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
              : 'bg-gray-50 text-gray-300 cursor-not-allowed opacity-50'
          }`}
        >
          الدرس السابق
          <ArrowLeft className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};