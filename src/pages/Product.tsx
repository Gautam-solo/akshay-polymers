import { Link, Navigate, useLocation } from 'react-router-dom'
import { ImageCycler } from '../components/ImageCycler'
import { Picture } from '../components/Picture'
import { PHONE_MAIN, PRODUCTS, getProduct } from '../lib/content'
import { useMeta } from '../dom/useMeta'

export function ProductPage() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\//, '')
  const product = getProduct(slug)

  useMeta(`/${slug}` as Parameters<typeof useMeta>[0])

  if (!product) return <Navigate to="/" replace />

  const others = PRODUCTS.filter((p) => p.slug !== product.slug)

  return (
    <main key={product.slug}>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/#products">Products</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
            <h1>{product.name}</h1>
            <p>{product.lede}</p>
            <a className="btn btn-accent" href={`tel:${PHONE_MAIN}`}>
              Get a quote
            </a>
          </div>
          <div className="page-hero-media">
            <ImageCycler images={product.images} alt={product.alt} width={800} height={600} eager />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Grades we make</h2>
        </div>
        <div className="variant-grid">
          {product.variants.map((v) => (
            <article className="variant-card" key={v.name}>
              <div className="variant-media">
                <ImageCycler images={v.images} alt={v.alt} width={640} height={400} />
              </div>
              <div className="variant-body">
                <h3>{v.name}</h3>
                <p>{v.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="detail-grid">
          <div className="detail-block">
            <h2>Where it goes</h2>
            <ul className="about-points">
              {product.applications.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="detail-block">
            <h2>Colours available</h2>
            {product.colorCards ? (
              <div className="color-grid">
                {product.colorCards.map((c) => (
                  <figure className="color-card" key={c.name}>
                    <div className="color-media">
                      <ImageCycler images={c.images} alt={c.alt} width={400} height={300} />
                    </div>
                    <figcaption>{c.name}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <ul className="chip-row">
                {product.colors.map((c) => (
                  <li className="chip" key={c}>
                    {c}
                  </li>
                ))}
              </ul>
            )}
            <p className="detail-note">
              Need a different shade or grade? We match granules to customer
              requirements. Call us with your specification.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-contact">
        <div className="also-see">
          <h2>Also see</h2>
          <div className="also-grid">
            {others.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} className="also-card">
                <Picture src={p.images[0]} alt="" loading="lazy" width={320} height={240} />
                <span>{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
