"use strict";
var paths = {};
paths.tasks = "gulp/tasks";
paths.src = "src";
paths.dist = "dist";
paths.tmp = "tmp";
paths.assets = "assets";
paths.css = "css";
paths.data = "_data";
paths.fonts = "fonts";
paths.img = "images";
paths.includes = "_includes";
paths.js = "js";
paths.sass = "_sass";

// Directory locations.
paths.assetsDir = paths.assets + "/";
paths.siteDir = paths.dist + "/";
paths.sourceDir = paths.src + "/";
paths.tempDir = paths.tmp + "/";
paths.dataDir = paths.data + "/";

// Source asset files locations.
paths.sassFiles = paths.sourceDir + paths.sass;
paths.jsFiles = paths.sourceDir + paths.assetsDir + paths.js;
paths.imageFiles = paths.sourceDir + paths.assetsDir + paths.img;
paths.fontFiles = paths.sourceDir + paths.assetsDir + paths.fonts;

// Temp asset files locations.
paths.assetFilesTemp = paths.tempDir + paths.assetsDir;
paths.sassFilesTemp = paths.tempDir + paths.assetsDir + paths.css;
paths.jsFilesTemp = paths.tempDir + paths.assetsDir + paths.js;
paths.imageFilesTemp = paths.tempDir + paths.assetsDir + paths.img;
paths.fontFilesTemp = paths.tempDir + paths.assetsDir + paths.fonts;
paths.dataFilesTemp = paths.tempDir + paths.dataDir;
// Site asset files locations.
paths.assetFilesSite = paths.siteDir + paths.assetsDir;
paths.sassFilesSite = paths.siteDir + paths.assetsDir + paths.css;
paths.jsFilesSite = paths.siteDir + paths.assetsDir + paths.js;
paths.imageFilesSite = paths.siteDir + paths.assetsDir + paths.img;
paths.fontFilesSite = paths.siteDir + paths.assetsDir + paths.fonts;

// Glob patterns by file type.
paths.sassPattern = "/**/*.scss";
paths.jsPattern = "/**/*.js";
paths.imagePattern = "*.+(jpg,JPG,jpeg,JPEG,webp,WEBP)";
paths.markdownPattern = "/**/*.+(md|MD|markdown|MARKDOWN)";
paths.liquidPattern = "/**/*.liquid";
paths.txtPattern = "/**/*.txt";
paths.xmlPattern = "/**/*.{xml,json}";
paths.ymlPattern = "/**/*.yml";

// File globs
paths.liquidFilesGlob = paths.src + paths.liquidPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.jsFilesGlob = paths.jsFiles + paths.jsPattern;
paths.mdFilesGlob = paths.src + paths.markdownPattern;
paths.sassFilesGlob = paths.sassFiles + paths.sassPattern;
paths.txtFilesGlob = paths.src + paths.txtPattern;
paths.xmlFilesGlob = paths.src + paths.xmlPattern;
paths.ymlFilesGlob = paths.src + paths.ymlPattern;

var imageFilesCachePath;

if (process.env.CONTEXT === "production") {
  paths.imageFilesCachePath = "/opt/build/cache/assets/images";
} else {
  paths.imageFilesCachePath = paths.imageFilesTemp;
}

module.exports = paths;
