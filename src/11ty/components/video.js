import fs from "node:fs";
import path from "node:path";

export default function video(
	src,
	poster,
	type,
	title,
	caption,
	width,
	height,
	controlsList = "nodownload nofullscreen noremoteplayback",
	controls = true,
	autoplay = false,
	loop = false,
	muted = true,
	playsInline = true,
	disablePictureInPicture = true,
	preload = "none",
) {
	const inputPath = "./src/portfolio-static/assets/videos/";
	const urlPath = "/assets/videos/";
	const videoSrc = path.resolve(inputPath, src);
	const posterSrc = path.resolve(inputPath, poster);
	const videoOutput = path.resolve(urlPath, src);
	const posterOutput = path.resolve(urlPath, poster);

	if (typeof src !== "string" || !src.trim()) {
		throw new Error("Invalid video source.");
	}

	if (!fs.existsSync(videoSrc) || !fs.statSync(videoSrc).isFile()) {
		throw new Error(`Video file not found: ${src}`);
	}

	if (typeof poster !== "string" || !poster.trim()) {
		throw new Error("Invalid poster source.");
	}

	if (!fs.existsSync(posterSrc) || !fs.statSync(posterSrc).isFile()) {
		throw new Error(`Ooster file not found: ${src}`);
	}

	const validTypes = ["popout", "full-width", undefined];
	const validPreload = ["none", "metadata", "auto", undefined];

	if (type && !validTypes.includes(type)) {
		throw new Error(`Invalid video type: ${type}`);
	}

	if (!validPreload.includes(preload)) {
		throw new Error(`Invalid video preload: ${preload}`);
	}

	for (const [name, value] of [
		["width", width],
		["height", height],
	]) {
		if (value !== undefined && (!Number.isInteger(value) || value <= 0)) {
			throw new Error(`Invalid video ${name}: ${value}`);
		}
	}

	// const escapeHTML = (value) =>
	// 	String(value).replace(
	// 		/[&<>"']/g,
	// 		(char) =>
	// 			({
	// 				"&": "&amp;",
	// 				"<": "&lt;",
	// 				">": "&gt;",
	// 				'"': "&quot;",
	// 				"'": "&#39;",
	// 			})[char],
	// 	);

	const attributes = {
		src: videoOutput,
		poster: posterOutput,
		title,
		width,
		height,
		controls: controls || undefined,
		autoplay: autoplay || undefined,
		loop: loop || undefined,
		muted: muted || undefined,
		playsinline: playsInline || undefined,
		preload,
		disablepictureinpicture: disablePictureInPicture || undefined,
		controlslist: controlsList,
	};

	const videoAttributes = Object.entries(attributes)
		.filter(([, value]) => value !== undefined && value !== false)
		.map(([name, value]) => {
			if (value === true) {
				return name;
			}

			return `${name}="${value}"`;
		})
		.join(" ");

	const figureClass = type ? ` class="${type}"` : "";

	return `<figure ${figureClass}>
				<video ${videoAttributes}>
					Seu navegador não suporta vídeos HTML5.
				</video>${caption ? `${caption}` : ""}
			</figure>`;
}
