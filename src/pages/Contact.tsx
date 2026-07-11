import { useState } from 'react'
import { ADDRESS, EMAILS, HOURS, PHONES } from '../lib/content'

export function Contact() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // static site: the form composes an email in the visitor's mail app
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !message.trim()) {
      setError('Please add your name and a short message.')
      return
    }
    setError('')
    const subject = encodeURIComponent(`Enquiry from ${firstName} ${lastName}`.trim())
    const body = encodeURIComponent(
      `${message}\n\nName: ${firstName} ${lastName}\nEmail: ${email}`,
    )
    window.location.href = `mailto:${EMAILS[0]}?subject=${subject}&body=${body}`
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
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="cf-message">Message</label>
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
            <p className="form-note">Opens your email app with the message ready to send.</p>
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
              <ul>
                {HOURS.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.time}
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact-block">
              <h3>Works</h3>
              <p>{ADDRESS}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
