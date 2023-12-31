"use-strict";
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const xmlFiltersPlugin = require("eleventy-xml-plugin");
const mila = require("markdown-it-link-attributes");
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const { minify } = require("html-minifier-terser");
const criticalCss = require("eleventy-critical-css");
const { compress } = require("eleventy-plugin-compress");

const { blockquote } = require("./src/11ty/components/blockquote");
const { images } = require("./src/11ty/components/images");

process.setMaxListeners(50);

module.exports = function (eleventyConfig) {
  // DON'T USE .GITIGNORE
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addFilter("addNbsp", (str) => {
    if (!str) {
      return;
    }
    let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
    title = title.replace(/"(.*)"/g, '\\"$1\\"');
    return title;
  });

  //  SHORTCODE
  eleventyConfig.addShortcode("year", () => {
    let year = new Date().getFullYear();
    return year.toString(); // or `return String(year);`
  });

  eleventyConfig.addShortcode("images", images);
  // {% images "path_to_image", "alt_text", "class", "subclass" %}

  eleventyConfig.addPairedShortcode("blockquote", blockquote);
  // {% blockquote "Lorem Ipsum" %}
  // Vestibulum id ligula porta felis euismod semper.
  // {% endblockquote %}

  //  MARKDOWN SETTINGS
  const markdownItOptions = {
    html: true,
    linkify: true,
    typographer: true,
  };
  const markdownItAttrsOptions = {
    leftDelimiter: "{",
    rightDelimiter: "}",
    allowedAttributes: ["id", "class", /^data-.*$/],
  };

  const milaOptions = {
    pattern: /^https:/,
    attrs: {
      target: "_blank",
      rel: "noopener",
    },
  };

  const markdown = markdownIt(markdownItOptions)
    .use(markdownItAttrs, markdownItAttrsOptions)
    .use(mila, milaOptions);

  eleventyConfig.setLibrary("md", markdown);

  //   PLUGINS
  eleventyConfig.addPlugin(xmlFiltersPlugin);
  eleventyConfig.addPlugin(directoryOutputPlugin);
  eleventyConfig.addPlugin(criticalCss, {
    inline: {
      strategy: "default",
    },
    ignore: {
      rule: [/\.noise/],
    },
    dimensions: [
      {
        width: 240,
        height: 320,
      },
      {
        width: 320,
        height: 568,
      },
      {
        width: 1024,
        height: 1024,
      },
      {
        width: 1366,
        height: 768,
      },
    ],
  });

  //  LAYOUT ALIASES
  eleventyConfig.addLayoutAlias("default", "layouts/default.liquid");
  eleventyConfig.addLayoutAlias("home", "layouts/home.liquid");
  eleventyConfig.addLayoutAlias("post", "layouts/post.liquid");
  eleventyConfig.addLayoutAlias("page", "layouts/page.liquid");
  eleventyConfig.addLayoutAlias("404", "layouts/404.liquid");

  // PASSTHROUGHT ELEMENTS
  eleventyConfig.addPassthroughCopy({
    "src/netlify.toml": "/netlify.toml",
    "src/root/*": "/",
    "src/assets/images/thumbnail.png": "/assets/images/thumbnail.png",
    "src/assets/images/noise.png": "/assets/images/noise.png",
    "src/assets/fonts/*": "/assets/fonts/",
  });

  // SERVER OPTIONS
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addWatchTarget("**/*.(scss|liquid|md)");

  // MINIFY SASS
  eleventyConfig.addPlugin(eleventySass);

  // MINIFY HTML
  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = minify(content, {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addPlugin(compress, {
    enabled: true,
    algorithm: "brotli",
  });

  return {
    dir: {
      data: "_data",
      input: "src",
      output: "dist",
    },
  };
};
