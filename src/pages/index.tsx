import Head from 'next/head'
import { Container } from '@/components/Container'
import { IconMapper } from '@/components/SocialIcons'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { SocialLink } from '@/components/SocialLink'
import { Photos } from '@/components/Photos'
import { Article } from '@/components/Article'
import { Newsletter } from '@/components/Newsletter'
import { Resume } from '@/components/Resume'
import en from '@/locales/en.json'

type TArticle = {
  title: string
  description: string
  slug: string
  date: string
  image: string
}


export default function Home({ articles }: { articles: TArticle[] }) {
  const text = en.pages.home
  const socialLinks = en.socialLinks
  return (
    <>
      <Head>
        <title>
          {text.meta.title}
        </title>
        <meta
          name="description"
          content={text.meta.description}
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {text.title}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {text.aboutMe}
          </p>
          <div className="mt-6 flex gap-6">
            {socialLinks.map((socialLink) => (
              <SocialLink
                key={socialLink.name}
                href={socialLink.href}
                aria-label={socialLink.ariaLabel}
                icon={IconMapper[socialLink.icon]}
              />
            ))}
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ component, ...meta }) => meta),
    },
  }
}
