import { FC } from "react"
import Link, { LinkProps } from "next/link"
import clsx from "clsx"

type CardProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

type CardLinkProps = LinkProps & {
  children: React.ReactNode
}

type TCard = FC<CardProps> & {
  Link: typeof CardLink
  Title: typeof CardTitle
  Description: typeof CardDescription
  Cta: typeof CardCta
  Eyebrow: typeof CardEyebrow
}

type CardTileProps = {
  as?: React.ElementType
  href?: string
  className?: string
  children: React.ReactNode
}

type CardDescriptionProps = {
  className?: string
  children: React.ReactNode
}

type CardCtaProps = {
  className?: string
  children: React.ReactNode
}

type CardEyebrowProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  decorate?: boolean
  dateTime?: string
}

const ChevronRightIcon: FC<{ className?: string }> = (props) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Card: TCard = ({ as: Component = "div", className, children }) => {
  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  )
}

const CardLink: FC<CardLinkProps> = ({ children, ...props }) => {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

const CardTitle: FC<CardTileProps> = ({
  as: Component = "h2",
  href,
  children,
}) => {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

const CardDescription: FC<CardDescriptionProps> = ({ children }) => {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  )
}

const CardCta: FC<CardCtaProps> = ({ children }) => {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

const CardEyebrow: FC<CardEyebrowProps> = ({
  as: Component = "p",
  decorate = false,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}

Card.Link = CardLink
Card.Title = CardTitle
Card.Description = CardDescription
Card.Cta = CardCta
Card.Eyebrow = CardEyebrow
