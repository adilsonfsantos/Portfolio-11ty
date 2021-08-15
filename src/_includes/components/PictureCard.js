module.exports = (
  src,
  altText = "",
  classParent = "",
  classDescendent = ""
) => {
  const filename = src.replace(/\.[^/.]+$/, "");
  return `
  <picture class="lazy ${classParent}">
  <source data-srcset="${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-768.webp 768w" type="image/webp">
  <source data-srcset="${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-768.jpg 768w" type="image/jpeg">
  <img class="lazyload ${classDescendent}" data-sizes="auto" data-src="${filename}-480.jpg" src="${filename}-lq.jpg" data-sizes="auto" alt="${altText}">
</picture>
<noscript>
<picture class="${classParent}">
  <source srcset="${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-768.webp 768w" type="image/webp">
  <source srcset="${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-768.jpg 768w" type="image/jpeg">
    <img class="${classDescendent}" loading="lazy" src="${filename}-480.jpg" alt="${altText}">
  </picture>
</noscript>
`;
};
