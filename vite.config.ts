import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3571,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@components': path.resolve(__dirname, './src/components'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@domains': path.resolve(__dirname, './src/domains'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@libs': path.resolve(__dirname, './src/libs'),
      '@routing': path.resolve(__dirname, './src/routing'),
      '@store': path.resolve(__dirname, './src/store'),
      '@Enums': path.resolve(__dirname, './src/Enums'),
    },
    preserveSymlinks: true,
  },
});
