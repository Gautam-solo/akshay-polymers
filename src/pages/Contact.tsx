import { useState } from 'react'
import { ADDRESS, EMAILS, HOURS, PHONES, mapsUrl } from '../lib/content'
import { useMeta } from '../dom/useMeta'

export function Contact() {
  useMeta({
    title: 'Contact | Akshay Polymers, Ahmedabad',
    description:
      'Call, email or visit Akshay Polymers at Tirupati Aakruti Industrial Estate, Odhav, Ahmedabad. Open Monday to Saturday, 9:00 am to 7:00 pm.',
    path: '/contact',
  })

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const bodyText = () =>
    `${message}\n\n---\nName: ${firstName} ${lastName}`.trim() +
    `\nPhone: ${phone || 'not given'}\nEmail: ${email || 'not given'}`

  // Static site: the form hands the message to the visitor's mail app. That can
  // silently do nothing for webmail users, so we always show the address and a
  // copy button as a fallback rather than assuming it worked.
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !message.trim()) {
      setError('Please add your name and a short message.')
      return
    }
    if (!email.trim() && !phone.trim()) {
      setError('Please leave either an email or a phone number so we can reply.')
      return
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('That email address does not look right.')
      return
    }
    setError('')
    const subject = encodeURIComponent(`Enquiry from ${firstName} ${lastName}`.trim())
    const body = encodeURIComponent(bodyText())
    window.location.href = `mailto:${EMAILS[0]}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(bodyText())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setError('Could not copy. Please select the text manually.')
    }
  }

  return (
    <main>
      <section className="page-hero page-hero-plain">
        <div className="page-hero-inner">
          <div className="page-hero-copy">
            <h1>Contact us.</h1>
            <p>
              Call, write or drop by the works in Odhav. We respond fastest on
              the phone during working hours.
            </p>
          </div>
          <div className="quick-actions">
            <a className="quick-action" href={`tel:${PHONES[0].tel}`}>
              <span className="quick-action-label">Call us</span>
              <span className="quick-action-value">{PHONES[0].label}</span>
              <span className="quick-action-note">Mon to Sat, 9am to 7pm</span>
            </a>
            <a className="quick-action" href={`mailto:${EMAILS[0]}`}>
              <span className="quick-action-label">Email us</span>
              <span className="quick-action-value">{EMAILS[0]}</span>
              <span className="quick-action-note">We reply within a day</span>
            </a>
            <a
              className="quick-action"
              href={mapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="quick-action-label">Visit the works</span>
              <span className="quick-action-value">Odhav, Ahmedabad</span>
              <span className="quick-action-note">Open in Maps</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section section-contact">
        <div className="contact-grid">
          <form className="contact-form" onSubmit={submit} noValidate>
            <h2>Send a message</h2>
            <div className="field-row">
              <div className="field">
                <label htmlFor="cf-first">First name</label>
                <input
                  id="cf-first"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="cf-last">Last name</label>
                <input
                  id="cf-last"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="cf-phone">Phone</label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <p className="field-hint">Leave a phone number or an email so we can reply.</p>
            <div className="field">
              <label htmlFor="cf-message">
                Message <span className="field-opt">(grade, colour, quantity)</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn-accent">
              Send
            </button>

            <div aria-live="polite">
              {sent && (
                <div className="form-sent">
                  <p>
                    Your email app should have opened with the message ready. If
                    nothing happened, send it to{' '}
                    <a href={`mailto:${EMAILS[0]}`}>{EMAILS[0]}</a> or call{' '}
                    <a href={`tel:${PHONES[0].tel}`}>{PHONES[0].label}</a>.
                  </p>
                  <button type="button" className="btn btn-ghost" onClick={copyMessage}>
                    {copied ? 'Copied' : 'Copy my message'}
                  </button>
                </div>
              )}
            </div>
          </form>

          <div className="contact-details">
            <div className="contact-block">
              <h3>Phone</h3>
              <ul>
                {PHONES.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`}>{p.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact-block">
              <h3>Email</h3>
              <ul>
                {EMAILS.map((e) => (
                  <li key={e}>
                    <a href={`mailto:${e}`}>{e}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact-block">
              <h3>Hours</h3>
              <dl className="hours">
                {HOURS.map((h) => (
                  <div className="hours-row" key={h.days}>
                    <dt>{h.days}</dt>
                    <dd className={h.closed ? 'hours-closed' : undefined}>
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="contact-block">
              <h3>Works</h3>
              <address className="contact-address">{ADDRESS}</address>
              <a
                className="maps-link"
                href={mapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
