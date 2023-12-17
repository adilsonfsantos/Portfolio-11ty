const { build } = require("esbuild");
const fs = require("node:fs");
const { sassPlugin } = require("esbuild-sass-plugin");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");
// const jsObj = JSON.parse(fs.readFileSync("./src/_data/metajs.json"));
// const cssObj = JSON.parse(fs.readFileSync("./src/_data/metacss.json"));

// COMPILE
function jsBuild() {
  build({
    entryPoints: ["node_modules/instant.page/instantpage.js"],
    entryNames: "[name]-[hash]",
    bundle: true,
    minify: true,
    sourcemap: true,
    metafile: true,
    logLevel: "info",
    outfile: "dist/assets/js/main.js",
  })
    .then((result) => {
      fs.writeFileSync("src/_data/metajs.json", JSON.stringify(result, null, 2));
    })
    .catch(() => process.exit(1));
}

function cssBuild() {
  build({
    entryPoints: ["src/assets/css/*.scss"],
    entryNames: "[name]-[hash]",
    bundle: true,
    minify: true,
    sourcemap: false,
    metafile: true,
    logLevel: "info",
    outdir: "dist/assets/css/",
    external: ["/assets/*"],
    plugins: [
      sassPlugin({
        async transform(source) {
          const { css } = await postcss([postcssPresetEnv({ stage: 3 })]).process(source, {
            from: undefined,
          });
          return css;
        },
      }),
    ],
  })
    .then((result) => {
      fs.writeFileSync("src/_data/metacss.json", JSON.stringify(result, null, 2));
    })
    .catch(() => process.exit(1));
}
module.exports = { jsBuild, cssBuild };

/*   eleventyConfig.addGlobalData(
    "mainjs",
    Object.keys(jsObj.metafile.outputs)[1]
  );
  eleventyConfig.addGlobalData(
    "404css",
    Object.keys(jsObj.metafile.outputs)[1]
  );
  eleventyConfig.addGlobalData(
    "homecss",
    Object.keys(cssObj.metafile.outputs)[3]
  );
  eleventyConfig.addGlobalData(
    "pagecss",
    Object.keys(cssObj.metafile.outputs)[5]
  );
  eleventyConfig.addGlobalData(
    "postcss",
    Object.keys(cssObj.metafile.outputs)[7]
  ); */
