import { Components } from "@mdx-js/react/lib"
import Link from "next/link"
import { DetailedHTMLProps, FC, HTMLAttributes } from "react"

type ArticleHeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const ArticleHeader1: FC<ArticleHeaderProps> = ({ id, ...rest }) => {
  if (id) {
    return (
      <Link href={`#${id}`}>
        <h1 id={id} {...rest} />
      </Link>
    )
  }
  return <h1 {...rest} />
}

export const ArticleHeader2: FC<ArticleHeaderProps> = ({ id, ...rest }) => {
  if (id) {
    return (
      <Link href={`#${id}`}>
        <h2 id={id} {...rest} />
      </Link>
    )
  }
  return <h2 {...rest} />
}
