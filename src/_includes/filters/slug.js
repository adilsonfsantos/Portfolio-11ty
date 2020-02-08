module.exports = (input) => {
  const options = {
    replacement: "-",
    remove: /[&,+()$~%.'":*?<>{}]/g,
    lower: true
  };
  return slugify(input, options)
}
