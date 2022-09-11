import gulppkg from "gulp";
import size from "gulp-size";
const { src, dest } = gulppkg;

// include paths file
import { path } from "../paths.js";

// 'gulp fonts' -- copies fonts to temporary assets directory
function fonts ()  {
  return (
    src(path.srcAsset.fontFiles + "/**/*")
    .pipe(dest(path.tmpAssets.fontFilesTemp))
    .pipe(size({ title: "fonts" })))
}

export { fonts };

