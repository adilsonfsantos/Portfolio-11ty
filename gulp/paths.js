"use strict";
const src = "src",
      dist = "dist",
      tmp = "tmp",
      assets = "assets",
      css = "css",
      data = "_data",
      fonts = "fonts",
      img = "images",
      js = "js",
      sass = "_sass";

// Root locations.
const assetsDir = assets + "/",
      siteDir = dist + "/",
      sourceDir = src + "/",
      tempDir = tmp + "/",
      dataDir = data + "/";

// Glob patterns by file type.
const sassPattern = "/**/*.scss",
      jsPattern = "/**/*.js",
      imagePattern = "*.+(jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP)",
      markdownPattern = "/**/*.+(md|MD|markdown|MARKDOWN)",
      liquidPattern = "/**/*.liquid",
      txtPattern = "/**/*.txt",
      xmlPattern = "/**/*.{xml,json}",
      ymlPattern = "/**/*.yml";

module.exports = {
  to: {

    // Root locations.
    root: {
      assetsDir: assets + "/",
      siteDir: dist + "/",
      sourceDir: src + "/",
      tempDir: tmp + "/",
      dataDir: data + "/",
},

    // Source asset files locations.
    srcAsset: {
      sassFiles: sourceDir + sass,
      jsFiles: sourceDir + assetsDir + js,
      imageFiles: sourceDir + assetsDir + img,
      fontFiles: sourceDir + assetsDir + fonts,
      dataFiles: sourceDir + data,
    },

    // Temp asset files locations.
    tmpAssets: {
      assetFilesTemp: tempDir + assetsDir,
      sassFilesTemp: tempDir + assetsDir + css,
      jsFilesTemp: tempDir + assetsDir + js,
      imageFilesTemp: tempDir + assetsDir + img,
      fontFilesTemp: tempDir + assetsDir + fonts,
      dataFilesTemp: tempDir + dataDir,
    },

    // Site asset files locations.
    siteAssets: {
      assetFilesSite: siteDir + assetsDir,
      sassFilesSite: siteDir + assetsDir + css,
      jsFilesSite: siteDir + assetsDir + js,
      imageFilesSite: siteDir + assetsDir + img,
      fontFilesSite: siteDir + assetsDir + fonts,
    },

    // File globs
    fileGlob: {
      liquidFilesGlob: src + liquidPattern,
      imageFilesGlob: sourceDir + assetsDir + img + imagePattern,
      jsFilesGlob: sourceDir + assetsDir + js + jsPattern,
      mdFilesGlob: src + markdownPattern,
      sassFilesGlob: sourceDir + sass + sassPattern,
      txtFilesGlob: src + txtPattern,
      xmlFilesGlob: src + xmlPattern,
      ymlFilesGlob: src + ymlPattern,
    },
  }
}
//     // Source asset files locations.
// paths.sassFiles = paths.sourceDir + paths.sass;
// paths.jsFiles = paths.sourceDir + paths.assetsDir + paths.js;
// paths.imageFiles = paths.sourceDir + paths.assetsDir + paths.img;
// paths.fontFiles = paths.sourceDir + paths.assetsDir + paths.fonts;

// // Temp asset files locations.
// paths.assetFilesTemp = paths.tempDir + paths.assetsDir;
// paths.sassFilesTemp = paths.tempDir + paths.assetsDir + paths.css;
// paths.jsFilesTemp = paths.tempDir + paths.assetsDir + paths.js;
// paths.imageFilesTemp = paths.tempDir + paths.assetsDir + paths.img;
// paths.fontFilesTemp = paths.tempDir + paths.assetsDir + paths.fonts;
// paths.dataFilesTemp = paths.tempDir + paths.dataDir;
// // Site asset files locations.
// paths.assetFilesSite = paths.siteDir + paths.assetsDir;
// paths.sassFilesSite = paths.siteDir + paths.assetsDir + paths.css;
// paths.jsFilesSite = paths.siteDir + paths.assetsDir + paths.js;
// paths.imageFilesSite = paths.siteDir + paths.assetsDir + paths.img;
// paths.fontFilesSite = paths.siteDir + paths.assetsDir + paths.fonts;

// // Glob patterns by file type.
// paths.sassPattern = "/**/*.scss";
// paths.jsPattern = "/**/*.js";
// paths.imagePattern = "*.+(jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP)";
// paths.markdownPattern = "/**/*.+(md|MD|markdown|MARKDOWN)";
// paths.liquidPattern = "/**/*.liquid";
// paths.txtPattern = "/**/*.txt";
// paths.xmlPattern = "/**/*.{xml,json}";
// paths.ymlPattern = "/**/*.yml";

// // File globs
// paths.liquidFilesGlob = paths.src + paths.liquidPattern;
// paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
// paths.jsFilesGlob = paths.jsFiles + paths.jsPattern;
// paths.mdFilesGlob = paths.src + paths.markdownPattern;
// paths.sassFilesGlob = paths.sassFiles + paths.sassPattern;
// paths.txtFilesGlob = paths.src + paths.txtPattern;
// paths.xmlFilesGlob = paths.src + paths.xmlPattern;
// paths.ymlFilesGlob = paths.src + paths.ymlPattern;

// // eslint-disable-next-line no-unused-vars
// var imageFilesCachePath;

// eslint-disable-next-line no-undef
// if (process.env.CONTEXT === "production") {
//   paths.imageFilesCachePath = "/opt/build/cache/assets/images";
// } else {
//   paths.imageFilesCachePath = paths.imageFilesTemp;
// }
