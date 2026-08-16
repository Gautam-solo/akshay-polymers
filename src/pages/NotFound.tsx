import { Link } from 'react-router-dom'
import { Picture } from '../components/Picture'
import { PRODUCTS } from '../lib/content'
import { useMeta } from '../dom/useMeta'

export function NotFound() {
  useMeta('/404')

  return (
    <main>
      <section className="page-hero page-hero-plain">
        <div className="page-hero-inner">
          <div className="page-hero-copy">
            <p className="notfound-code">404</p>
            <h1>We could not find that page.</h1>
            <p>
              The link may be out of date. Here is everything on the site, or
              call us and we will point you to the right grade.
            </p>
            <Link to="/" className="btn btn-accent">
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="notfound-links">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} to={`/${p.slug}`} className="notfound-link">
              <Picture src={p.images[0]} alt="" loading="lazy" width={320} height={240} />
              <span>{p.name}</span>
            </Link>
          ))}
          <Link to="/about" className="notfound-link notfound-link-text">
            <span>About us</span>
          </Link>
          <Link to="/contact" className="notfound-link notfound-link-text">
            <span>Contact</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
