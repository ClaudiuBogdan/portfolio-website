// eslint-disable-next-line
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx']
})
