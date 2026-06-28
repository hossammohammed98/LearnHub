import React from 'react';
import { Award } from 'lucide-react';

interface FinalExamCardProps {
  isCourseCompleted: boolean;
  onStartExam?: () => void;
}

export const FinalExamCard: React.FC<FinalExamCardProps> = ({ isCourseCompleted, onStartExam }) => {
  return (
    <div className="bg-[#0b2239] text-white p-5 rounded-2xl shadow-md text-center font-sans mt-auto border border-slate-800">
      <div className="bg-amber-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-500/20">
        <Award className="w-6 h-6 text-[#0b2239]" />
      </div>

      <h3 className="text-lg font-bold mb-1">الاختبار النهائي</h3>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        احصل على شهادتك بعد اجتياز هذا التقييم
      </p>

            
      {isCourseCompleted ? (
        <button 
          onClick={onStartExam}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-sm"
        >
          ابدأ الاختبار الآن
        </button>
      ) : (
        <button 
          disabled
          className="w-full bg-slate-800/80 text-slate-400 text-sm font-medium py-2.5 rounded-xl cursor-not-allowed border border-slate-700/50"
        >
          مغلق حتى إتمام الدروس
        </button>
      )}
    </div>
  );
};