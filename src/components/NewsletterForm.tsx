'use client'

import { useEffect, useState } from 'react'

type Variant = 'inline' | 'stacked'

interface NewsletterFormProps {
  variant?: Variant
  buttonLabel?: string
  placeholder?: string
  className?: string
  /** Inverts the input styling for use on the black footer slab. */
  onDark?: boolean
}

const STORAGE_KEY = 'nps-subscribed-email'

const isValidEmail = (val: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
}

const LIGHT_INPUT =
  'bg-[color:var(--bg-base)] border border-[color:var(--border-strong)] text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:border-[color:var(--red)]'

const DARK_INPUT =
  'bg-[color:var(--ink-panel-2)] border border-[#4a4a4a] text-white placeholder-[#8b8b8b] focus:border-[color:var(--red)]'

export default function NewsletterForm({
  variant = 'stacked',
  buttonLabel = 'Subscribe',
  placeholder = 'your@email.com',
  className = '',
  onDark = false,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null)

  const inputClass = onDark ? DARK_INPUT : LIGHT_INPUT

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setSubscribedEmail(stored)
    } catch {
      /* localStorage unavailable */
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }
    if (!isValidEmail(trimmed)) {
      setStatus('error')
      setMessage("That doesn't look like a valid email.")
      return
    }

    setStatus('submitting')
    setMessage('')

    window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, trimmed)
      } catch {
        /* ignore */
      }
      setSubscribedEmail(trimmed)
      setStatus('success')
      setMessage(`You're subscribed — confirmation sent to ${trimmed}.`)
      setEmail('')
    }, 700)
  }

  const handleUnsubscribe = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setSubscribedEmail(null)
    setStatus('idle')
    setMessage('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (status === 'error') {
      setStatus('idle')
      setMessage('')
    }
  }

  if (subscribedEmail && status !== 'submitting') {
    return (
      <div className={className} role="status" aria-live="polite">
        <div
          className={`border-l-4 border-l-[color:var(--red)] px-3.5 py-3 dr-notice-ok ${
            onDark
              ? 'bg-[color:var(--ink-panel-2)]'
              : 'bg-[color:var(--bg-surface)] border-y border-r border-[color:var(--border-soft)]'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <span
              className="mt-0.5 inline-flex w-5 h-5 shrink-0 items-center justify-center dr-icon-btn bg-[color:var(--red)] text-white"
              aria-hidden="true"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <div
                className={`font-cond text-[15px] font-semibold uppercase tracking-[0.04em] ${
                  onDark ? 'text-white' : 'text-[color:var(--text-primary)]'
                }`}
              >
                Successfully subscribed
              </div>
              <div
                className={`text-[13px] mt-0.5 break-words ${
                  onDark ? 'text-[#b4b4b4]' : 'text-[color:var(--text-secondary)]'
                }`}
              >
                Headlines will land at <span className="font-bold">{subscribedEmail}</span>.
              </div>
              <button
                type="button"
                onClick={handleUnsubscribe}
                className="mt-1.5 text-[12px] text-[color:var(--red)] hover:text-[color:var(--red-dark)] underline"
              >
                Use a different email
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {variant === 'stacked' ? (
        <>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={status === 'submitting'}
            aria-invalid={status === 'error'}
            aria-label="Email address"
            className={`w-full px-3 py-2 text-[13px] font-sans mb-2 dr-field focus:outline-none ${inputClass}`}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-2 text-[14px] dr-btn-cta disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Subscribing…' : buttonLabel}
          </button>
        </>
      ) : (
        <div className="flex items-stretch">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={status === 'submitting'}
            aria-invalid={status === 'error'}
            aria-label="Email address"
            className={`flex-1 min-w-0 px-3 py-2 text-[13px] font-sans dr-field focus:outline-none ${inputClass}`}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-4 py-2 -ml-px text-[14px] dr-btn-cta whitespace-nowrap shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? '…' : buttonLabel}
          </button>
        </div>
      )}

      {status === 'error' && message && (
        <div
          className={`mt-1.5 text-[12px] ${
            onDark ? 'text-[#d9d9d9]' : 'text-[color:var(--text-secondary)]'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  )
}
