"use strict";
const del = require("del");

// include paths file
const path = require("../paths.js");

// 'gulp clean:assets' -- removes temporary and built CSS/JS assets
function assetsClean() {
  return del([
    "tmp" + "/**/*",
    "!" + path.to.tmpAssets.assetFilesTemp,
    path.to.siteAssets.assetFilesSite + "/**/*",
    "!" + path.to.siteAssets.imageFilesSite,
    "!" + path.to.siteAssets.imageFilesSite + "/**/*",
  ]);
}

// 'gulp clean:images' -- removes only image assets
function imagesClean () {
  return del([path.to.siteAssets.imageFilesSite]);
}

// 'gulp clean:dist' -- removes built site but keep images
function distClean () {
  return del(
    [
      "dist" + "/**/*",
      "!" + path.to.siteAssets.assetFilesSite,
      "!" + path.to.siteAssets.imageFilesSite,
      "!" + path.to.siteAssets.imageFilesSite + "/**/*",
    ],
    { dot: true }
  );
}

// 'gulp clean:gzip' -- removes gzip files
function gzipClean () {
  return del(["dist" + "/**/*.gz"]);
}

// 'gulp clean:site' -- removes temporary source
function siteClean () {
  return del([path.to.root.tempDir + "src"]);
}

module.exports = {
  imagesClean,
  assetsClean,
  distClean,
  gzipClean,
  siteClean
}
