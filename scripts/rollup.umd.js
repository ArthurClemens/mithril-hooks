/*
Build to an Universal Module Definition
*/
import { pkg, createConfig } from "./rollup.base";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

const baseConfig = createConfig();
const targetConfig = Object.assign({}, baseConfig, {
  output: Object.assign(
    {},
    baseConfig.output,
    {
      format: "umd",
      file: `${pkg.main}.js`,
      sourcemap: true,
      extend: true,
    }
  )
});
targetConfig.plugins.push(
  babel({
    configFile: "../../babel.config.umd.js"
  })
);
targetConfig.plugins.push(terser());

export default targetConfig;
