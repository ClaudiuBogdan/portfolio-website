import { useRouter } from "next/router"
import { CLEAR_ALL_TAG } from "./constants"
import { TArticle, Tag } from "./types"
import { getTagsFromQuery } from "."

export const useQueryTags = (tags: string[]): Tag[] => {
  const router = useRouter()

  const queryTags = getTagsFromQuery(router.query.tags)

  if (!queryTags) return tags.map((tag) => ({ label: tag, active: false }))

  const tagsWithFlags = tags.map((tag) => ({
    label: tag,
    active: queryTags.includes(tag),
  }))

  const hasActiveTags = tagsWithFlags.some((tag) => tag.active)
  if (hasActiveTags) tagsWithFlags.push(CLEAR_ALL_TAG)

  return tagsWithFlags
}

export const useArticleFilter = (
  rawArticles: TArticle[],
  tags: Tag[]
): TArticle[] => {
  const activeTags = tags.filter((tag) => tag.active).map((tag) => tag.label)

  if (activeTags.length === 0) return rawArticles

  // Filter articles by tag
  return rawArticles.filter((article) =>
    article.tags?.some((articleTag) => activeTags.includes(articleTag))
  )
}
