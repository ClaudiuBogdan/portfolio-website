import Head from "next/head"
import Image from "next/image"

import { Container } from "@/components/Container"
import { mapSocialLinkToIcon } from "@/components/SocialIcons"
import { SocialLinkLabel } from "@/components/SocialLinkLabel"
import portraitImage from "@/images/portrait.png"
import en from "@/locales/en.json"

const text = en.pages.about
const socialLinks = en.socialLinks
const email = en.email

export default function About() {
  return (
    <>
      <Head>
        <title>{text.head.title}</title>
        <meta name="description" content={text.head.description} />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {text.title}
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-200">
              {text.descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              {socialLinks.map((socialLink) => (
                <SocialLinkLabel
                  key={socialLink.name}
                  href={socialLink.href}
                  icon={mapSocialLinkToIcon(socialLink.icon)}
                  className="mt-4"
                >
                  {socialLink.label}
                </SocialLinkLabel>
              ))}
              <SocialLinkLabel
                href={email.href}
                icon={mapSocialLinkToIcon(email.icon)}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                {email.label}
              </SocialLinkLabel>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
