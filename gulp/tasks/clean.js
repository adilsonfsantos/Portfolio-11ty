import { deleteAsync } from "del";

// include paths file
import { path } from "../paths.js";

// 'gulp clean:assets' -- removes temporary and built CSS/JS assets
function assetsClean() {
  return deleteAsync([
    "tmp" + "/**/*",
    "!" + path.tmpAssets.assetFilesTemp,
    path.siteAssets.assetFilesSite + "/**/*",
    "!" + path.siteAssets.imageFilesSite,
    "!" + path.siteAssets.imageFilesSite + "/**/*",
  ]);
}

// 'gulp clean:images' -- removes only image assets
function imagesClean () {
  return deleteAsync([path.siteAssets.imageFilesSite]);
}

// 'gulp clean:dist' -- removes built site but keep images
function distClean () {
  return deleteAsync(
    [
      "dist" + "/**/*",
      "!" + path.siteAssets.assetFilesSite,
      "!" + path.siteAssets.imageFilesSite,
      "!" + path.siteAssets.imageFilesSite + "/**/*",
    ],
    { dot: true }
  );
}

// 'gulp clean:gzip' -- removes gzip files
function gzipClean () {
  return deleteAsync(["dist" + "/**/*.gz"]);
}

// 'gulp clean:site' -- removes temporary source
function siteClean () {
  return deleteAsync([path.root.tempDir + "src"]);
}

export {
  imagesClean,
  assetsClean,
  distClean,
  gzipClean,
  siteClean
};

