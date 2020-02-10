"use strict";
const argv = require("yargs").argv;
const autoprefixer = require("autoprefixer");
const babelify = require("babelify")
const bro = require("gulp-bro")
const browserSync = require("browser-sync").create();
// const concat = require("gulp-concat");
const cssnano = require("cssnano");
const gulp = require("gulp");
const gzip = require("gulp-gzip");
const postcss = require("gulp-postcss");
const rev = require("gulp-rev");
const sass = require("gulp-sass");
const size = require("gulp-size");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const when = require("gulp-if");

// // include paths file
const paths = require("../paths");

// ,'./node_modules/turbolinks/dist/turbolinks.js'
// 'gulp scripts' -- creates a index.js file with Sourcemap from your JavaScript files
// 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
//   minifies, and cache busts it (does not create a Sourcemap)
gulp.task("scripts", () => {
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  return (
    gulp
      .src([paths.jsFiles + "/*.js"])
      .pipe(bro({
        transform: [
          babelify.configure({ presets: ['@babel/preset-env'] })]
      }))
      .pipe(when(!argv.prod, sourcemaps.init()))
      // .pipe(concat("main.js"))
      // .pipe(source('main.js'))
      .pipe(size({ showFiles: true }))
      .pipe(when(argv.prod, when("*.js", uglify())))
      .pipe(when(!argv.prod, sourcemaps.write(".")))
      .pipe(gulp.dest(paths.jsFilesTemp))
      // JS cache bursting
      .pipe(when(argv.prod, rev()))
      .pipe(when(argv.prod, size({ showFiles: true })))
      // gera arquivos compactados
      .pipe(when(argv.prod, gulp.dest(paths.jsFilesTemp)))
      // gera manifesto dos arquivos compactados
      .pipe(rev.manifest("js-manifest.json"))
      .pipe(gulp.dest(paths.tempDir + paths.sourceDir + paths.data))
      .pipe(when(argv.prod, size({ showFiles: true })))
  );
});

// 'gulp scripts:gzip --prod' -- gzips JS
gulp.task("scripts:gzip", () => {
  return gulp
    .src([paths.jsFilesTemp + "/*.js"])
    .pipe(when(argv.prod, when("*.js", gzip({ append: true }))))
    .pipe(
      when(
        argv.prod,
        size({
          gzip: true,
          showFiles: true
        })
      )
    )
    .pipe(when(argv.prod, gulp.dest(paths.jsFilesTemp)));
});

// 'gulp styles' -- creates a CSS file from SCSS, adds prefixes and creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SCSS, adds prefixes,
gulp.task("styles", () => {
  var plugins = [autoprefixer(), cssnano()];
  return (
    gulp
      .src([paths.sassFiles + "/*.scss"])
      .pipe(when(!argv.prod, sourcemaps.init()))
      .pipe(
        sass({
          includePaths: [paths.sassFiles] // Tell Sass where to look for files
        }).on("error", sass.logError)
      )
      // .pipe(when(argv.prod,when("*.css",postcss(plugins))))
      .pipe(when(argv.prod, postcss(plugins)))
      .pipe(size({ showFiles: true }))
      .pipe(when(argv.prod, sourcemaps.write(".")))
      .pipe(when(argv.prod, gulp.dest(paths.sassFilesTemp + "/")))
      .pipe(when(argv.prod, rev()))
      .pipe(when(argv.prod, size({ showFiles: true })))
      .pipe(gulp.dest(paths.sassFilesTemp + "/"))
      .pipe(rev.manifest("css-manifest.json"))
      .pipe(gulp.dest([paths.tempDir + paths.sourceDir + paths.data]))
      .pipe(when(argv.prod, size({ showFiles: true })))
      .pipe(when(!argv.prod, browserSync.stream()))
  );
});

// 'gulp styles:gzip --prod' -- gzips CSS
gulp.task("styles:gzip", () => {
  return gulp
    .src([paths.sassFilesTemp + "/*.css"])
    .pipe(when(argv.prod, when("*.css", gzip({ append: true }))))
    .pipe(
      when(
        argv.prod,
        size({
          gzip: true,
          showFiles: true
        })
      )
    )
    .pipe(when(argv.prod, gulp.dest(paths.sassFilesTemp)));
});

// function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}
// 'gulp serve' -- open site in browser and watch for changes
// in source files and update them when needed
gulp.task("serve", done => {
  browserSync.init({
    // tunnel: true,
    // open: false,
    port: 4000, // change port to match default Jekyll
    ui: { port: 4001 },
    server: [paths.tmp, paths.dist],
    serveStaticOptions: {
      extensions: ["html"]
    },
    callbacks: {
      /**
       * This 'ready' callback can be used
       * to access the Browsersync instance
       */
      ready: function(err, bs) {
        // example of accessing URLS
        console.log(bs.options.get("urls"));

        // example of adding a middleware at the end
        // of the stack after Browsersync is running
        bs.addMiddleware("*", function(req, res) {
          res.writeHead(302, {
            location: "404.html"
          });
          res.end("Redirecting!");
        });
      }
    },
    // scripts in body conflict with Turbolinks
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function(snippet, match) {
          return snippet + match;
        }
      }
    }
  });
  done();

  // watch various files for changes and do the needful
  gulp.watch(
    [paths.mdFilesGlob, paths.liquidFilesGlob, paths.ymlFilesGlob],
    gulp.series("build:site", reload)
  );
  gulp.watch(
    [paths.xmlFilesGlob, paths.txtFilesGlob],
    gulp.series("site", reload)
  );
  gulp.watch(paths.jsFilesGlob, gulp.series("scripts", reload));
  gulp.watch(paths.sassFilesGlob, gulp.series("styles", reload));
  gulp.watch(
    paths.imageFilesGlob,
    gulp.series("copy:images", "images", reload)
  );
});
