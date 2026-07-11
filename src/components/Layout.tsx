import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { SmoothScroll, scrollToAnchor, scrollToTop } from '../dom/SmoothScroll'
import { PHONE_MAIN, PRODUCTS } from '../lib/content'

function Brand({ badgeSize = 40 }: { badgeSize?: number }) {
  return (
    <Link className="brand" to="/">
      <img
        src="/logo.jpg"
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

  // land at the top (or the requested anchor) on every route change
  useEffect(() => {
    if (location.hash) {
      // wait one frame so the target section exists after the route renders
      requestAnimationFrame(() => scrollToAnchor(location.hash))
    } else {
      scrollToTop()
    }
  }, [location.pathname, location.hash])

  return (
    <>
      <SmoothScroll />

      <header className="nav">
        <Brand />
        <nav className="nav-links" aria-label="Primary">
          <Link to="/#products">Products</Link>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <a className="btn btn-small" href={`tel:${PHONE_MAIN}`}>
          Get a quote
        </a>
      </header>

      <Outlet />

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col footer-col-brand">
            <Brand badgeSize={34} />
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
          <span className="footer-credit">
            Some photography by Jacorna, Teemeah and SuSanA Secretariat via
            Wikimedia Commons (CC BY / CC BY-SA)
          </span>
        </div>
      </footer>
    </>
  )
}
