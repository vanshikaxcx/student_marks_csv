import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/student_marks_csv/',  // <--- set this to your repo name
  plugins: [react()],

});
