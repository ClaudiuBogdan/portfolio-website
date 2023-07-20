import { Feed } from "feed"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"
import ReactDOMServer from "react-dom/server"
import { mkdir, writeFile } from "fs/promises"

import { clientConfig } from "@/modules/config/client"
import { getAllArticles } from "./getAllArticles"

export async function generateRssFeed() {
  const articles = await getAllArticles()
  const siteUrl = clientConfig.baseUrl
  const author = {
    name: "Claudiu C. Bogdan", // TODO: get from en locales
    email: "contact@devostack.com",
  }

  const feed = new Feed({
    title: author.name,
    description: "Your blog description", // TODO: get from en locales
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  })

  for (const article of articles) {
    const url = `${siteUrl}/articles/${article.slug}`
    const html = ReactDOMServer.renderToStaticMarkup(
      <MemoryRouterProvider>
        <article.component isRssFeed />
      </MemoryRouterProvider>
    )

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    })
  }

  await mkdir("./public/rss", { recursive: true })
  await Promise.all([
    writeFile("./public/rss/feed.xml", feed.rss2(), "utf8"),
    writeFile("./public/rss/feed.json", feed.json1(), "utf8"),
  ])
}
