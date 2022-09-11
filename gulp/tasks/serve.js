import browserSync from "browser-sync";
import gulppkg from "gulp";
const { series, watch } = gulppkg;

// include paths file
import { path } from "../paths.js";

// const { buildSite } = require("../../gulpfile.js");
import { scripts, styles } from "./assets.js";
import { site, siteTmp } from "./build.js";
import { imagesCopy, siteCopy } from "./copy.js";

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
    [path.fileGlob.mdFilesGlob, path.fileGlob.liquidFilesGlob, path.fileGlob.ymlFilesGlob],
    series(siteTmp, site, siteCopy, reload)
  );
  watch([path.fileGlob.xmlFilesGlob, path.fileGlob.txtFilesGlob], series(site, reload));
  watch(path.fileGlob.jsFilesGlob, series(scripts, reload));
  watch(path.fileGlob.sassFilesGlob, series(styles, reload));
  watch(path.fileGlob.imageFilesGlob, series(imagesCopy, reload));
}

export { serve };

