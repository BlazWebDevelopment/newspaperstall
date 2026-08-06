import Link from 'next/link'

/** Black flag sitting on a heavy rule — the standard tabloid section marker. */
export default function SectionHeading({
  title,
  href,
  linkLabel = 'More',
  aside,
}: {
  title: string
  href?: string
  linkLabel?: string
  aside?: string
}) {
  return (
    <div className="dr-section-accent flex items-stretch justify-between gap-3 mb-3">
      <h2 className="dr-section-flag">{title}</h2>
      {href ? (
        <Link href={href} className="dr-more-link shrink-0 self-center">
          {linkLabel} &rsaquo;
        </Link>
      ) : aside ? (
        <span className="shrink-0 self-center font-cond text-[12px] uppercase tracking-[0.06em] text-[color:var(--text-muted)]">
          {aside}
        </span>
      ) : null}
    </div>
  )
}
