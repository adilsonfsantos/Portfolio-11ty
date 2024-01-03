const Image = require("@11ty/eleventy-img");

async function images(path, altText, classParent, classDescendent, type) {
	if (altText === undefined || typeof altText !== "string") {
		// You bet we throw an error on missing alt (alt="" works okay)
		throw new Error(`Missing \`alt\` on image from: ${path}`);
	}

	let imageSizes;
	let lowQuality;
	let loadType;

	let metadata = await Image(path, {
		widths: [320, 480, 768, 1104, 1650, 1920],
		formats: ["webp", "jpeg"],
		sharpOptions: {
			ChromaSubsampling: "4:4:4",
			Progressive: true,
			Quality: 80,
		},
		sharpWebpOptions: {
			quality: 95,
			smartSubsample: true,
		},
		urlPath: "/assets/images",
		outputDir: "dist/assets/images",
	});

	if (type === "card") {
		imageSizes =
			"(min-width: 1260px) 470px, (min-width: 620px) calc(42.1vw - 52px), \
			calc(92.33vw - 64px), 100vw";
		lowQuality = metadata.jpeg[1];
		loadType = "lazy";
	} else if (type === "banner") {
		imageSizes = "(min-width: 1200px) 1104px, 87.5vw";
		lowQuality = metadata.jpeg[2];
		loadType = "eager";
	} else {
		imageSizes = "(min-width: 1200px) 1104px, 87.5vw";
		lowQuality = metadata.jpeg[2];
		loadType = "lazy";
	}

	return `<picture class="${classParent}">
		${Object.values(metadata)
			.map((imageFormat) => {
				return `<source type="${imageFormat[0].sourceType}"
				srcset="${imageFormat.map((entry) => entry.srcset).join(", ")}"
				sizes="${imageSizes}">`;
			})
			.join("\n")}
			<img
	        		class="${classDescendent}"
        			src="${lowQuality.url}"
	        		width="${lowQuality.width}"
        			height="${lowQuality.height}"
        			alt="${altText}"
        			loading="${loadType}"
        			decoding="async">
		</picture>`;
}

module.exports = { images };
