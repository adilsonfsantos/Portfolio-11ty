
const src = "src",
      dist = "dist",
      tmp = "tmp",
      assets = "assets",
      css = "css",
      data = "_data",
      fonts = "fonts",
      img = "images",
      js = "js",
      sass = "_sass";

// Root locations.
const assetsDir = assets + "/",
      siteDir = dist + "/",
      sourceDir = src + "/",
      tempDir = tmp + "/",
      dataDir = data + "/";

// Glob patterns by file type.
const sassPattern = "/**/*.scss",
      jsPattern = "/**/*.js",
      imagePattern = "*.+(jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP)",
      markdownPattern = "/**/*.+(md|MD|markdown|MARKDOWN)",
      liquidPattern = "/**/*.liquid",
      txtPattern = "/**/*.txt",
      xmlPattern = "/**/*.{xml,json}",
      ymlPattern = "/**/*.yml";


export const path = Object.freeze({

    // Root locations.
    root : {
      assetsDir : `${assets}/`,
      siteDir : `${dist}/`,
      sourceDir : src + "/",
      tempDir : `${tmp}/`,
      dataDir : `${data}/`,
},

    // Source asset files locations.
    srcAsset : {
      sassFiles : sourceDir + sass,
      jsFiles : sourceDir + assetsDir + js,
      imageFiles : sourceDir + assetsDir + img,
      fontFiles : sourceDir + assetsDir + fonts,
      dataFiles : sourceDir + data,
    },

    // Temp asset files locations.
    tmpAssets : {
      assetFilesTemp : tempDir + assetsDir,
      sassFilesTemp : tempDir + assetsDir + css,
      jsFilesTemp : tempDir + assetsDir + js,
      imageFilesTemp : tempDir + assetsDir + img,
      fontFilesTemp : tempDir + assetsDir + fonts,
      dataFilesTemp : tempDir + dataDir,
    },

    // Site asset files locations.
    siteAssets : {
      assetFilesSite : siteDir + assetsDir,
      sassFilesSite : siteDir + assetsDir + css,
      jsFilesSite : siteDir + assetsDir + js,
      imageFilesSite : siteDir + assetsDir + img,
      fontFilesSite : siteDir + assetsDir + fonts,
    },

    // File globs
    fileGlob : {
      liquidFilesGlob : src + liquidPattern,
      imageFilesGlob : sourceDir + assetsDir + img + imagePattern,
      jsFilesGlob : sourceDir + assetsDir + js + jsPattern,
      mdFilesGlob : src + markdownPattern,
      sassFilesGlob : sourceDir + sass + sassPattern,
      txtFilesGlob : src + txtPattern,
      xmlFilesGlob : src + xmlPattern,
      ymlFilesGlob : src + ymlPattern,
    },
  })

export default {
  path
};
