import gulppkg from "gulp";
import newer from "gulp-newer";
const { src, dest } = gulppkg;

// include paths file
import { path } from "../paths.js";

// 'gulp copy:assets' -- copies assets to /dist/
//   to avoid Jekyll overwriting the whole directory
function assetsCopy () {
  return (
    src([path.tmpAssets.assetFilesTemp + "/**/*", path.srcAsset.imageFiles + "/*.ico"])
    .pipe(dest(path.siteAssets.assetFilesSite)))
}

// 'gulp copy:images' -- copies unoptimized images to /dist/
function imagesCopy () {
  return (
    src([path.fileGlob.imageFilesGlob]) // do not process feature images
    .pipe(newer(path.siteAssets.imageFilesSite))
    .pipe(dest(path.siteAssets.imageFilesSite)))
}

// 'gulp copy:images:cached' -- copies cached images to /dist/
function imagesCopyCached () {
  return process.env.CONTEXT === "production" ? (
    src("/opt/build/cache/assets/images" + "/**/*")
    .pipe(newer(siteAssets.imageFilesSite))
    .pipe(dest(path.siteAssets.imageFilesSite))) : (
    src(path.tmpAssets.imageFilesTemp + "/**/*")
    .pipe(newer(path.siteAssets.imageFilesSite))
    .pipe(dest(path.siteAssets.imageFilesSite)));
}

// 'gulp copy:icons' -- copies .ico assets to /dist/
function iconsCopy () {
  return (
    src(path.srcAsset.imageFiles + "/*.ico")
    .pipe(newer(path.siteAssets.imageFilesSite))
    .pipe(dest(path.siteAssets.imageFilesSite)))
}

// 'gulp copy:manifest' -- copies image json to /dist/
function manifestCopy () {
  return (
    src(path.srcAsset.imageFiles + "/*.json")
    .pipe(newer(path.siteAssets.imageFilesSite))
    .pipe(dest(path.siteAssets.imageFilesSite)))
}

// 'gulp copy:site' -- copies processed Jekyll site to /dist/
function siteCopy () {
  return (
    src([
      path.root.tempDir + "dist" + "/**/*",
      path.root.tempDir + "dist" + "/**/.*",
    ])
    .pipe(dest("dist")))
}

export {
  assetsCopy,
  imagesCopy,
  // imagesCopyCached,
  iconsCopy,
  manifestCopy,
  siteCopy
};

