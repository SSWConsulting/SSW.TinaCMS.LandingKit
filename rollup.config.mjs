// const resolve = require('@rollup/plugin-node-resolve');

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// const commonjs = require('@rollup/plugin-commonjs');
// const typescript = require('@rollup/plugin-typescript');
// const peerDepsExternal = require('rollup-plugin-peer-deps-external');

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true,
  },
  external: [
    'react', 
    'react-dom', 
    'next', 
    'tinacms',
    'next/navigation',
    'next/image'
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx']
    }),
  ],
};
