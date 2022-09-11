import { stream as critical } from "critical";
import gulppkg from "gulp";
import gzip from "gulp-gzip";
import htmlmin from "gulp-htmlmin";
import when from "gulp-if";
import size from "gulp-size";
import argv from "yargs";
const { src, dest } = gulppkg;

// include paths file
import { path } from "../paths.js";

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
    src(path.root.tempDir + path.root.siteDir + "/sobre/index.html")
    .pipe(
      critical({
        base: "./",
        inline: false,
        css: [path.tmpAssets.sassFilesTemp + "/page.**"],
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
    src(path.root.tempDir + path.root.siteDir + "projetos/plaenge/index.html")
    .pipe(
      critical({
        base: "./",
        inline: false,
        css: [path.tmpAssets.sassFilesTemp + "/post.**"],
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
  return src(path.root.tempDir + path.root.siteDir + "index.html").pipe(
    critical({
      base: "./",
      inline: false,
      css: [path.tmpAssets.sassFilesTemp + "/home.**"],
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
  return src(path.root.tempDir + path.root.siteDir + "404.html").pipe(
    critical({
      base: "./",
      inline: false,
      css: [path.tmpAssets.sassFilesTemp + "/404.**"],
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

export {
  html,
  pageCritical,
  postCritical,
  homeCritical,
  errorCritical
};

