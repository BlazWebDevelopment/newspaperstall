'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/brand'

type NavItem = {
  href: string
  label: string
  live?: boolean
}

const navItems: NavItem[] = [
  { href: '/', label: 'Top Stories' },
  { href: '/hot', label: 'Hot' },
  { href: '/live', label: 'Live', live: true },
  { href: '/newspaper', label: 'Politics' },
  { href: '/finance', label: 'Business' },
  { href: '/tech', label: 'Technology' },
  { href: '/sports', label: 'Sports' },
  { href: '/culture', label: 'Culture' },
  { href: '/opinion', label: 'Opinion' },
]

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [today, setToday] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  // Rendered on the client only so the printed date never mismatches the server.
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    )
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const renderItem = (item: NavItem) => {
    const isActive = pathname === item.href
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`dr-nav-link shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-[14px] tracking-[0.04em] whitespace-nowrap -mb-px ${
          isActive ? 'dr-nav-link-active' : ''
        }`}
      >
        {item.live && <span className="w-1.5 h-1.5 bg-[color:var(--red)] live-dot" />}
        <span>{item.label}</span>
      </Link>
    )
  }

  // The section rail sits outside <header> so `sticky` is not capped by the masthead's box.
  return (
    <>
      <header className="dr-header-slab">
        {/* Utility strip: dateline left, secondary links right */}
        <div className="dr-utility-bar">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-8 font-cond text-[12px] font-medium uppercase tracking-[0.1em]">
              <span>{today || '\u00a0'}</span>
              <span className="hidden sm:flex items-center gap-3">
                <Link href="/about">About</Link>
                <span aria-hidden="true" className="text-[#4a4a4a]">
                  /
                </span>
                <Link href="/help">Help</Link>
                <span aria-hidden="true" className="text-[#4a4a4a]">
                  /
                </span>
                <Link href="/terms">Terms</Link>
                <span aria-hidden="true" className="text-[#4a4a4a]">
                  /
                </span>
                <Link href="/#newsletter" className="text-[color:var(--red)] hover:!text-white">
                  Newsletter
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Masthead */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="pt-4 pb-3 md:pt-6 md:pb-4 flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2.5 md:gap-4">
              <img
                src="/logo.png"
                alt=""
                width={56}
                height={56}
                className="w-9 h-9 md:w-14 md:h-14 dr-brand-mark"
              />
              <span className="dr-wordmark text-[1.65rem] sm:text-[2.4rem] md:text-[3.4rem] lg:text-[4rem] whitespace-nowrap">
                {SITE_NAME}
              </span>
            </Link>
            <div className="mt-2.5 flex items-center gap-2.5 w-full max-w-md">
              <span className="h-[2px] flex-1 bg-[color:var(--ink-black)]" />
              <span className="dr-tagline text-[9px] md:text-[10px] whitespace-nowrap">
                {SITE_TAGLINE}
              </span>
              <span className="h-[2px] flex-1 bg-[color:var(--ink-black)]" />
            </div>
          </div>
        </div>
      </header>

      {/* Section rail + desktop search */}
      <nav className="dr-nav-rail sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-2 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {navItems.map(renderItem)}
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center dr-search h-7 pl-2 pr-0 shrink-0"
            >
              <input
                type="text"
                placeholder="Search"
                aria-label={`Search ${SITE_NAME}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 bg-transparent text-[12px] font-sans text-white placeholder-[#8b8b8b] focus:outline-none"
              />
              <button
                type="submit"
                className="h-full px-2.5 bg-[color:var(--red)] font-cond text-[12px] font-semibold uppercase tracking-[0.06em] text-white hover:bg-[color:var(--red-dark)]"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile search */}
      <div className="lg:hidden border-b border-[color:var(--border-soft)] bg-[color:var(--bg-surface)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-2">
          <form
            onSubmit={handleSearch}
            className="flex items-center dr-search dr-search-light h-9 pl-2.5"
          >
            <input
              type="text"
              placeholder={`Search ${SITE_NAME}`}
              aria-label={`Search ${SITE_NAME}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13px] font-sans text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              className="h-full px-3.5 bg-[color:var(--red)] font-cond text-[12px] font-semibold uppercase tracking-[0.06em] text-white"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
