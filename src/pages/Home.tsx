import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Experience } from '../scene/Experience'
import { ImageCycler } from '../components/ImageCycler'
import { scrollToAnchor } from '../dom/SmoothScroll'
import { useReveal } from '../dom/useReveal'
import { PHONE_MAIN, PRODUCTS, STATS } from '../lib/content'

function supportsWebGL2(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

export function Home() {
  const [ready, setReady] = useState(false)
  const webgl = useMemo(supportsWebGL2, [])
  const desktop = useMemo(
    () => window.innerWidth >= 900 && matchMedia('(pointer: fine)').matches,
    [],
  )
  const count = desktop ? 22400 : 7200

  // The hero copy waits for the scene so the two arrive together, but it must
  // never depend on it: if WebGL init fails the headline still has to show.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1500)
    return () => window.clearTimeout(t)
  }, [])

  const productsReveal = useReveal<HTMLDivElement>()
  const aboutReveal = useReveal<HTMLDivElement>()
  const contactReveal = useReveal<HTMLDivElement>()

  return (
    <main>
      <section className="hero" aria-label="Akshay Polymers">
        {webgl && (
          <div className="hero-canvas" aria-hidden="true">
            <Experience count={count} dof={desktop} onReady={() => setReady(true)} />
          </div>
        )}
        <div className={`hero-copy ${ready || !webgl ? 'hero-copy-in' : ''}`}>
          <h1>
            Quality is
            <br />
            our motto.
          </h1>
          <p>
            Manufacturers of engineering plastic granules in Ahmedabad since
            2014. Polycarbonate, ABS and PBT compounds, delivered across India.
          </p>
          <a
            href="#products"
            className="btn btn-accent"
            onClick={(e) => {
              e.preventDefault()
              scrollToAnchor('#products')
            }}
          >
            Explore products
          </a>
        </div>
      </section>

      <section className="stats" aria-label="Highlights">
        <dl className="stats-row">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="products" className="section">
        <div className="section-head reveal" ref={productsReveal}>
          <h2>Our granules</h2>
          <p>
            Specialised plastic granules backed by an expansive selection and a
            deep, ready inventory.
          </p>
        </div>
        <div className="product-grid">
          {PRODUCTS.map((p) => (
            <article className="product-card" key={p.slug}>
              <Link to={`/${p.slug}`} className="product-link">
                <div className="product-media">
                  <ImageCycler images={p.images} alt={p.alt} width={640} height={480} />
                </div>
                <div className="product-body">
                  <h3>{p.name}</h3>
                  <p>{p.short}</p>
                  <span className="product-more">View details</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section">
        <div className="about-grid reveal" ref={aboutReveal}>
          <div className="about-media">
            <img
              src="/facility.jpg"
              alt="Warehouse with stacked granule bags and processing equipment"
              loading="lazy"
              width={900}
              height={600}
            />
          </div>
          <div className="about-body">
            <h2>The symbol of quality.</h2>
            <p>
              Akshay Polymers was founded in 2014 in Odhav, Ahmedabad, out of a
              pure passion for people. Since then the team has become skilled
              at manufacturing specialised plastic granules for industries
              across India.
            </p>
            <ul className="about-points">
              <li>Consistent, tested granule quality</li>
              <li>Wide selection with ready inventory</li>
              <li>Dispatch to every corner of India</li>
            </ul>
            <Link to="/about" className="text-link">
              More about us
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-contact">
        <div className="contact-cta reveal" ref={contactReveal}>
          <h2>Talk to us.</h2>
          <p>
            Tell us what you are moulding and we will match the right granule,
            colour and grade.
          </p>
          <div className="contact-cta-actions">
            <a className="btn btn-accent" href={`tel:${PHONE_MAIN}`}>
              Get a quote
            </a>
            <Link to="/contact" className="text-link">
              All contact details
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
