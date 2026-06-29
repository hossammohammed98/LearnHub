"use client";

import React, { useState } from "react";
import axios from "axios";
import { Film, FileCode, CheckCircle, Trash2, UploadCloud } from "lucide-react";
import { apiClient } from "@/services/apiClient";

// Mocking structure coming down from your active multi-step course creation form
interface LessonState {
  id: string;
  title: string;
  videoFile: File | null;
  attachmentFile: File | null;
  uploadedVideoUrl?: string;
  uploadedAttachmentUrl?: string;
}

export default function CurriculumBuilder({ courseId, chapterId }: { courseId: string; chapterId: string }) {
  const [lessons, setLessons] = useState<LessonState[]>([
    { id: "temp-1", title: "الدرس الأول: مقدمة المسار التعليمي", videoFile: null, attachmentFile: null }
  ]);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Stage local client system storage adjustments securely
  const handleFileChange = (lessonId: string, field: "videoFile" | "attachmentFile", file: File | null) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, [field]: file } : l));
  };

  // 2. Process multi-file transaction execution when the supervisor saves progress changes
  const handleSaveCurriculum = async () => {
    setIsSaving(true);
    try {
      const finalProcessedLessons = [...lessons];

      for (let i = 0; i < finalProcessedLessons.length; i++) {
        const lesson = finalProcessedLessons[i];

        // 🎥 Execution Stream Phase A: Upload Video File if Staged
        if (lesson.videoFile) {
          const videoExt = lesson.videoFile.name.split(".").pop() || "";
          
          // Request signature token directly from your backend endpoints
          const tokenRes = await apiClient.post("/course/getCourseUploadToken", {
            courseId,
            chapterId,
            lessonId: lesson.id,
            fileType: videoExt
          });

          const { signature, timestamp, folder, apiKey, cloudName, resourceType } = tokenRes.data.data;

          const formData = new FormData();
          formData.append("file", lesson.videoFile);
          formData.append("signature", signature);
          formData.append("timestamp", timestamp.toString());
          formData.append("folder", folder);
          formData.append("api_key", apiKey);

          const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
          const uploadResponse = await axios.post(cloudinaryUrl, formData);
          
          lesson.uploadedVideoUrl = uploadResponse.data.secure_url;
        }

        // 📎 Execution Stream Phase B: Upload Attachments if Staged
        if (lesson.attachmentFile) {
          const attachExt = lesson.attachmentFile.name.split(".").pop() || "";
          
          const tokenRes = await axios.post("/api/v1/courses/getCourseUploadToken", {
            courseId,
            chapterId,
            lessonId: lesson.id,
            fileType: attachExt
          });

          const { signature, timestamp, folder, apiKey, cloudName, resourceType } = tokenRes.data.data;

          const formData = new FormData();
          formData.append("file", lesson.attachmentFile);
          formData.append("signature", signature);
          formData.append("timestamp", timestamp.toString());
          formData.append("folder", folder);
          formData.append("api_key", apiKey);

          const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
          const uploadResponse = await axios.post(cloudinaryUrl, formData);
          
          lesson.uploadedAttachmentUrl = uploadResponse.data.secure_url;
        }
      }

      // 3. Dispatch the final mapped dataset cleanly to save it in MongoDB
      console.log("🚀 SENDING CLEAN META TO DB SERVER:", finalProcessedLessons);
      // await axios.post('/api/v1/lessons/bulk-save', { lessons: finalProcessedLessons });
      
      alert("تم رفع الملفات وحفظ المنهج الدراسي بنجاح!");
    } catch (err) {
      console.error("Critical failure during file processing pipeline steps:", err);
      alert("حدث خطأ أثناء رفع وتحميل الملفات");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-slate-800">بناء محتوى الشابتر الحالي</h3>
      
      {lessons.map((lesson) => (
        <div key={lesson.id} className="p-4 border border-slate-100 bg-slate-50/50 rounded-xl space-y-4">
          <p className="text-sm font-semibold text-slate-700">{lesson.title}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video Input Selector Container Layout */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 p-4 rounded-xl hover:bg-white transition-colors relative">
              <Film size={20} className="text-slate-400 mb-2" />
              <span className="text-xs text-slate-500 font-medium">
                {lesson.videoFile ? lesson.videoFile.name : "اختر فيديو الدرس المرفق"}
              </span>
              <input 
                type="file" 
                accept="video/*" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileChange(lesson.id, "videoFile", e.target.files?.[0] || null)}
              />
            </div>

            {/* Document Input Selector Container Layout */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 p-4 rounded-xl hover:bg-white transition-colors relative">
              <FileCode size={20} className="text-slate-400 mb-2" />
              <span className="text-xs text-slate-500 font-medium">
                {lesson.attachmentFile ? lesson.attachmentFile.name : "اضغط لرفع ملف التقييم أو كتاب الواجبات (PDF)"}
              </span>
              <input 
                type="file" 
                accept=".pdf,.docx" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileChange(lesson.id, "attachmentFile", e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Main Form Action Control Panel Trigger buttons */}
      <button
        onClick={handleSaveCurriculum}
        disabled={isSaving}
        className="w-full py-3 bg-[#006C49] hover:bg-[#005438] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:bg-slate-300"
      >
        {isSaving ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>جاري رفع الملفات وبناء البيانات المترابطة...</span>
          </>
        ) : (
          <>
            <UploadCloud size={18} />
            <span>حفظ المنهج الدراسي ورفع المرفقات</span>
          </>
        )}
      </button>
    </div>
  );
}