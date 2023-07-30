"use strict";
const { src, dest } = require("gulp");
const cp = require("child_process");
const size = require("gulp-size");

const path = require("../paths.js");

// 'gulp site:tmp' -- copies 11ty site to a temporary directory to be processed
function siteTmp() {
  return src(
    [
      "src" + "/**/*",
      "!" + path.to.root.sourceDir + "assets" + "/**/*",
      "!" + path.to.root.sourceDir + "assets",
    ],
    { dot: true }
  )
    .pipe(dest(path.to.root.tempDir + "src"))
    .pipe(size({ title: "11ty" }));
}

// 'gulp site' -- builds site with development settings
// 'gulp site --prod' -- builds site with production settings

function site() {
  return cp.spawn("npx", ["eleventy", "--incremental"], {
    stdio: "inherit",
    shell: true,
  });
}

module.exports = {
  siteTmp,
  site,
};
