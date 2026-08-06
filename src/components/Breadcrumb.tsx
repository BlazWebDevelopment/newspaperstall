import Link from 'next/link'

interface Crumb {
  href: string
  label: string
}

/** Grey strip under the section rail: Home / Section / Current page. */
export default function Breadcrumb({
  trail = [],
  current,
}: {
  trail?: Crumb[]
  current: string
}) {
  return (
    <div className="dr-hero-shell">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-2">
        <div className="flex items-center gap-1.5 font-cond text-[12px] uppercase tracking-[0.06em] text-[color:var(--text-muted)]">
          <Link href="/" className="hover:text-[color:var(--red)]">
            Home
          </Link>
          {trail.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              <Link href={crumb.href} className="hover:text-[color:var(--red)]">
                {crumb.label}
              </Link>
            </span>
          ))}
          <span aria-hidden="true">/</span>
          <span className="text-[color:var(--red)] truncate">{current}</span>
        </div>
      </div>
    </div>
  )
}
