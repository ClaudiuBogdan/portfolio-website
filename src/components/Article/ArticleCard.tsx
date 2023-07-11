import { formatDate } from "@/lib/formatDate"
import { Card } from "../Card"

type TArticle = {
  title: string
  description: string
  slug: string
  date: string
  image: string
}

type ArticleProps = {
  article: TArticle
}

export function ArticleCard({ article }: ArticleProps) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}
