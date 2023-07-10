import clsx from "clsx"
import { FC } from "react"

type TagProps = {
  className?: string
  children?: React.ReactNode
  label: string
  onClick?: (tagId: string) => void
}

export const Tag: FC<TagProps> = ({ children, className, label, onClick }) => {
  const handleTagClick = () => {
    if (onClick) {
      onClick(label)
    }
  }

  return (
    <span
      onClick={handleTagClick}
      className={clsx(
        "inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children ?? label}
    </span>
  )
}

export const Tags: FC<{
  tags: string[]
  onTagClick?: (tagId: string) => void
}> = ({ tags, onTagClick }) => {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap space-x-3">
      {tags.map((tag) => (
        <Tag key={tag} label={tag} onClick={onTagClick} />
      ))}
    </div>
  )
}
