"use strict";
const gulp = require("gulp");
const cp = require("child_process");
const size = require("gulp-size");

const paths = require("../paths");

// 'gulp site:tmp' -- copies Jekyll site to a temporary directory to be processed
gulp.task("site:tmp", () => {
  return gulp
    .src(
      [
        paths.src + "/**/*",
        "!" + paths.sourceDir + paths.assets + "/**/*",
        "!" + paths.sourceDir + paths.assets,
      ],
      { dot: true }
    )
    .pipe(gulp.dest(paths.tempDir + paths.src))
    .pipe(size({ title: "11ty" }));
});

// 'gulp site' -- builds site with development settings
// 'gulp site --prod' -- builds site with production settings
gulp.task("site", () => {
  return cp.spawn("npx", ["eleventy", "--quiet"], {
    stdio: "inherit",
  });
});
