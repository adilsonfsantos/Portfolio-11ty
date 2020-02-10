module.exports = (
  src,
  altText = "",
  classParent = "",
  classDescendent = ""
) => {
  const filename = src.replace(/\.[^/.]+$/, "");
  return `
<picture class="lazy ${classParent}">
  <source data-srcset="${filename}-240.webp 240w, ${filename}-480.webp 480w, ${filename}-640.webp 640w, ${filename}-768.webp 768w, ${filename}-1024.webp 1024w, ${filename}-1366.webp 1366w, ${filename}-1600.webp 1600w, ${filename}-1920.webp 1920w" type="image/webp">
  <source data-srcset="${filename}-240.jpg 240w, ${filename}-480.jpg 480w, ${filename}-640.jpg 640w, ${filename}-768.jpg 768w, ${filename}-1024.jpg 1024w, ${filename}-1366.jpg 1366w, ${filename}-1600.jpg 1600w, ${filename}-1920.jpg 1920w" type="image/jpeg">
  <img class="lazyload ${classDescendent}" data-sizes="auto" data-src="${filename}-480.jpg" src="${filename}-lq.jpg" alt="${altText}">
</picture>
<noscript>
  <picture class="${classParent}">
  <source srcset="${filename}-240.webp 240w, ${filename}-480.webp 480w, ${filename}-640.webp 640w, ${filename}-768.webp 768w, ${filename}-1024.webp 1024w, ${filename}-1366.webp 1366w, ${filename}-1600.webp 1600w, ${filename}-1920.webp 1920w" type="image/webp">
  <source srcset="${filename}-240.jpg 240w, ${filename}-480.jpg 480w, ${filename}-640.jpg 640w, ${filename}-768.jpg 768w, ${filename}-1024.jpg 1024w, ${filename}-1366.jpg 1366w, ${filename}-1600.jpg 1600w, ${filename}-1920.jpg 1920w" type="image/jpeg">
    <img class="${classDescendent}" loading="lazy" src="${filename}-480.jpg" alt="${altText}">
  </picture>
</noscript>
`;
};


// <picture class="lozad ${classParent}" style="display: block; min-height: 1rem" data-iesrc="${filename}-480.jpg" data-alt="${altText}">
//   <source srcset="${filename}-240.webp 240w, ${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-640.webp 640w, ${filename}-768.webp 768w, ${filename}-1280.webp 1280w" type="image/webp"></source>
//   <source srcset="${filename}-240.jpg 240w, ${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-640.jpg 640w, ${filename}-768.jpg 768w, ${filename}-1280.jpg 1280w" type="image/jpeg">

// </picture>
// <noscript>
//   <picture class="${classParent}">
//     <source srcset="${filename}-240.webp 240w, ${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-640.webp 640w, ${filename}-768.webp 768w, ${filename}-1280.webp 1280w" type="image/webp">
//     <source srcset="${filename}-240.jpg 240w, ${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-640.jpg 640w, ${filename}-768.jpg 768w, $ {filename}-1280.jpg 1280w" type="image/jpeg">
//     <img class="${classDescendent}" loading="lazy" src="${filename}-480.jpg"  alt="${altText}">
//   </picture>
// </noscript>

{/* <picture class="lazy ${classParent}">
  <source data-srcset="${filename}-240.webp 240w, ${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-640.webp 640w, ${filename}-768.webp 768w, ${filename}-1280.webp 1280w" type="image/webp"></source>
  <source data-srcset="${filename}-240.jpg 240w, ${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-640.jpg 640w, ${filename}-768.jpg 768w, ${filename}-1280.jpg 1280w" type="image/jpeg">
  <img class="lazyload ${classDescendent}" loading="lazy" data-src="${filename}-480.jpg" src="${filename}-lq.jpg" data-sizes="auto" alt="${altText}">
</picture>
<noscript>
  <picture class="${classParent}">
    <source srcset="${filename}-240.webp 240w, ${filename}-320.webp 320w, ${filename}-480.webp 480w, ${filename}-640.webp 640w, ${filename}-768.webp 768w, ${filename}-1280.webp 1280w" type="image/webp">
    <source srcset="${filename}-240.jpg 240w, ${filename}-320.jpg 320w, ${filename}-480.jpg 480w, ${filename}-640.jpg 640w, ${filename}-768.jpg 768w, $ {filename}-1280.jpg 1280w" type="image/jpeg">
    <img class="${classDescendent}" loading="lazy" src="${filename}-480.jpg"  alt="${altText}">
  </picture>
</noscript> */}
// data-src="${filename}-480.jpg"
