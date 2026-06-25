import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CourseState {
  title: string;
  category: string;
  level: string;
  description: string;
  price: number;
  commission: number;
  netProfit: number;
}

const initialState: CourseState = {
  title: '',
  category: 'برمجة',
  level: 'مبتدئ',
  description: '',
  price: 299,
  commission: 29.9,
  netProfit: 269.1,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof CourseState; value: any }>) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },
    // دالة لتحديث السعر وحساب الأرباح تلقائياً
    updateCoursePrice: (state, action: PayloadAction<number>) => {
      const price = action.payload;
      state.price = price;
      state.commission = +(price * 0.1).toFixed(1);
      state.netProfit = +(price - state.commission).toFixed(1);
    }
  },
});

export const { updateField, updateCoursePrice } = courseSlice.actions;
export default courseSlice.reducer;