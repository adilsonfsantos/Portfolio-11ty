import gulppkg from "gulp";
import size from "gulp-size";
import cp from "node:child_process";
const { src, dest } = gulppkg;

import { path } from "../paths.js";

// 'gulp site:tmp' -- copies 11ty site to a temporary directory to be processed
function siteTmp () {
  return src(
      [
        "src" + "/**/*",
        "!" + path.root.sourceDir + "assets" + "/**/*",
        "!" + path.root.sourceDir + "assets",
      ],
      { dot: true }
    )
    .pipe(dest(path.root.tempDir + "src"))
    .pipe(size({ title: "11ty" }));
}

// 'gulp site' -- builds site with development settings
// 'gulp site --prod' -- builds site with production settings

function site () {
  return cp.spawn("npx", ["eleventy", "--incremental"], {
    stdio: "inherit", shell: true
  });
}

export {
  siteTmp,
  site
};

