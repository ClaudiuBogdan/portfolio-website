import clsx from "clsx"
import Link from "next/link"
import { FC } from "react"

type SocialLinkProps = {
  className?: string
  href: string
  children: React.ReactNode
  icon: React.ElementType
}

export const SocialLinkLabel: FC<SocialLinkProps> = ({
  className,
  href,
  children,
  icon: Icon,
}) => {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}
