"use-strict";
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const slugify = require("slugify");
const xmlFiltersPlugin = require("eleventy-xml-plugin");
const mila = require("markdown-it-link-attributes");

const componentsDir = "./src/_includes/components";
const pictureCard = require(`${componentsDir}/PictureCard.js`);
const picture = require(`${componentsDir}/Picture.js`);
const pictureHero = require(`${componentsDir}/PictureHero.js`);

const filtersDir = "./src/_includes/filters";
const base64 = require(`${filtersDir}/base64.js`);
const slug = require(`${filtersDir}/slug.js`);
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(UpgradeHelper);

  //  SHORTCODE
  eleventyConfig.addShortcode("picture-card", pictureCard);
  eleventyConfig.addShortcode("picture", picture);
  eleventyConfig.addShortcode("picture-hero", pictureHero);

  //  FILTERS
  eleventyConfig.addFilter("base64", base64);
  eleventyConfig.addFilter("slug", slug);

  //  MARKDOWN SETTINGS
  const markdownItOptions = {
    html: true,
    linkify: true,
    typographer: true,
  };
  const markdownItAttrsOptions = {
    leftDelimiter: "{:",
    rightDelimiter: "}",
    allowedAttributes: ["id", "class", /^data\-.*$/],
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

  //  COLLECTIONS
  eleventyConfig.addCollection("posts", (collection) => {
    const coll = collection.getFilteredByTag("post");

    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return coll.reverse();
  });

  //  LAYOUT ALIASES
  eleventyConfig.addLayoutAlias("default", "layouts/default.liquid");
  eleventyConfig.addLayoutAlias("home", "layouts/home.liquid");
  eleventyConfig.addLayoutAlias("post", "layouts/post.liquid");
  eleventyConfig.addLayoutAlias("page", "layouts/page.liquid");

  eleventyConfig.addLayoutAlias("404", "layouts/404.liquid");

  // PASSTHROUGHT ELEMENTS
  eleventyConfig.addPassthroughCopy({ "src/icons/*": "/" });
  eleventyConfig.addPassthroughCopy({
    "src/netlify.toml": "/netlify.toml",
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets/images/thumbnail.jpg": "/assets/images/thumbnail.jpg",
  });

  // DON'T USE .GITIGNORE
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      data: "_data",
      includes: "_includes",
      input: "tmp/src",
      output: "tmp/dist",
    },
  };
};
