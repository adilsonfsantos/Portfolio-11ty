import gulppkg from "gulp";
const { parallel, series } = gulppkg;
// const requireDir = require("require-dir");
import { gzipScripts, gzipStyles, scripts, styles } from "./gulp/tasks/assets.js";
import { site, siteTmp } from "./gulp/tasks/build.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { errorCritical, homeCritical, html, pageCritical, postCritical } from "./gulp/tasks/html.js";
import { serve } from "./gulp/tasks/serve.js";
// const { assetsCopy, imagesCopyCached, imagesCopy, manifestCopy, siteCopy } = require("./gulp/tasks/copy.js")
import { assetsClean, distClean, gzipClean, imagesClean, siteClean } from "./gulp/tasks/clean.js";
import { assetsCopy, imagesCopy, manifestCopy, siteCopy } from "./gulp/tasks/copy.js";
export const buildSite = series(siteTmp, site, siteCopy);

import { path } from "./gulp/paths.js";

export const assets =
  series(
    series(scripts, styles, fonts),
    series(
      gzipScripts,
      gzipStyles,
      assetsCopy,
      // imagesCopyCached,
      imagesCopy,
      manifestCopy
    )
  );

export const clean = parallel(assetsClean, imagesClean, gzipClean, distClean, siteClean);

export const build =
  series(
    parallel(assetsClean, imagesClean, gzipClean, distClean, siteClean),
    series(scripts, styles, fonts, gzipScripts, gzipStyles, assetsCopy,
    // imagesCopyCached,
    imagesCopy,
    manifestCopy),
    series(siteTmp, site, siteCopy),
    html
  );

export const critical =
  series(
    pageCritical,
    postCritical,
    homeCritical,
    errorCritical
  );

// 'gulp' -- removes assets and gzipped files, creates assets and revs version
//   in includes or layouts, builds site, serves site
// 'gulp --prod' -- same as above but with production settings
// task("default", series("build", "serve"));

async function test () {
  Object.keys(path).map(key => {
    console.log(path[key])
  })
};

export const pathLog = test;

// console.log(Object.values(path))
const _default = series(parallel(assetsClean, imagesClean, gzipClean, distClean, siteClean),
  scripts, styles, fonts, gzipScripts, gzipStyles, assetsCopy, imagesCopy, manifestCopy,
  siteTmp, site, siteCopy, html, serve
);
export { _default as default };
