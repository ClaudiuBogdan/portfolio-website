import clsx from "clsx"
import { FC } from "react"

type TagProps = {
  className?: string
  children?: React.ReactNode
  label: string
  active?: boolean
  onClick?: (tagId: string) => void
}

type Tag = {
  label: string
  active: boolean
}

export const Tag: FC<TagProps> = ({
  children,
  className,
  label,
  active,
  onClick,
}) => {
  const handleTagClick = () => {
    if (onClick) {
      onClick(label)
    }
  }

  return (
    <span
      onClick={handleTagClick}
      className={clsx(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        active
          ? "bg-green-500/10 text-green-400 ring-green-500/20"
          : "bg-blue-400/10 text-blue-400  ring-blue-400/30",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children ?? label}
    </span>
  )
}

export const Tags: FC<{
  tags: Tag[]
  onTagClick?: (tagId: string) => void
}> = ({ tags, onTagClick }) => {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap space-x-3">
      {tags.map((tag) => (
        <Tag
          key={tag.label}
          label={tag.label}
          active={tag.active}
          onClick={onTagClick}
        />
      ))}
    </div>
  )
}
