import { create } from "zustand";
import { ParentProfile } from "./types";
import { parentService } from "./ParentService";

interface ParentsState {
  currentParent: ParentProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchCurrentParent: (parentId: string) => Promise<void>;
}

export const useParentsStore = create<ParentsState>((set) => ({
  currentParent: null,
  isLoading: false,
  error: null,

  fetchCurrentParent: async (parentId: string) => {
    // تفعيل حالة التحميل وتصفير الأخطاء السابقة
    set({ isLoading: true, error: null });
    
    try {
      const data = await parentService.getParentProfile(parentId);
      set({ currentParent: data, isLoading: false });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "فشل في جلب بيانات ولي الأمر";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));