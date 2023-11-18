const Image = require("@11ty/eleventy-img");

async function images(
  src,
  alt,
  classParent,
  classDescendent,
  sizes = "(min-width: 1210px) 1104px, 87.5vw"
) {
  if (alt === undefined || typeof alt !== "string") {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [320, 480, 640, 768, 992, 1200, 1920],
    formats: ["webp", "jpeg"],
    sharpOptions: {
      ChromaSubsampling: "4:4:4",
      Progressive: true,
      Quality: 95,
    },
    urlPath: "/assets/images",
    outputDir: "dist/assets/images",
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture class="${classParent}">
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${
          imageFormat[0].sourceType
        }" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(", ")}" sizes="${sizes}">`;
      })
      .join("\n")}
      <img
        class="${classDescendent}"
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

module.exports = { images };
