import Head from "next/head"

import { useRouter } from "next/router"
import { Card } from "@/components/Card"
import { SimpleLayout } from "@/components/SimpleLayout"
import { Tags } from "@/components/Tags"
import { formatDate } from "@/lib/formatDate"
import { getAllArticles } from "@/lib/getAllArticles"

type TArticle = {
  title: string
  description: string
  date: string
  slug: string
  tags?: string[]
}

type ArticleProps = {
  article: TArticle
}

type Tag = {
  label: string
  active: boolean
}

const getTagsFromQuery = (
  queryTags: string | string[] | undefined
): string[] | null => {
  if (!queryTags) return null

  if (typeof queryTags === "string") return [queryTags]

  return queryTags
}

const useQueryTags = (tags: string[]): Tag[] => {
  const router = useRouter()

  const queryTags = getTagsFromQuery(router.query.tags)

  if (!queryTags) return tags.map((tag) => ({ label: tag, active: false }))

  return tags.map((tag) => ({
    label: tag,
    active: queryTags.includes(tag),
  }))
}

const useArticleFilter = (rawArticles: TArticle[], tags: Tag[]): TArticle[] => {
  const activeTags = tags.filter((tag) => tag.active).map((tag) => tag.label)

  if (activeTags.length === 0) return rawArticles

  // Filter articles by tag
  return rawArticles.filter((article) =>
    article.tags?.some((articleTag) => activeTags.includes(articleTag))
  )
}

function Article({ article }: ArticleProps) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({
  articles: rawArticles,
  tags: rawTags,
}: {
  articles: TArticle[]
  tags: string[]
}) {
  const router = useRouter()
  const tags = useQueryTags(rawTags)
  const articles = useArticleFilter(rawArticles, tags)

  const handleTagClicked = async (tagId: string) => {
    const tags = getTagsFromQuery(router.query.tags) ?? []
    const hasTag = tags.includes(tagId)
    const newTags = hasTag
      ? tags.filter((tag) => tag !== tagId)
      : [...tags, tagId]

    await router.replace({
      query: { ...router.query, tags: newTags },
    })
  }

  return (
    <>
      <Head>
        <title>Articles - Claudiu C. Bogdan</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <Tags tags={tags} onTagClick={handleTagClicked} className="mt-16" />
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const articles = (await getAllArticles()).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ component, ...meta }) => meta
  )
  const tags = articles.flatMap((article) => article.tags ?? [])
  return {
    props: {
      articles,
      tags,
    },
  }
}
