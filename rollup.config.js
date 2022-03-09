import {nodeResolve} from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  plugins: [nodeResolve()],
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    }
  ]
};
