// rollup.config.js
import resolve from "@rollup/plugin-node-resolve"; // For resolving modules
import commonjs from "@rollup/plugin-commonjs"; // For handling CommonJS modules
// import cleanup from "rollup-plugin-cleanup";
// import filesize from "rollup-plugin-filesize";

export default {
  input: "src/index.js", // Your entry point
  output: {
    file: "dist/bundle.js", // Output file
    format: "esm", // Output as ESM
    // plugins: [filesize()],
  },

  plugins: [resolve(), commonjs()],
};
