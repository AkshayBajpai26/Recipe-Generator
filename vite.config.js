import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    base: '/smart-recipe/', // GitHub repo name yahan dalein
    plugins: [react()],
});
