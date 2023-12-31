import { Analytics } from "@vercel/analytics/react"
import { AppProps } from "next/app"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

import "@/styles/globals.css"
import "focus-visible"
import { usePrevious } from "@/lib/hooks"
import { NotificationProvider } from "@/modules/notifications"

export default function App({ Component, pageProps, router }: AppProps) {
  const previousPathname = usePrevious<string>(router.pathname)

  return (
    <>
      <NotificationProvider>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <main>
            <Component previousPathname={previousPathname} {...pageProps} />
          </main>
          <Footer />
        </div>
      </NotificationProvider>
      <Analytics />
    </>
  )
}
