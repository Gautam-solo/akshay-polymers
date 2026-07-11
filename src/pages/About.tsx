import { Link } from 'react-router-dom'
import { PHONE_MAIN, STATS } from '../lib/content'
import { useReveal } from '../dom/useReveal'

const VALUES = [
  {
    name: 'Quality first',
    body: 'A dedicated team of experts checks every batch, so each product that leaves Odhav holds the same standard.',
  },
  {
    name: 'Customer satisfaction',
    body: 'We aim to deliver reliable products that exceed expectations, and it has earned us a loyal customer base.',
  },
  {
    name: 'Innovation',
    body: 'A strong focus on better processes and materials keeps our granules improving year after year.',
  },
]

export function About() {
  const valuesReveal = useReveal<HTMLDivElement>()
  const storyReveal = useReveal<HTMLDivElement>()

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-copy">
            <h1>
              A trusted name in
              <br />
              the polymer industry.
            </h1>
            <p>
              Quality is our motto. Since 2014 we have manufactured
              specialised plastic granules in Odhav, Ahmedabad, with a strong
              focus on innovation and customer satisfaction.
            </p>
            <a className="btn btn-accent" href={`tel:${PHONE_MAIN}`}>
              Get a quote
            </a>
          </div>
          <div className="page-hero-media">
            <img
              src="/facility.jpg"
              alt="Warehouse with stacked granule bags and processing equipment"
              width={900}
              height={600}
            />
          </div>
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

      <section className="section">
        <div className="section-head reveal" ref={valuesReveal}>
          <h2>What we stand for</h2>
        </div>
        <div className="variant-grid">
          {VALUES.map((v) => (
            <article className="variant-card" key={v.name}>
              <h3>{v.name}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-contact">
        <div className="about-grid reveal" ref={storyReveal}>
          <div className="about-body">
            <h2>The symbol of quality.</h2>
            <p>
              Akshay Polymers was founded out of a pure passion for people.
              Today we offer a wide range of polymer solutions tailored to
              various industrial needs: polycarbonate, ABS and PBT granules in
              an expansive selection, held in ready inventory and dispatched
              across India.
            </p>
            <Link to="/#products" className="text-link">
              See our granules
            </Link>
          </div>
          <div className="about-media about-media-badge">
            <img src="/logo.jpg" alt="Akshay Polymers quality badge" width={320} height={320} />
          </div>
        </div>
      </section>
    </main>
  )
}
