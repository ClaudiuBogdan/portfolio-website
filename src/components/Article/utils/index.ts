import { CLEAR_ALL_TAG } from "./constants"

export const getTagsFromQuery = (
  queryTags: string | string[] | undefined
): string[] | null => {
  if (!queryTags) return null

  if (typeof queryTags === "string") return [queryTags]

  return queryTags
}

export const toggleTags = (tags: string[], tagId: string): string[] => {
  // Clear all tags if the user clicks on the "Clear all" tag
  if (tagId === CLEAR_ALL_TAG.label) {
    return []
  }

  // Toggle the tag and leave the rest as they are
  const hasTag = tags.includes(tagId)
  const newTags = hasTag
    ? tags.filter((tag) => tag !== tagId) // Remove the tag
    : [...tags, tagId] // Add the tag

  return newTags
}
