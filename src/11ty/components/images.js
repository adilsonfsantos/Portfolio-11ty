const Image = require("@11ty/eleventy-img");

async function images(
  src,
  alt,
  classParent,
  classDescendent,
  sizes
) {
  if (alt === undefined || typeof alt !== "string") {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let newSizes;
  let lowSrc;

  let metadata = await Image(src, {
    widths: [320, 480, 768, 1104, 1650, 1920],
    formats: ["webp", "jpeg"],
    sharpOptions: {
      ChromaSubsampling: "4:4:4",
      Progressive: true,
      Quality: 95,
    },
    urlPath: "/assets/images",
    outputDir: "dist/assets/images",
  });

    if (sizes === "card") {
    newSizes =  "(min-width: 1260px) 470px, (min-width: 620px) calc(42.1vw - 52px), calc(92.33vw - 64px), 100vw";
    lowSrc = metadata.jpeg[1];
  } else if ( sizes === "banner") {
    newSizes =  "(min-width: 1200px) 1104px, 87.5vw";
    lowSrc = metadata.jpeg[2];
  } else {
    newSizes =  "(min-width: 1200px) 1104px, 87.5vw";
    lowSrc = metadata.jpeg[2];
  }

  return `<picture class="${classParent}">
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${
          imageFormat[0].sourceType
        }" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(", ")}" sizes="${newSizes}">`;
      })
      .join("\n")}
      <img
        class="${classDescendent}"
        src="${lowSrc.url}"
        width="${lowSrc.width}"
        height="${lowSrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

module.exports = { images };
