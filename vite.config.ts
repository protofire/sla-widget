import { defineConfig, normalizePath } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        core: normalizePath(path.resolve(__dirname, 'src/lib/index.ts')),
        react: normalizePath(
          path.resolve(__dirname, 'src/integrations/react/index.tsx'),
        ),
        vanilla: normalizePath(
          path.resolve(__dirname, 'src/integrations/vanilla/index.ts'),
        ),
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.mjs`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        compact: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    minify: 'terser',
    sourcemap: true,
    target: 'esnext',
    emptyOutDir: true,
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: normalizePath(path.resolve(__dirname, 'tsconfig.json')),
      rollupTypes: true,
      include: ['src'],
    }),
  ],
});
