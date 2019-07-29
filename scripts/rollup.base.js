import fs from "fs";
import commonjs from "rollup-plugin-commonjs";
import pathmodify from "rollup-plugin-pathmodify";

export const pkg = JSON.parse(fs.readFileSync("./package.json"));
const name = "mithrilHooks";
const external = Object.keys(pkg.peerDependencies || {});

const globals = {};
external.forEach(ext => {
  switch (ext) {
  case "mithril":
    globals["mithril"] = "m";
    break;
  default:
    globals[ext] = ext;
  }
});

export const createConfig = () => {
  const config = {
    input: "src/index.js",
    external,
    output: {
      name,
      globals,
    },
    plugins: [

      pathmodify({
        aliases: [
          {
            id: "mithril",
            resolveTo: "node_modules/mithril/mithril.js"
          }
        ]
      }),

      commonjs(),
    ]
  };
  
  return config;
};
