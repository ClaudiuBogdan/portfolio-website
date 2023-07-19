import Head from "next/head"

import { SimpleLayout } from "@/components/SimpleLayout"
import { Tool, ToolsSection } from "@/components/Tools"
import en from "@/locales/en.json"

const text = en.pages.uses

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
