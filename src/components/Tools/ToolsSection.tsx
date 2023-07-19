import { Section } from "../Section"

type ToolsSectionProps = {
  children: React.ReactNode
  title: string
}

export function ToolsSection({ children, ...props }: ToolsSectionProps) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}
