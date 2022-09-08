"use strict";
const argv = require("yargs").argv;
const critical = require("critical").stream;
const { src, dest } = require("gulp");
const gzip = require("gulp-gzip");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const when = require("gulp-if");

// include paths file
const path = require("../paths.js");

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips HTML files for production
function html() {
  return (
      src("dist" + "/**/*.liquid")
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
      .pipe(when(argv.prod, dest("dist")))
      .pipe(when(argv.prod, gzip({ append: true })))
      .pipe(
        when(
          argv.prod,
          size({
            title: "Gzip HTML",
            gzip: true,
          })
        )
      )
      .pipe(when(argv.prod, dest("dist")))
  );
}

// 'gulp styles:critical:page' -- extract layout.archive critical CSS
//   into /_includes/critical-page.css
function pageCritical() {
  return (
    src(path.to.root.tempDir + path.to.root.siteDir + "/sobre/index.html")
    .pipe(
      critical({
        base: "./",
        inline: false,
        css: [path.to.tmpAssets.sassFilesTemp + "/page.**"],
        dimensions: [
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
        ],
      })
    )
  );
}

// 'gulp styles:critical:post' -- extract layout.post critical CSS
//   into /_includes/critical-post.css
function postCritical() {
  return(
    src(path.to.root.tempDir + path.to.root.siteDir + "projetos/plaenge/index.html")
    .pipe(
      critical({
        base: "./",
        inline: false,
        css: [path.to.tmpAssets.sassFilesTemp + "/post.**"],
        dimensions: [
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
        ],
      })
    )
  );
}

// 'gulp styles:critical:home' -- extract layout.home critical CSS
//   into /_includes/critical-home.css
function homeCritical() {
  return src(path.to.root.tempDir + path.to.root.siteDir + "index.html").pipe(
    critical({
      base: "./",
      inline: false,
      css: [path.to.tmpAssets.sassFilesTemp + "/home.**"],
      dimensions: [
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
      ],
    })
  );
}

// 'gulp styles:critical:404' -- extract layout.home critical CSS
//   into /_includes/critical-404.css
function errorCritical() {
  return src(path.to.root.tempDir + path.to.root.siteDir + "404.html").pipe(
    critical({
      base: "./",
      inline: false,
      css: [path.to.tmpAssets.sassFilesTemp + "/404.**"],
      dimensions: [
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
      ],
    })
  );
}

module.exports = {
  html,
  pageCritical,
  postCritical,
  homeCritical,
  errorCritical
}
