import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/',
    plugins: [react()],
    build: {
        outDir: 'buildcurrent',
        emptyOutDir: true,
        chunkSizeWarningLimit: 3200,
    },
    server: {
        open: true,
    },
});

