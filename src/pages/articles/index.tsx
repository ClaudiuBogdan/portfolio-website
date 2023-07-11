import Head from "next/head"

import { useRouter } from "next/router"
import { Article } from "@/components/Article/Article"
import { getTagsFromQuery, toggleTags } from "@/components/Article/utils"
import { CLEAR_ALL_TAG } from "@/components/Article/utils/constants"
import {
  useArticleFilter,
  useQueryTags,
} from "@/components/Article/utils/hooks"
import { TArticle } from "@/components/Article/utils/types"
import { SimpleLayout } from "@/components/SimpleLayout"
import { Tags } from "@/components/Tags"
import { getAllArticles } from "@/lib/getAllArticles"
import en from "@/locales/en.json"

const text = en.pages.articles

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
    const oldTags = getTagsFromQuery(router.query.tags) ?? []
    const newTags = toggleTags(oldTags, tagId)

    await router.replace({
      query: { ...router.query, tags: newTags },
    })
  }

  return (
    <>
      <Head>
        <title>{text.head.title}</title>
        <meta name="description" content={text.head.description} />
      </Head>
      <SimpleLayout title={text.title} intro={text.intro}>
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
  const allTags = articles.flatMap((article) => article.tags ?? [])
  const tags = [...new Set(allTags)] // Remove duplicates

  return {
    props: {
      articles,
      tags,
    },
  }
}
