"use strict";
const argv = require("yargs").argv;
const autoprefixer = require("autoprefixer");
const babelify = require("babelify");
const bro = require("gulp-bro");
const browserSync = require("browser-sync").create();
const cssnano = require("cssnano");
const { src, dest } = require("gulp");
const gzip = require("gulp-gzip");
const postcss = require("gulp-postcss");
const rev = require("gulp-rev");
const sass = require("gulp-sass")(require("sass"));
const size = require("gulp-size");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const when = require("gulp-if");

// include paths file
const path = require("../paths.js");

// 'gulp scripts' -- creates a index.js file with Sourcemap from your JavaScript files
// 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
//   minifies, and cache busts it (does not create a Sourcemap)
function scripts() {
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  return (
    src([path.to.srcAsset.jsFiles + "/*.js"])
      .pipe(
        bro({
          _transform: [
            babelify.configure({ presets: ["@babel/preset-env"] }),
          ],
          get transform() {
            return this._transform;
          },
          set transform(value) {
            this._transform = value;
          },
        })
      )
      .pipe(when(!argv.prod, sourcemaps.init()))
      .pipe(size({ showFiles: true }))
      .pipe(when(argv.prod, when("*.js", uglify())))
      .pipe(when(!argv.prod, sourcemaps.write(".")))
      .pipe(dest(path.to.tmpAssets.jsFilesTemp))
      // JS cache bursting
      .pipe(rev())
      .pipe(size({ title: "scripts", showFiles: true }))
      // gera arquivos compactados
      .pipe(when(argv.prod, dest(path.to.tmpAssets.jsFilesTemp)))
      // gera manifesto dos arquivos compactados
      .pipe(rev.manifest("js-manifest.json"))
      // .pipe(dest(path.tempDir + paths.sourceDir + paths.data))
      .pipe(
        dest(
          path.to.root.tempDir +
            path.to.root.sourceDir +
            path.to.root.dataDir
        )
      )
      .pipe(size({ title: "scripts json", showFiles: true }))
  );
}

// 'gulp scripts:gzip --prod' -- gzips JS
function gzipScripts() {
  return src([path.to.tmpAssets.jsFilesTemp + "/*.js"])
    .pipe(when(argv.prod, when("*.js", gzip({ append: true }))))
    .pipe(
      when(
        argv.prod,
        size({
          gzip: true,
          showFiles: true,
          title: "Gzip scripts",
        })
      )
    )
    .pipe(when(argv.prod, dest(path.to.tmpAssets.jsFilesTemp)));
}

// 'gulp styles' -- creates a CSS file from SCSS, adds prefixes and creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SCSS, adds prefixes,
function styles() {
  var plugins = [autoprefixer(), cssnano()];
  return (
    src([path.to.srcAsset.sassFiles + "/*.scss"])
      .pipe(when(!argv.prod, sourcemaps.init()))
      .pipe(sass().on("error", sass.logError))
      .pipe(
        sass({
          includePaths: [path.to.srcAsset.sassFiles], // Tell Sass where to look for files
        }).on("error", sass.logError)
      )
      .pipe(when(argv.prod, when("*.css", postcss(plugins))))
      .pipe(when(argv.prod, postcss(plugins)))
      .pipe(size({ showFiles: true }))
      .pipe(when(argv.prod, sourcemaps.write(".")))
      .pipe(when(argv.prod, dest(path.to.tmpAssets.sassFilesTemp + "/")))
      // CSS cache bursting
      .pipe(rev())
      .pipe(size({ title: "Styles json", showFiles: true }))
      // gera arquivos compactados
      .pipe(dest(path.to.tmpAssets.sassFilesTemp + "/"))
      .pipe(rev.manifest("css-manifest.json"))
      .pipe(
        dest(
          path.to.root.tempDir +
            path.to.root.sourceDir +
            path.to.root.dataDir
        )
      )
      .pipe(
        when(argv.prod, size({ title: "Styles json", showFiles: true }))
      )
      .pipe(when(!argv.prod, browserSync.stream()))
  );
}

// 'gulp styles:gzip --prod' -- gzips CSS
function gzipStyles() {
  return src([path.to.tmpAssets.sassFilesTemp + "/*.css"])
    .pipe(when(argv.prod, when("*.css", gzip({ append: true }))))
    .pipe(
      when(
        argv.prod,
        size({
          gzip: true,
          showFiles: true,
          title: "Gzip styles",
        })
      )
    )
    .pipe(when(argv.prod, dest(path.to.tmpAssets.sassFilesTemp)));
}

module.exports = {
  scripts,
  styles,
  gzipScripts,
  gzipStyles,
};
