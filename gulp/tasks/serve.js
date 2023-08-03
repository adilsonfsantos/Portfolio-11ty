"use strict";
const browserSync = require("browser-sync").create();
const { series, watch } = require("gulp");

// include paths file
const path = require("../paths.js");
// const { buildSite } = require("../../gulpfile.js");
const { imagesCopy, siteCopy } = require("./copy.js");
const { siteTmp, site } = require("./build.js");
const { scripts, styles } = require("./assets.js");

// function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}
// 'gulp serve' -- open site in browser and watch for changes
// in source files and update them when needed
function serve(done) {
  browserSync.init({
    port: 4000, // change port to match default Jekyll
    ui: { port: 4001 },
    server: ["tmp", "dist"],
    serveStaticOptions: {
      extensions: ["html"],
    },
    callbacks: {
      /**
       * This 'ready' callback can be used
       * to access the Browsersync instance
       */
      ready: function (err, bs) {
        // example of accessing URLS
        console.log(bs.options.getIn(["urls", "local"]));

        // example of adding a middleware at the end
        // of the stack after Browsersync is running
        bs.addMiddleware("*", function (req, res) {
          res.writeHead(302, {
            location: "404.html",
          });
          res.end("Redirecting!");
        });
      },
    },
  });
  done();

  // watch various files for changes and do the needful
  watch(
    [
      path.to.fileGlob.sassFilesGlob,
      path.to.fileGlob.mdFilesGlob,
      path.to.fileGlob.liquidFilesGlob,
      path.to.fileGlob.ymlFilesGlob,
    ],
    series(siteTmp, site, siteCopy, reload)
  );
  watch(
    [path.to.fileGlob.xmlFilesGlob, path.to.fileGlob.txtFilesGlob],
    series(site, reload)
  );
  watch(path.to.fileGlob.jsFilesGlob, series(scripts, reload));
  watch(path.to.fileGlob.sassFilesGlob, series(styles, reload));
  watch(path.to.fileGlob.imageFilesGlob, series(imagesCopy, reload));
}

module.exports = serve;
