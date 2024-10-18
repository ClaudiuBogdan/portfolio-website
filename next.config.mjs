import rehypePrism from "@mapbox/rehype-prism"
import mdx from "@next/mdx"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism, rehypeSlug],
    providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(wav|mp3)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/audio/",
            outputPath: `${isServer ? "../" : ""}static/audio/`,
            name: "[name].[ext]",
            esModule: false,
          },
        },
      ],
    })

    return config
  },
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
