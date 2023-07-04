import Head from "next/head"

import { Card } from "@/components/Card"
import { Section } from "@/components/Section"
import { SimpleLayout } from "@/components/SimpleLayout"
import en from "@/locales/en.json"
const text = en.pages.uses

type ToolsSectionProps = {
  children: React.ReactNode
  title: string
}

type ToolProps = {
  title: string
  href?: string
  children?: React.ReactNode
}

function ToolsSection({ children, ...props }: ToolsSectionProps) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }: ToolProps) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>{text.head.title}</title>
        <meta name="description" content={text.head.description} />
      </Head>
      <SimpleLayout title={text.title} intro={text.intro}>
        <div className="space-y-20">
          {text.tools.map((section) => (
            <ToolsSection key={section.category} title={section.category}>
              {section.items.map((item) => (
                <Tool key={item.title} title={item.title}>
                  {item.description}
                </Tool>
              ))}
            </ToolsSection>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}
