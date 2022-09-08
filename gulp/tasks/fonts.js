"use strict";
var { src, dest } = require("gulp");
var size = require("gulp-size");

// include paths file
const path = require("../paths.js");

// 'gulp fonts' -- copies fonts to temporary assets directory
function fonts ()  {
  return (
    src(path.to.srcAsset.fontFiles + "/**/*")
    .pipe(dest(path.to.tmpAssets.fontFilesTemp))
    .pipe(size({ title: "fonts" })))
}

module.exports = fonts
