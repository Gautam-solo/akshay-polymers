import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { SmoothScroll, scrollToAnchor, scrollToTop } from '../dom/SmoothScroll'
import { PHONE_LABEL, PHONE_MAIN, PRODUCTS } from '../lib/content'

function Brand({ badgeSize = 56 }: { badgeSize?: number }) {
  return (
    <Link className="brand" to="/">
      <img
        src="/logo-mark.png"
        alt="Akshay Polymers logo"
        className="brand-badge"
        style={{ width: badgeSize, height: badgeSize }}
      />
      <span className="brand-name">
        AKSHAY <em>POLYMERS</em>
      </span>
    </Link>
  )
}

export function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // land at the top (or the requested anchor) on every route change
  useEffect(() => {
    if (location.hash) {
      // wait one frame so the target section exists after the route renders
      requestAnimationFrame(() => scrollToAnchor(location.hash))
    } else {
      scrollToTop()
    }
  }, [location.pathname, location.hash])

  // never leave the menu open behind a new page
  useEffect(() => setMenuOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <SmoothScroll />

      <header className={`nav ${menuOpen ? 'nav-open' : ''}`}>
        <Brand />
        <nav className="nav-links" aria-label="Primary">
          <Link to="/#products">Products</Link>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <a className="btn btn-small nav-quote" href={`tel:${PHONE_MAIN}`}>
          Get a quote
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}
        hidden={!menuOpen}
      >
        <Link to="/#products">Products</Link>
        {PRODUCTS.map((p) => (
          <Link key={p.slug} to={`/${p.slug}`} className="mobile-menu-sub">
            {p.name}
          </Link>
        ))}
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <a className="btn btn-accent" href={`tel:${PHONE_MAIN}`}>
          Get a quote
        </a>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="menu-scrim"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <Outlet />

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col footer-col-brand">
            <Brand badgeSize={46} />
            <p>Engineering plastic granules, made in Ahmedabad since 2014.</p>
          </div>
          <nav className="footer-col" aria-label="Products">
            <h3>Products</h3>
            {PRODUCTS.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`}>
                {p.name}
              </Link>
            ))}
          </nav>
          <nav className="footer-col" aria-label="Company">
            <h3>Company</h3>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-base">
          <span>© 2026 Akshay Polymers, Ahmedabad</span>
          <a href={`tel:${PHONE_MAIN}`}>{PHONE_LABEL}</a>
        </div>
      </footer>
    </>
  )
}
