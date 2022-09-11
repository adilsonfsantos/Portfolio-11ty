import autoprefixer from "autoprefixer";
import babelify from "babelify";
import browserSync from "browser-sync";
import cssnano from "cssnano";
import gulppkg from "gulp";
import bro from "gulp-bro";
import gzip from "gulp-gzip";
import when from "gulp-if";
import postcss from "gulp-postcss";
import rev from "gulp-rev";
import gulpSass from 'gulp-sass';
import size from "gulp-size";
import sourcemaps from "gulp-sourcemaps";
import uglify_ from "gulp-uglify-es";
import dartSass from 'sass';
import argv from "yargs";
const { src, dest } = gulppkg;
const sass = gulpSass(dartSass);

// Added due to bug with esm https://gitlab.com/itayronen/gulp-uglify-es/-/issues/21
const uglify = uglify_.default



// include paths file
import { path } from "../paths.js";

// 'gulp scripts' -- creates a index.js file with Sourcemap from your JavaScript files
// 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
//   minifies, and cache busts it (does not create a Sourcemap)
function scripts() {
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  return (
    src([path.srcAsset.jsFiles + "/*.js"])
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
      .pipe(dest(path.tmpAssets.jsFilesTemp))
      // JS cache bursting
      .pipe(rev())
      .pipe(size({ title: "scripts", showFiles: true }))
      // gera arquivos compactados
      .pipe(when(argv.prod, dest(path.tmpAssets.jsFilesTemp)))
      // gera manifesto dos arquivos compactados
      .pipe(rev.manifest("js-manifest.json"))
      // .pipe(dest(tempDir + paths.sourceDir + paths.data))
      .pipe(dest(path.root.tempDir + path.root.sourceDir + path.root.dataDir))
      .pipe(size({ title: "Scripts json", showFiles: true }))
  );
}

// 'gulp scripts:gzip --prod' -- gzips JS
function gzipScripts() {
  return src([path.tmpAssets.jsFilesTemp + "/*.js"])
    .pipe(when(argv.prod, when("*.js", gzip({ append: true }))))
    .pipe(
      when(
        argv.prod,
        size({
          gzip: true,
          showFiles: true,
          title: "Gzip scripts"
        })
      )
    )
    .pipe(when(argv.prod, dest(path.tmpAssets.jsFilesTemp)));
}

// 'gulp styles' -- creates a CSS file from SCSS, adds prefixes and creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SCSS, adds prefixes,
function styles() {
  var plugins = [autoprefixer(), cssnano()];
  return (
    src([path.srcAsset.sassFiles + "/*.scss"])
      .pipe(when(!argv.prod, sourcemaps.init()))
      .pipe(sass().on("error", sass.logError))
      .pipe(
        sass({
          includePaths: [path.srcAsset.sassFiles], // Tell Sass where to look for files
        }).on("error", sass.logError)
      )
      .pipe(when(argv.prod, when("*.css", postcss(plugins))))
      .pipe(when(argv.prod, postcss(plugins)))
      .pipe(size({ showFiles: true }))
      .pipe(when(argv.prod, sourcemaps.write(".")))
      .pipe(when(argv.prod, dest(path.tmpAssets.sassFilesTemp + "/")))
      // CSS cache bursting
      .pipe(rev())
      .pipe(size({ title: "Styles json", showFiles: true }))
      // gera arquivos compactados
      .pipe(dest(path.tmpAssets.sassFilesTemp + "/"))
      .pipe(rev.manifest("css-manifest.json"))
      .pipe(dest(path.root.tempDir + path.root.sourceDir + path.root.dataDir))
      .pipe(when(argv.prod, size({ title: "Styles json", showFiles: true })))
      .pipe(when(!argv.prod, browserSync.stream()))
  );
}

// 'gulp styles:gzip --prod' -- gzips CSS
function gzipStyles() {
  return src([path.tmpAssets.sassFilesTemp + "/*.css"])
    .pipe(when(argv.prod, when("*.css", gzip({ append: true }))))
    .pipe(
      when(
        argv.prod,
        size({
          gzip: true,
          showFiles: true,
          title: "Gzip styles"
        })
      )
    )
    .pipe(when(argv.prod, dest(path.tmpAssets.sassFilesTemp)));
}

export {
  scripts,
  styles,
  gzipScripts,
  gzipStyles
};

