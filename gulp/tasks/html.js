"use strict";
var argv = require("yargs").argv;
var critical = require("critical").stream;
var gulp = require("gulp");
var gzip = require("gulp-gzip");
var htmlmin = require("gulp-htmlmin");
var size = require("gulp-size");
var when = require("gulp-if");

// include paths file
var paths = require("../paths");

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips HTML files for production
gulp.task("html", () => {
  return gulp
    .src(paths.dist + paths.liquidPattern)
    .pipe(
      when(
        argv.prod,
        htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: false,
          removeAttributeQuotes: false,
          removeRedundantAttributes: false,
          minifyJS: true,
          minifyCSS: true,
        })
      )
    )
    // .pipe(when(argv.prod, size()))
    .pipe(when(argv.prod, gulp.dest(paths.dist)))
    .pipe(when(argv.prod, gzip({ append: true })))
    .pipe(
      when(
        argv.prod,
        size({
          title: "gzipped HTML",
          gzip: true,
        })
      )
    )
    .pipe(when(argv.prod, gulp.dest(paths.dist)));
});

// Page dimensions for critical CSS
var pageDimensions = [
  {
    width: 240,
    height: 320,
  },
  {
    width: 320,
    height: 568,
  },
  {
    width: 1024,
    height: 1024,
  },
  {
    width: 1366,
    height: 768,
  },
];

// 'gulp styles:critical:page' -- extract layout.archive critical CSS
//   into /_includes/critical-page.css
gulp.task("styles:critical:page", () => {
  return gulp
    .src(paths.tempDir + paths.siteDir + "/sobre/index.html")
    .pipe(
      critical({
        base: "./",
        inline: false,
        css: [paths.sassFilesTemp + "/page.css"],
      })
    );
});

// 'gulp styles:critical:post' -- extract layout.post critical CSS
//   into /_includes/critical-post.css
gulp.task("styles:critical:post", () => {
  return gulp
    .src(paths.tempDir + paths.siteDir + "projetos/plaenge/index.html")
    .pipe(
      critical({
        base: "./",
        inline: false,
        css: [paths.sassFilesTemp + "/post.css"],
      })
    );
});

// 'gulp styles:critical:home' -- extract layout.home critical CSS
//   into /_includes/critical-home.css
gulp.task("styles:critical:home", () => {
  return gulp.src(paths.tempDir + paths.siteDir + "index.html").pipe(
    critical({
      base: "./",
      inline: false,
      css: [paths.sassFilesTemp + "/home.css"],
    })
  );
});

// 'gulp styles:critical:404' -- extract layout.home critical CSS
//   into /_includes/critical-404.css
gulp.task("styles:critical:404", () => {
  return gulp.src(paths.tempDir + paths.siteDir + "404.html").pipe(
    critical({
      base: "./",
      inline: false,
      css: [paths.sassFilesTemp + "/404.css"],
    })
  );
});
