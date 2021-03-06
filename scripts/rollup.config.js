import fs from 'fs';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const { env } = process;
const pkg = JSON.parse(fs.readFileSync('./package.json'));

const isModule = !!parseInt(env.MODULE, 10);
const format = isModule ? 'es' : 'umd';
const target = isModule ? 'ESNEXT' : 'es2015';
const module = isModule ? 'ESNext' : 'ES2015';
const file = isModule
  ? `${process.env.DEST || pkg.module}`
  : `${process.env.DEST || pkg.main}.js`;
const isTypeScript = !!parseInt(env.TYPESCRIPT, 10);
const input = env.ENTRY || 'src/index.js';

const override = { compilerOptions: { target, module } };

export default {
  input,
  output: {
    name: env.MODULE_NAME,
    format,
    file,
    sourcemap: !isModule,
  },
  plugins: [
    isTypeScript &&
      typescript({
        tsconfigOverride: override,
      }),

    !isModule && terser({}),
    cleanup({
      comments: 'none',
    }),
  ],
};
