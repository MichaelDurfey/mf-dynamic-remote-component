import {terser} from 'rollup-plugin-terser';
import {babel} from '@rollup/plugin-babel';

export default {
  input: 'index.js',
  output: [
    {
      file: 'public/browser.js',
      format: 'umd',
      name: 'browser',
      plugins: [
        babel({babelHelpers: 'runtime', external: [/@babel\/runtime/]}),
        terser(),
      ],
    },
    {
      file: 'public/main.js',
      format: 'cjs',
      name: 'server',
    },
  ],
};
