import Link from "next/link"

import { FC } from "react"
import { Container } from "@/components/Container"
import en from "@/locales/en.json"

const text = en.components.footer

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

const NavLink: FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">{text.nav.about}</NavLink>
                <NavLink href="/articles">{text.nav.articles}</NavLink>
                <NavLink href="/projects">{text.nav.projects}</NavLink>
                <NavLink href="/uses">{text.nav.uses}</NavLink>
                <NavLink href="/rss/feed.xml">{text.nav.rss}</NavLink>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} {text.allRightsReserved}
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
