import Image from "@11ty/eleventy-img";
import path from "node:path";

export const imageConfig = {
	card: {
		sizes:
			"auto, (max-width: 551px) calc(100vw - 2 * clamp(16px, calc(10.476px + 2.381vw), 40px)), (max-width: 1239px) calc((100vw - 3 * clamp(16px, calc(10.476px + 2.381vw), 40px)) / 2), 560px",
		widths: [320, 480, 640, 768, 960, 1080],
	},
	banner: {
		sizes:
			"(min-width: 1px) calc(100vw - 2 * clamp(16px, calc(10.476px + 2.381vw), 40px)), (min-width: 1272px) 1160px",
		widths: [320, 600, 880, 1160, 1540, 1920],
	},
	default: {
		sizes:
			"auto, (min-width: 1px) calc(100vw - 2 * clamp(16px, calc(10.476px + 2.381vw), 40px)), (min-width: 800px) 60ch",
		widths: [320, 600, 880, 1160, 1540, 1920],
	},
	popout: {
		layout: "popout",
		sizes:
			"auto, calc(100vw - 2 * clamp(16px, calc(10.476px + 2.381vw), 40px)), (min-width: 800px) calc(60ch + 2 * clamp(48px, calc(45.238px + 1.1905vw), 60px)), (min-width: 1272px) calc(60ch + 120px)",
		widths: [320, 600, 880, 1160, 1540, 1920],
	},
	"full-width": {
		layout: "full-width",
		sizes:
			"auto, calc(100vw - 2 * clamp(16px, calc(10.476px + 2.381vw), 40px)), (min-width: 1272px) 1160px",
		widths: [320, 600, 880, 1160, 1540, 1920],
	},
};

const imageTypes = Object.keys(imageConfig);

export default async function image(
	src,
	alt,
	type = "default",
	priority = false,
) {
	if (typeof src !== "string" || !src) {
		throw new Error("Missing image source.");
	}

	if (alt === undefined) {
		throw new Error(`Missing alt on image: ${src}`);
	}

	if (typeof alt !== "string") {
		throw new TypeError(`Invalid alt on image: ${src}`);
	}

	if (alt !== "" && !alt.endsWith(".")) {
		throw new Error(`Image alt must end with a period: ${src}`);
	}

	if (alt.length > 150) {
		throw new Error(`Image alt exceeds 150 characters: ${src}`);
	}

	if (!imageTypes.includes(type)) {
		throw new Error(`Invalid image type: ${type}`);
	}

	const config = imageConfig[type];

	const inputPath = path.resolve("./src/portfolio-static/assets/images/", src);

	const metadata = await Image(inputPath, {
		widths: config.widths,
		formats: "avif",
		outputDir: "dist/assets/images",
		urlPath: "/assets/images",
		sharpOptions: {
			ChromaSubsampling: "4:4:4",
			Progressive: true,
			Quality: 80,
		},
		sharpWebpOptions: {
			quality: 90,
			smartSubsample: true,
		},
		sharpAvifOptions: {
			effort: 2,
			quality: 70,
		},
	});

	const sizes = priority ? config.sizes.replace(/^auto,\s*/, "") : config.sizes;

	return Image.generateHTML(metadata, {
		class: config.layout,
		alt,
		sizes,
		loading: priority ? "eager" : "lazy",
		decoding: priority ? "sync" : "async",
		fetchpriority: priority ? "high" : undefined,
	});
}
