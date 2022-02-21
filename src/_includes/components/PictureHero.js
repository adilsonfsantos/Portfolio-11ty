module.exports = (
  src,
  altText = ""
) => {
  const filename = src.replace(/\.[^/.]+$/, "");
  return `
  <picture class="post__splash--picture">
  <source srcset="${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-768.webp 768w, ${filename}-992.webp 992w, ${filename}-1200.webp 1200w, ${filename}-1920.webp 1920w" type="image/webp">
  <source srcset="${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-768.jpg 768w, ${filename}-992.jpg 992w, ${filename}-1200.jpg 1200w, ${filename}-1920.jpg 1920w" type="image/jpeg">
    <img class="post__splash--image" loading="lazy" src="${filename}-480.jpg" alt="${altText}">
  </picture>`;
};
