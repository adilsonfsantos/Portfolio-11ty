"use strict";
const { series, parallel } = require("gulp");
const { siteTmp, site } = require("./gulp/tasks/build.js");
const { scripts, styles, gzipScripts, gzipStyles } = require("./gulp/tasks/assets.js");
const serve = require("./gulp/tasks/serve.js");
const fonts = require("./gulp/tasks/fonts.js");
const { html, pageCritical, postCritical, homeCritical, errorCritical } = require("./gulp/tasks/html.js")
const { assetsCopy, imagesCopy, imagesCopyCached, manifestCopy, siteCopy } = require("./gulp/tasks/copy.js")
const { assetsClean, imagesClean, gzipClean, distClean, siteClean } = require("./gulp/tasks/clean.js");

// 'gulp build:site' -- copies, replaces rev'd references, builds, and then copies it again
exports.buildSite = series(siteTmp, site, siteCopy);

// 'gulp assets' -- removes assets and rebuilds them
// 'gulp assets --prod' -- same as above but with production settings
exports.assets =
  series(
    series(scripts, styles, fonts),
    series(
      gzipScripts,
      gzipStyles,
      assetsCopy,
      imagesCopyCached,
      imagesCopy,
      manifestCopy
    )
  );

// 'gulp clean' -- removes assets and gzipped files
exports.clean = parallel(assetsClean, imagesClean, gzipClean, distClean, siteClean);

// 'gulp build' -- same as 'gulp' but doesn't serve site
// 'gulp build --prod' -- same as above but with production settings
exports.build =
  series(
    parallel(assetsClean, imagesClean, gzipClean, distClean, siteClean),
    series(scripts, styles, fonts, gzipScripts, gzipStyles, assetsCopy,
    imagesCopyCached,
    imagesCopy,
    manifestCopy),
    series(siteTmp, site, siteCopy),
    html
  );

// 'gulp critical' -- builds critical path CSS includes
//   WARNING: run this after substantial CSS changes
//   WARNING: .html files referenced need to exist, run after `gulp build` to ensure.
exports.critical =
  series(
    pageCritical,
    postCritical,
    homeCritical,
    errorCritical
  );

// 'gulp' -- removes assets and gzipped files, creates assets and revs version
//   in includes or layouts, builds site, serves site
// 'gulp --prod' -- same as above but with production settings
exports.default =
  series(
    parallel(assetsClean, imagesClean, gzipClean, distClean, siteClean),
    scripts, styles, fonts, gzipScripts, gzipStyles, assetsCopy, imagesCopy, imagesCopyCached, manifestCopy,
    siteTmp, site, siteCopy, html, serve
  );
