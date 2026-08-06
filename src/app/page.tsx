'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import ArticleMeta from '@/components/ArticleMeta'
import SectionHeading from '@/components/SectionHeading'
import { articles, getArticleImageSrc, getArticleSlug, type Article } from '@/data/articles'
import Link from 'next/link'

const FALLBACK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&q=80&auto=format&fit=crop'

const TICKER_HEADLINES = [
  'King Charles back in NYC after 19 years',
  'UAE leaves OPEC May 1',
  'Musk vs OpenAI trial opens in California',
  'Knicks roll Hawks 127–97, take 3–2 series lead',
  'Gemini wires AI agents into live crypto trading',
  'Apple unveils Vision Pro 2',
  'Fed cuts rates 50 basis points',
].join('  •  ')

export default function Home() {
  const featuredArticle = articles[0]
  const isLeopoldFeatured = featuredArticle.id === '98437309'
  const subFeatured = articles.slice(1, 3)
  const topGrid = articles.slice(3, 9)
  const wireList = articles.slice(9, 16)
  const businessFeed = articles.filter((a) => a.section === 'finance').slice(0, 4)
  const techFeed = articles.filter((a) => a.section === 'tech').slice(0, 4)
  const sportsFeed = articles.filter((a) => a.section === 'sports').slice(0, 4)
  const cultureFeed = articles.filter((a) => a.section === 'culture').slice(0, 4)

  const renderModule = (title: string, href: string, items: Article[]) => (
    <section>
      <SectionHeading title={title} href={href} />
      <ul className="divide-y divide-[color:var(--border-soft)]">
        {items.map((a) => (
          <li key={a.id}>
            <Link href={`/article/${getArticleSlug(a)}`} className="flex gap-3 py-2.5 first:pt-0 group">
              <div className="flex-1 min-w-0">
                <h3 className="headline text-[15px] line-clamp-3 mb-1">{a.title}</h3>
                <ArticleMeta article={a} />
              </div>
              {getArticleImageSrc(a.image) ? (
                <div className="w-[70px] h-[52px] dr-thumb overflow-hidden bg-[color:var(--bg-secondary)] shrink-0">
                  <img
                    src={getArticleImageSrc(a.image)!}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )

  return (
    <div className="min-h-screen">
      <Header />

      {/* Breaking rail */}
      <div className="dr-ticker-rail">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-1.5 flex items-center gap-3 overflow-hidden">
          <span className="dr-flag dr-flag-black shrink-0 text-[13px]">
            <span className="w-1.5 h-1.5 bg-[color:var(--red)] live-dot" />
            Breaking
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-ticker font-cond text-[14px] font-medium uppercase tracking-[0.04em] text-white">
              <span className="pr-10">{TICKER_HEADLINES}</span>
              <span className="pr-10" aria-hidden="true">
                {TICKER_HEADLINES}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Lead column */}
          <div className="lg:col-span-8 min-w-0">
            {/* Splash story */}
            <Link href={`/article/${getArticleSlug(featuredArticle)}`} className="block group">
              <article>
                <div className="dr-hero-frame">
                  <div className="aspect-[16/11] sm:aspect-[16/10] md:aspect-[2/1]">
                    <img
                      src={getArticleImageSrc(featuredArticle.image) ?? FALLBACK_HERO_IMAGE}
                      alt=""
                      className={`w-full h-full ${
                        isLeopoldFeatured ? 'object-contain' : 'object-cover'
                      }`}
                    />
                  </div>
                  <div className="dr-hero-scrim" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <span className="dr-flag mb-2 md:mb-3">{featuredArticle.category}</span>
                    <h1 className="dr-splash text-white text-[30px] sm:text-[40px] md:text-[52px] lg:text-[60px] line-clamp-4 group-hover:underline decoration-[color:var(--red)] decoration-[5px] underline-offset-[6px]">
                      {featuredArticle.title}
                    </h1>
                  </div>
                </div>
                <div className="pt-3 pb-5 border-b-[3px] border-[color:var(--ink-black)]">
                  <p className="font-sans font-bold text-[16px] md:text-[17px] text-[color:var(--text-secondary)] leading-[1.45] mb-2">
                    {featuredArticle.summary}
                  </p>
                  <ArticleMeta article={featuredArticle} />
                </div>
              </article>
            </Link>

            {/* Two-up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {subFeatured.map((a) => (
                <Link key={a.id} href={`/article/${getArticleSlug(a)}`} className="block group">
                  <article className="h-full flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden bg-[color:var(--bg-secondary)] dr-thumb">
                      <img
                        src={getArticleImageSrc(a.image) ?? FALLBACK_HERO_IMAGE}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-2.5 flex flex-col flex-1">
                      <div className="section-label mb-1">{a.category}</div>
                      <h3 className="headline text-[21px] mb-1.5 line-clamp-3">{a.title}</h3>
                      <p className="font-sans text-[13px] text-[color:var(--text-secondary)] leading-[1.5] line-clamp-2 mb-2">
                        {a.summary}
                      </p>
                      <div className="mt-auto">
                        <ArticleMeta article={a} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* More headlines */}
            <section className="mt-7">
              <SectionHeading title="More Headlines" href="/hot" />
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-7">
                {topGrid.map((article, idx) => (
                  <Link
                    key={article.id}
                    href={`/article/${getArticleSlug(article)}`}
                    className={`flex gap-3 py-3 group border-t border-[color:var(--border-soft)] first:border-t-0 ${
                      idx === 1 ? 'md:border-t-0' : ''
                    } ${idx % 2 === 0 ? 'md:pr-7 md:border-r md:border-r-[color:var(--border-soft)]' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="section-label mb-1">{article.category}</div>
                      <h3 className="headline text-[16px] line-clamp-3 mb-1">{article.title}</h3>
                      <ArticleMeta article={article} />
                    </div>
                    {getArticleImageSrc(article.image) ? (
                      <div className="w-[86px] h-[64px] dr-thumb overflow-hidden bg-[color:var(--bg-secondary)] shrink-0">
                        <img
                          src={getArticleImageSrc(article.image)!}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>

            {/* Section feeds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-7 pt-7 border-t-[3px] border-[color:var(--ink-black)]">
              {renderModule('Business', '/finance', businessFeed)}
              {renderModule('Technology', '/tech', techFeed)}
              {renderModule('Sports', '/sports', sportsFeed)}
              {renderModule('Culture', '/culture', cultureFeed)}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:border-l lg:border-[color:var(--border-soft)] lg:pl-7">
            <div className="space-y-7">
              <section>
                <SectionHeading title="Most Read" aside="Last 24 hours" />
                <ol className="divide-y divide-[color:var(--border-soft)]">
                  {articles.slice(0, 6).map((article, index) => (
                    <li key={article.id}>
                      <Link
                        href={`/article/${getArticleSlug(article)}`}
                        className="flex gap-3 py-2.5 first:pt-0 group"
                      >
                        <span className="dr-rank text-[28px] w-7 shrink-0">{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="headline text-[15px] leading-snug line-clamp-3 mb-1">
                            {article.title}
                          </h3>
                          <ArticleMeta article={article} />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="newsletter" className="dr-card dr-newsletter-glow p-4 scroll-mt-6">
                <h2 className="font-cond text-[19px] font-semibold uppercase tracking-[0.04em] text-[color:var(--text-primary)] mb-1">
                  Morning Briefing
                </h2>
                <p className="text-[13px] font-sans text-[color:var(--text-secondary)] mb-3 leading-relaxed">
                  Five loud headlines, every weekday morning. Free.
                </p>
                <NewsletterForm variant="stacked" buttonLabel="Subscribe" />
              </section>

              <section>
                <SectionHeading title="More From The Wire" />
                <ul className="divide-y divide-[color:var(--border-soft)]">
                  {wireList.map((article) => (
                    <li key={article.id}>
                      <Link
                        href={`/article/${getArticleSlug(article)}`}
                        className="block py-2.5 first:pt-0 group"
                      >
                        <h3 className="headline text-[15px] leading-snug line-clamp-2 mb-1">
                          {article.title}
                        </h3>
                        <ArticleMeta article={article} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
