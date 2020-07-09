//  Create encode to Base64
module.exports = (url) => {
  return Buffer.from(url).toString("base64");
};
