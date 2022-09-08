"use strict";
var { src, dest } = require("gulp");
var newer = require("gulp-newer");

// include paths file
const path = require("../paths.js");

// 'gulp copy:assets' -- copies assets to /dist/
//   to avoid Jekyll overwriting the whole directory
function assetsCopy () {
  return (
    src([path.to.tmpAssets.assetFilesTemp + "/**/*", path.to.srcAsset.imageFiles + "/*.ico"])
    .pipe(dest(path.to.siteAssets.assetFilesSite)))
}

// 'gulp copy:images' -- copies unoptimized images to /dist/
function imagesCopy () {
  return (
    src([path.to.fileGlob.imageFilesGlob]) // do not process feature images
    .pipe(newer(path.to.fileGlob.imageFilesSite))
    .pipe(dest(path.to.fileGlob.imageFilesSite)))
}

// 'gulp copy:images:cached' -- copies cached images to /dist/
function imagesCopyCached () {
  if (process.env.CONTEXT === "production") {
    return(
    src("/opt/build/cache/assets/images" + "/**/*")
    .pipe(newer(path.to.siteAssets.imageFilesSite))
    .pipe(dest(path.to.siteAssets.imageFilesSite)))
  } else {
    return(
    src(path.to.tmpAssets.imageFilesTemp + "/**/*")
    .pipe(newer(path.to.siteAssets.imageFilesSite))
    .pipe(dest(path.to.siteAssets.imageFilesSite)))
  }
}

// 'gulp copy:icons' -- copies .ico assets to /dist/
function iconsCopy () {
  return (
    src(path.to.srcAsset.imageFiles + "/*.ico")
    .pipe(newer(path.to.siteAssets.imageFilesSite))
    .pipe(dest(path.to.siteAssets.imageFilesSite)))
}

// 'gulp copy:manifest' -- copies image json to /dist/
function manifestCopy () {
  return (
    src(path.to.srcAsset.imageFiles + "/*.json")
    .pipe(newer(path.to.siteAssets.imageFilesSite))
    .pipe(dest(path.to.siteAssets.imageFilesSite)))
}

// 'gulp copy:site' -- copies processed Jekyll site to /dist/
function siteCopy () {
  return (
    src([
      path.to.root.tempDir + "dist" + "/**/*",
      path.to.root.tempDir + "dist" + "/**/.*",
    ])
    .pipe(dest("dist")))
}

module.exports = {
  assetsCopy,
  imagesCopy,
  // imagesCopyCached,
  iconsCopy,
  manifestCopy,
  siteCopy
}
