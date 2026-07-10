import { useEffect, useMemo, useRef, useState } from 'react'
import { Experience } from './scene/Experience'
import { SmoothScroll, scrollToAnchor } from './dom/SmoothScroll'
import { useReveal } from './dom/useReveal'

const PHONE_MAIN = '+919725829280'
const PHONES = [
  { label: '+91 97258 29280', tel: '+919725829280' },
  { label: '+91 97000 00701', tel: '+919700000701' },
  { label: '+91 83280 93342', tel: '+918328093342' },
]
const EMAILS = ['jainjainjain701@gmail.com', 'akshaypolymer014@gmail.com']
const ADDRESS =
  'B-45, Shreeram Estate, B/H Billeshwar Estate, Odhav Ring Road, Odhav, Ahmedabad - 382415, Gujarat, India'

const PRODUCTS = [
  {
    name: 'Polycarbonate Granules',
    image: '/product-pc.jpg',
    alt: 'Grey polycarbonate granules spilling from glass test tubes',
    body: 'Made on the latest technology for superior quality, strength and excellent heat resistance.',
    uses: 'Electrical accessories and engineering products',
  },
  {
    name: 'ABS Granules',
    image: '/product-abs.jpg',
    alt: 'ABS granules in many colors with matching color swatch tags',
    body: 'Outstanding mechanical and high-impact strength that moulds cleanly into rigid shapes.',
    uses: 'Toy industry and consumer goods',
  },
  {
    name: 'PBT Granules',
    image: '/product-pbt.jpg',
    alt: 'Beakers filled with PBT granules in white, green, black, blue and yellow',
    body: 'Good electrical resistance with fast crystallisation. FR, non-FR and glass-filled ranges in a wide choice of colours.',
    uses: 'Electrical, electronic and automotive components',
  },
]

const STATS = [
  { value: '200+', label: 'Happy customers' },
  { value: '14+', label: 'Years experience' },
  { value: 'All India', label: 'Delivery' },
]

function supportsWebGL2(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

function AnchorLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        scrollToAnchor(href)
      }}
    >
      {children}
    </a>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [heroActive, setHeroActive] = useState(true)
  const heroRef = useRef<HTMLElement>(null)
  const webgl = useMemo(supportsWebGL2, [])
  const desktop = useMemo(
    () => window.innerWidth >= 900 && matchMedia('(pointer: fine)').matches,
    [],
  )
  const count = desktop ? 50000 : 15000

  // pause the WebGL loop once the hero has scrolled away
  useEffect(() => {
    const el = heroRef.current
    if (!el || !webgl) return
    const io = new IntersectionObserver(
      ([entry]) => setHeroActive(entry.isIntersecting),
      { threshold: 0.02 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [webgl])

  const productsReveal = useReveal<HTMLDivElement>()
  const aboutReveal = useReveal<HTMLDivElement>()
  const contactReveal = useReveal<HTMLDivElement>()

  return (
    <>
      <SmoothScroll />

      <header className="nav">
        <a className="brand" href="/">
          <img src="/logo.jpg" alt="Akshay Polymers logo" className="brand-badge" />
          <span className="brand-name">
            AKSHAY <em>POLYMERS</em>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <AnchorLink href="#products">Products</AnchorLink>
          <AnchorLink href="#about">About</AnchorLink>
          <AnchorLink href="#contact">Contact</AnchorLink>
        </nav>
        <a className="btn btn-small" href={`tel:${PHONE_MAIN}`}>
          Get a quote
        </a>
      </header>

      <main>
        <section className="hero" ref={heroRef} aria-label="Akshay Polymers">
          {webgl && (
            <div className="hero-canvas" aria-hidden="true">
              <Experience
                count={count}
                dof={desktop}
                active={heroActive}
                onReady={() => setReady(true)}
              />
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
              2014. Polycarbonate, ABS and PBT compounds, delivered across
              India.
            </p>
            <AnchorLink href="#products" className="btn btn-accent">
              Explore products
            </AnchorLink>
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
              Specialised plastic granules backed by an expansive selection and
              a deep, ready inventory.
            </p>
          </div>
          <div className="product-grid">
            {PRODUCTS.map((p) => (
              <article className="product-card" key={p.name}>
                <div className="product-media">
                  <img src={p.image} alt={p.alt} loading="lazy" width={640} height={480} />
                </div>
                <div className="product-body">
                  <h3>{p.name}</h3>
                  <p>{p.body}</p>
                  <p className="product-uses">{p.uses}</p>
                </div>
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
                Akshay Polymers was founded in 2014 in Odhav, Ahmedabad, out of
                a pure passion for people. Since then the team has become
                skilled at manufacturing specialised plastic granules for
                industries across India.
              </p>
              <p>
                Every batch reflects the same promise: unwavering quality,
                dependable performance and customer care that goes the extra
                mile.
              </p>
              <ul className="about-points">
                <li>Consistent, tested granule quality</li>
                <li>Wide selection with ready inventory</li>
                <li>Dispatch to every corner of India</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="contact-grid reveal" ref={contactReveal}>
            <div className="contact-intro">
              <h2>Talk to us.</h2>
              <p>
                Tell us what you are moulding and we will match the right
                granule, colour and grade.
              </p>
              <a className="btn btn-accent" href={`tel:${PHONE_MAIN}`}>
                Get a quote
              </a>
            </div>
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
              <div className="contact-block contact-block-wide">
                <h3>Works</h3>
                <p>{ADDRESS}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <a className="brand" href="/">
            <img src="/logo.jpg" alt="" className="brand-badge" />
            <span className="brand-name">
              AKSHAY <em>POLYMERS</em>
            </span>
          </a>
          <nav className="footer-links" aria-label="Footer">
            <AnchorLink href="#products">Products</AnchorLink>
            <AnchorLink href="#about">About</AnchorLink>
            <AnchorLink href="#contact">Contact</AnchorLink>
          </nav>
          <span className="footer-copy">© 2026 Akshay Polymers, Ahmedabad</span>
        </div>
      </footer>
    </>
  )
}
