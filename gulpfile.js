"use strict";
const gulp = require("gulp");
const requireDir = require("require-dir");
// eslint-disable-next-line no-unused-vars
const tasks = requireDir("./gulp/tasks", { recurse: true });
// eslint-disable-next-line no-unused-vars
const paths = require("./gulp/paths");

// 'gulp build:site' -- copies, replaces rev'd references, builds, and then copies it again
gulp.task("build:site", gulp.series("site:tmp", "site", "copy:site"));

// 'gulp assets' -- removes assets and rebuilds them
// 'gulp assets --prod' -- same as above but with production settings
gulp.task(
  "assets",
  gulp.series(
    gulp.series("scripts", "styles", "fonts"),
    gulp.series(
      "scripts:gzip",
      "styles:gzip",
      "copy:assets",
      "copy:images:cached",
      "copy:images",
      "copy:manifest"
    )
  )
);

// 'gulp clean' -- removes assets and gzipped files
gulp.task(
  "clean",
  gulp.parallel("clean:assets", "clean:images", "clean:gzip", "clean:dist", "clean:site")
);

// 'gulp build' -- same as 'gulp' but doesn't serve site
// 'gulp build --prod' -- same as above but with production settings
gulp.task("build", gulp.series("clean", "assets", "build:site", "html"));

// 'gulp critical' -- builds critical path CSS includes
//   WARNING: run this after substantial CSS changes
//   WARNING: .html files referenced need to exist, run after `gulp build` to ensure.
gulp.task(
  "critical",
  gulp.series(
    "styles:critical:home",
    "styles:critical:post",
    "styles:critical:page",
    "styles:critical:404"
  )
);

// 'gulp' -- removes assets and gzipped files, creates assets and revs version
//   in includes or layouts, builds site, serves site
// 'gulp --prod' -- same as above but with production settings
gulp.task("default", gulp.series("build", "serve"));
