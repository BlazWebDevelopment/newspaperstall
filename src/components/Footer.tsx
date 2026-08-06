import Link from 'next/link'
import NewsletterForm from './NewsletterForm'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/brand'

const sectionLinks = [
  { href: '/hot', label: 'Hot' },
  { href: '/newspaper', label: 'Politics' },
  { href: '/live', label: 'Live' },
  { href: '/opinion', label: 'Opinion' },
]

const categoryLinks = [
  { href: '/finance', label: 'Business' },
  { href: '/tech', label: 'Technology' },
  { href: '/culture', label: 'Culture' },
  { href: '/sports', label: 'Sports' },
]

function LinkColumn({
  heading,
  links,
}: {
  heading: string
  links: { href: string; label: string }[]
}) {
  return (
    <div className="md:col-span-2">
      <h3 className="dr-footer-heading block mb-3">{heading}</h3>
      <ul className="space-y-2 font-cond text-[15px] uppercase tracking-[0.04em]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="dr-footer-slab mt-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-9">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/logo.png"
                alt=""
                width={44}
                height={44}
                className="w-11 h-11 dr-brand-mark"
              />
              <div>
                <span className="dr-wordmark dr-wordmark-inverse block text-[1.6rem]">
                  {SITE_NAME}
                </span>
                <span className="dr-tagline block mt-1 text-[9px] !text-[#8f8f8f]">
                  {SITE_TAGLINE}
                </span>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed max-w-sm">{SITE_DESCRIPTION}</p>
          </div>

          <LinkColumn heading="Sections" links={sectionLinks} />
          <LinkColumn heading="Categories" links={categoryLinks} />

          <div id="newsletter" className="md:col-span-4 scroll-mt-6">
            <h3 className="dr-footer-heading block mb-3">Morning briefing</h3>
            <p className="text-[13px] mb-3">
              Five loud headlines, every weekday morning. Free.
            </p>
            <NewsletterForm
              variant="inline"
              buttonLabel="Subscribe"
              placeholder="Your email address"
              onDark
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#2b2b2b] bg-[color:var(--ink-panel)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 font-cond text-[12px] uppercase tracking-[0.08em]">
            <span>
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link href="/privacy">Privacy</Link>
              <span aria-hidden="true" className="text-[#4a4a4a]">
                /
              </span>
              <Link href="/terms">Terms</Link>
              <span aria-hidden="true" className="text-[#4a4a4a]">
                /
              </span>
              <Link href="/about">About</Link>
              <span aria-hidden="true" className="text-[#4a4a4a]">
                /
              </span>
              <Link href="/help">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
