export default function blockquote(content, source, type) {
	const typeAttr = type ? `data-type="${type}"` : "";

	return `<blockquote ${typeAttr}>
		${content}
		<cite>— ${source}</cite>
		</blockquote>`;
}
