import directoryOutputPlugin from "@11ty/eleventy-plugin-directory-output";
import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import xmlFiltersPlugin from "eleventy-xml-plugin";
import { minify } from "html-minifier-terser";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import mila from "markdown-it-link-attributes";

import blockquote from "./src/11ty/components/blockquote.js";
import images from "./src/11ty/components/images.js";

process.setMaxListeners(50);

export default function(eleventyConfig) {
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

	// https://spencermortensen.com/articles/email-obfuscation/#link-url
	eleventyConfig.addFilter("encode", (text) => {
		let code = '';
		for (let i = 0; i < text.length; ++i) {
			code += '%' + text.charCodeAt(i).toString(16);
		}

		return code;
	})

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

	//  LAYOUT ALIASES
	eleventyConfig.addLayoutAlias("default", "layouts/default.liquid");
	eleventyConfig.addLayoutAlias("home", "layouts/home.liquid");
	eleventyConfig.addLayoutAlias("post", "layouts/post.liquid");
	eleventyConfig.addLayoutAlias("page", "layouts/page.liquid");
	eleventyConfig.addLayoutAlias("404", "layouts/404.liquid");

	// PASSTHROUGHT ELEMENTS
	eleventyConfig.addPassthroughCopy({
		"src/root/*": "/",
		"src/root/assets/fonts/*": "/assets/fonts/",
		"src/portfolio-static/root/*": "/",
		"src/portfolio-static/assets/images/noise.webp": "/assets/images/noise.webp",
		"src/portfolio-static/assets/videos/*" : "/assets/videos"
	});

	// SERVER OPTIONS
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addWatchTarget("**/*.(scss|liquid|md)");

	// MINIFY SASS
	eleventyConfig.addPlugin(eleventySass);

	// MINIFY HTML
	eleventyConfig.addTransform("htmlmin", function(content) {
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

	return {
		dir: {
			data: "_data",
			input: "src",
			output: "dist",
		},
	};
};
