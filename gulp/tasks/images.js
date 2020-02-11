"use strict";
var assetCache = require("gulp-asset-cache");
var gulp = require("gulp");
var responsive = require("gulp-responsive");

// include paths file
var paths = require("../paths");

// 'gulp images' -- resize images
gulp.task("images", () => {
  return gulp
    .src([
      paths.imageFiles + "/*",
      // paths.imagePattern,
      "!" + paths.imageFiles + "/*.{gif,svg}",
      "!" + paths.imageFiles + "/thumbnail.jpg"
    ])
    .pipe(assetCache.filter(paths.imageFilesCachePath + "/.image-cache"))
    .pipe(
      responsive(
        {
          // resize all images
          "*.jpg": [
            {
              width: 42,
              blur: 2,
              rename: { suffix: "-lq" }
            },
            {
              width: 240,
              rename: { suffix: "-240" }
            },
            {
              width: 480,
              rename: { suffix: "-480" }
            },
            {
              width: 640,
              rename: { suffix: "-640" }
            },
            {
              width: 768,
              rename: { suffix: "-768" }
            },
            {
              width: 1024,
              rename: { suffix: "-1024" }
            },
            {
              width: 1366,
              rename: { suffix: "-1366" }
            },
            {
              width: 1600,
              rename: { suffix: "-1600" }
            },
            {
              width: 1920,
              rename: { suffix: "-1920" }
            },
            {
              width: 240,
              rename: { suffix: "-240", extname: ".webp" }
            },
            {
              width: 480,
              rename: { suffix: "-480", extname: ".webp" }
            },
            {
              width: 640,
              rename: { suffix: "-640", extname: ".webp" }
            },
            {
              width: 768,
              rename: { suffix: "-768", extname: ".webp" }
            },
            {
              width: 1024,
              rename: { suffix: "-1024", extname: ".webp" }
            },
            {
              width: 1366,
              rename: { suffix: "-1366", extname: ".webp" }
            },
            {
              width: 1600,
              rename: { suffix: "-1600", extname: ".webp" }
            },
            {
              width: 1920,
              rename: { suffix: "-1920", extname: ".webp" }
            },
          ]
        },
        {
          // global configuration for all images
          quality: 80,
          progressive: true,
          withMetadata: false,
          errorOnUnusedConfig: false
        }
      )
    )
    .pipe(gulp.dest(paths.imageFilesCachePath)) // write to cache
    .pipe(assetCache.cache());
});
