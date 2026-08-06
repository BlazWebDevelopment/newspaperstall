import type { Article } from '@/data/articles'
import { SITE_SHORT_NAME } from '@/lib/brand'
import { relativeTime } from '@/lib/time'

export default function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-sans text-[color:var(--text-muted)] min-w-0">
      <span className="dr-kicker-mark text-[9px] uppercase leading-[1.35]">
        {SITE_SHORT_NAME}
      </span>
      <span className="truncate">{article.byline ?? SITE_SHORT_NAME}</span>
      <span aria-hidden="true" className="text-[color:var(--border-strong)]">
        /
      </span>
      <span className="shrink-0">{relativeTime(article.date, article.time)}</span>
    </div>
  )
}
