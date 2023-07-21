import Head from "next/head"
import Image from "next/image"

import { Card } from "@/components/Card"
import { LinkIcon } from "@/components/Icons/LinkIcon"
import { mapLogo } from "@/components/Logos"
import { SimpleLayout } from "@/components/SimpleLayout"
import en from "@/locales/en.json"

const projects = en.projects
const text = en.pages.projects

export default function Projects() {
  return (
    <>
      <Head>
        <title>{text.head.title}</title>
        <meta name="description" content={text.head.description} />
      </Head>
      <SimpleLayout title={text.title} intro={text.intro}>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={mapLogo(project.logo)}
                  alt={project.logo}
                  className="h-8 w-8"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
