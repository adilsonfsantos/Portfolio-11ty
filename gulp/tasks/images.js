"use strict";
var assetCache = require("gulp-asset-cache");
var gulp = require("gulp");
var responsive = require("@cjquines/gulp-responsive");

// include paths file
var paths = require("../paths");

// 'gulp images' -- resize images
gulp.task("images", () => {
  return gulp
    .src([
      paths.imageFiles + "/*",
      // paths.imagePattern,
      "!" + paths.imageFiles + "/*.{gif,svg}",
      "!" + paths.imageFiles + "/thumbnail.jpg",
    ])
    .pipe(assetCache.filter(paths.imageFilesCachePath + "/.image-cache"))
    .pipe(
      responsive(
        {
          // resize all images
          "*": [
            {
              width: 42,
              blur: 2,
              rename: { suffix: "-lq", extname: ".jpg" },
            },
            {
              width: 320,
              rename: { suffix: "-320", extname: ".jpg" },
            },
            {
              width: 480,
              rename: { suffix: "-480", extname: ".jpg" },
            },
            {
              width: 768,
              rename: { suffix: "-768", extname: ".jpg" },
            },
            {
              width: 992,
              rename: { suffix: "-992", extname: ".jpg" },
            },
            {
              width: 1200,
              rename: { extname: ".jpg" },
            },
            {
              width: 1920,
              rename: { suffix: "-1920", extname: ".jpg" },
            },
            {
              width: 320,
              rename: { suffix: "-320", extname: ".webp" },
            },
            {
              width: 480,
              rename: { suffix: "-480", extname: ".webp" },
            },
            {
              width: 768,
              rename: { suffix: "-768", extname: ".webp" },
            },
            {
              width: 992,
              rename: { suffix: "-1024", extname: ".webp" },
            },
            {
              width: 1200,
              rename: { suffix: "-1366", extname: ".webp" },
            },
            {
              width: 1920,
              rename: { suffix: "-1920", extname: ".webp" },
            },
          ],
        },
        {
          // global configuration for all images
          quality: 95,
          progressive: true,
          withMetadata: false,
          errorOnUnusedConfig: false,
          withoutChromaSubsampling: true,
        }
      )
    )
    .pipe(gulp.dest(paths.imageFilesCachePath)) // write to cache
    .pipe(assetCache.cache());
});
