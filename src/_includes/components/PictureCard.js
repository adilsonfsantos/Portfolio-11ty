module.exports = (
  src,
  altText = "",
  classParent = "",
  classDescendent = ""
) => {
  const filename = src.replace(/\.[^/.]+$/, "");
  return `
<figure class="${classParent}">
<source
data-srcset="${filename}-240.webp 240w, ${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-640.webp 640w" type="image/webp">
<source data-srcset="${filename}-240.jpg 240w, ${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-640.jpg 640w" type="image/jpeg">
<img class="lazy ${classDescendent}" src="${filename}-lq.jpg" data-src="${filename}-480.jpg" alt="${altText}" width="480px">
</figure>
`;
};
