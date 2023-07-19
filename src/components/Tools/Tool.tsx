import { Card } from "../Card"

type ToolProps = {
  title: string
  href?: string
  children?: React.ReactNode
}

export function Tool({ title, href, children }: ToolProps) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}
