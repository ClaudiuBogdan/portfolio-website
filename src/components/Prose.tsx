import React, { FC } from "react"
import clsx from "clsx"

type ProseProps = {
  className?: string
  children: React.ReactNode
}

export const Prose: FC<ProseProps> = ({ children, className }) => {
  return (
    <div className={clsx(className, "prose dark:prose-invert")}>{children}</div>
  )
}
