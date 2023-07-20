import Link from "next/link"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type HeaderTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HtmlHeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

type ArticleHeaderProps = HtmlHeadingProps & {
  as: HeaderTag
}

export const ArticleHeader = (props: ArticleHeaderProps) => {
  const { id, children, as: Header, ...rest } = props
  if (id) {
    return (
      <Header
        id={id}
        {...rest}
        className="before:text-zinc-400 hover:before:ml-[-1rem] hover:before:inline-block hover:before:w-[1rem] hover:before:content-['#'] before:dark:text-zinc-500"
      >
        <Link href={`#${id}`} className="text-zinc-800 dark:text-zinc-100">
          {children}
        </Link>
      </Header>
    )
  }
  return <Header {...props} />
}

export const createArticleHeader = (as: HeaderTag) => {
  const ArticleHeaderComponent = (props: HtmlHeadingProps) => (
    <ArticleHeader {...{ ...props, as }} />
  )

  ArticleHeaderComponent.displayName = `ArticleHeader(${as})`

  return ArticleHeaderComponent
}
