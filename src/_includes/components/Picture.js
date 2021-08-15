module.exports = (
  src,
  altText = "",
  classParent = "",
  classDescendent = ""
) => {
  const filename = src.replace(/\.[^/.]+$/, "");
  return `
<picture class="lazy ${classParent}">
  <source data-srcset="${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-768.webp 768w, ${filename}-992.webp 992w, ${filename}-1200.webp 1200w, ${filename}-1920.webp 1920w" type="image/webp">
  <source data-srcset="${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-768.jpg 768w, ${filename}-992.jpg 992w, ${filename}-1200.jpg 1200w, ${filename}-1920.jpg 1920w" type="image/jpeg">
  <img class="lazyload ${classDescendent}" data-sizes="auto" data-src="${filename}-480.jpg" src="${filename}-lq.jpg" alt="${altText}">
</picture>
<noscript>
  <picture class="${classParent}">
  <source srcset="${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-768.webp 768w, ${filename}-992.webp 992w, ${filename}-1200.webp 1200w, ${filename}-1920.webp 1920w" type="image/webp">
  <source srcset="${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-768.jpg 768w, ${filename}-992.jpg 992w, ${filename}-1200.jpg 1200w, ${filename}-1920.jpg 1920w" type="image/jpeg">
    <img class="${classDescendent}" loading="lazy" src="${filename}-480.jpg" alt="${altText}">
  </picture>
</noscript>
`;
};
