export type TArticle = {
  title: string
  description: string
  date: string
  slug: string
  tags?: string[]
}

export type ArticleProps = {
  article: TArticle
}

export type Tag = {
  label: string
  active: boolean
}
