import { Head, Html, Main, NextScript } from "next/document"
import Script from "next/script"
import { clientConfig } from "@/modules/config/client"

const baseUrl = clientConfig.baseUrl

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${baseUrl}/rss/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href={`${baseUrl}/rss/feed.json`}
        />

        <Script
          id="theme-mode-script"
          src="/scripts/themeMode.js"
          strategy="beforeInteractive"
        />
      </Head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
