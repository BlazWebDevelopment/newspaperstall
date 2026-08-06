import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

interface InfoPageProps {
  title: string
  kicker?: string
  updated?: string
  intro?: string
  children: React.ReactNode
}

export default function InfoPage({ title, kicker, updated, intro, children }: InfoPageProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb current={title} />

      <main className="max-w-[820px] mx-auto px-4 md:px-6 py-8">
        <article>
          {kicker && <div className="section-label mb-1.5">{kicker}</div>}
          <h1 className="dr-page-title text-[32px] md:text-[42px]">{title}</h1>
          {updated && (
            <p className="font-cond text-[13px] uppercase tracking-[0.08em] text-[color:var(--text-muted)] mt-2">
              Last updated {updated}
            </p>
          )}
          {intro && (
            <p className="font-sans font-bold text-[16px] text-[color:var(--text-secondary)] leading-[1.55] mt-4 pb-5 mb-6 border-b border-[color:var(--border-soft)]">
              {intro}
            </p>
          )}

          <div className={`info-content ${intro ? '' : 'mt-6'}`}>{children}</div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
