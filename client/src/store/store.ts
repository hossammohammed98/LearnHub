import { configureStore } from '@reduxjs/toolkit';
import courseReducer from '@/features/courses/store/courseSlice';

export const store = configureStore({
  reducer: {
    course: courseReducer,
  },
});