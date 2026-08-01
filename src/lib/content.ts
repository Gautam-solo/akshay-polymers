// All site content in one place, sourced from akshaypolymers.in.

export const PHONE_MAIN = '+919725829280'
export const PHONE_LABEL = '+91 97258 29280'

export const PHONES = [
  { label: '+91 97258 29280', tel: '+919725829280' },
  { label: '+91 97000 00701', tel: '+919700000701' },
  { label: '+91 83280 93342', tel: '+918328093342' },
]

export const EMAILS = ['jainjainjain701@gmail.com', 'akshaypolymer014@gmail.com']

export const ADDRESS =
  'No-81, Tirupati Aakruti Industrial Estate, Opp. Abhishree Estate, Odhav Ring Road, Odhav, Ahmedabad - 382415, Gujarat, India'

/** True on iPhone, iPad and iPod, including iPadOS which reports as a Mac. */
function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPhone|iPod|iPad/.test(ua)) return true
  // iPadOS 13+ in Safari sends a desktop Mac user agent; the touch points
  // give it away, since no real Mac reports more than one.
  return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1
}

/**
 * Deep link to the works. iOS opens Apple Maps, which is the built-in app
 * there. Every other device (including Mac, Windows and Android) goes to
 * Google Maps, which opens the app when installed and the website otherwise.
 */
export function mapsUrl(): string {
  const query = encodeURIComponent(`Akshay Polymers, ${ADDRESS}`)
  return isIOS()
    ? `https://maps.apple.com/?q=${query}`
    : `https://www.google.com/maps/search/?api=1&query=${query}`
}

export const HOURS = [
  { days: 'Monday to Saturday', time: '9:00 am to 7:00 pm' },
  { days: 'Sunday', time: 'Closed' },
]

export const STATS = [
  { value: '200+', label: 'Happy customers' },
  { value: '12+', label: 'Years experience' },
  { value: 'All India', label: 'Delivery coverage' },
]

export interface ProductVariant {
  name: string
  body: string
  images: string[]
  alt: string
}

export interface ColorCard {
  name: string
  images: string[]
  alt: string
}

export interface Product {
  slug: string
  name: string
  short: string
  images: string[]
  alt: string
  lede: string
  variants: ProductVariant[]
  applications: string[]
  colors: string[]
  colorCards?: ColorCard[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'polycarbonate-granules',
    name: 'Polycarbonate Granules',
    short:
      'Made on the latest technology for superior quality, strength and excellent heat resistance.',
    images: ['/p-pc-1.jpg', '/p-pc-2.jpg'],
    alt: 'White polycarbonate granules spilling from a clear container',
    lede:
      'Manufactured on modern technology, our polycarbonate granules combine superior strength with excellent heat resistance. They join cleanly by mechanical, solvent and welding methods, making them a dependable base for electrical accessories and engineering products.',
    variants: [
      {
        name: 'PC Super Natural',
        body: 'High-strength transparent granules with outstanding stiffness, impact resistant even at low temperatures. Chosen for sheet production, electrical locks, bullet-resistant glazing and headlights.',
        images: ['/g-pc-natural-1.jpg', '/g-pc-natural-2.jpg'],
        alt: 'Clear transparent polycarbonate granules in a heap',
      },
      {
        name: 'PC Super Black',
        body: 'Premium finishing with a deep shine, built for lighting systems and injection molding. Holds up against moisture damage over its lifetime.',
        images: ['/g-pc-black-1.jpg', '/g-pc-black-2.jpg'],
        alt: 'Glossy black polycarbonate granules with glass beakers',
      },
      {
        name: 'PC LED',
        body: 'A specialised formulation engineered for LED light manufacturing, tuned to carry light evenly through the moulded body.',
        images: ['/g-pc-led-1.jpg', '/g-pc-led-2.jpg'],
        alt: 'Milky white diffuser-grade polycarbonate granules pouring out',
      },
    ],
    applications: [
      'Electrical accessories',
      'Engineering products',
      'Sheet production',
      'Automotive headlights',
      'LED lighting',
    ],
    colors: ['Natural (transparent)', 'Black'],
  },
  {
    slug: 'abs-granules',
    name: 'ABS Granules',
    short:
      'Outstanding mechanical and high-impact strength that moulds cleanly into rigid shapes.',
    images: ['/p-abs-1.jpg', '/p-abs-2.jpg', '/p-abs-3.jpg'],
    alt: 'White ABS granules being dosed under a moulding machine nozzle',
    lede:
      'Acrylonitrile Butadiene Styrene is one of the most widely used engineering granules. Ours is manufactured in multiple grades and colours with quality controlled across every parameter, giving tough products outstanding mechanical and impact strength.',
    variants: [
      {
        name: 'ABS Milky White',
        body: 'A clean base for moulded components and high-temperature applications, popular across electrical fittings and toy manufacturing.',
        images: ['/g-abs-milky-1.jpg', '/g-abs-milky-2.jpg'],
        alt: 'Milky white ABS granules spilling from test tubes',
      },
      {
        name: 'ABS Black',
        body: 'The workhorse grade behind computer keyboard parts, toy building bricks, wall-socket face guards and protective housings for power tools.',
        images: ['/g-abs-black-1.jpg', '/g-abs-black-2.jpg'],
        alt: 'Black ABS granules with glass beakers',
      },
      {
        name: 'ABS Super Black',
        body: 'The premium grade: great shine with full strength and outstanding impact resistance, suited to large plastic components.',
        images: ['/g-abs-superblack-1.jpg', '/g-abs-superblack-2.jpg'],
        alt: 'High-shine super black ABS granules',
      },
      {
        name: 'ABS Red',
        body: 'A ready coloured variant for products that need consistent red right out of the bag.',
        images: ['/g-abs-red-1.jpg', '/g-abs-red-2.jpg'],
        alt: 'Bright red ABS granules spilling from a test tube',
      },
    ],
    applications: [
      'Toy manufacturing',
      'Electrical components',
      'Computer peripherals',
      'Protective housings',
      'Consumer electronics',
    ],
    colors: ['Milky white', 'Black', 'Super black', 'Red'],
  },
  {
    slug: 'pbt-granules',
    name: 'PBT Granules',
    short:
      'Good electrical resistance with fast crystallisation. FR, non-FR and glass-filled ranges in a wide choice of colours.',
    images: ['/p-pbt-1.jpg', '/p-pbt-2.jpg'],
    alt: 'Beakers filled with PBT granules in white, green, black, blue and yellow',
    lede:
      'Polybutylene Terephthalate offers very good electrical resistance thanks to its fast crystallisation. Processed by skilled professionals, it is offered in multiple ranges and colours to match customer requirements, at pricing that stays competitive with the market.',
    variants: [
      {
        name: 'FR range',
        body: 'Fire-retardant PBT, including a 30% glass-filled option, for components that must meet flammability requirements.',
        images: ['/g-pbt-fr-1.jpg', '/g-pbt-fr-2.jpg'],
        alt: 'Fire-retardant PBT granules in a range of colours',
      },
      {
        name: 'Non-FR range',
        body: 'Standard PBT for general electrical and mechanical parts where fire rating is not required.',
        images: ['/g-pbt-nonfr-1.jpg', '/g-pbt-nonfr-2.jpg'],
        alt: 'White PBT granules pouring from a container',
      },
      {
        name: 'Glass-filled range',
        body: 'Reinforced with glass fibre for higher stiffness and dimensional stability in demanding components.',
        images: ['/g-pbt-gf-1.jpg', '/g-pbt-gf-2.jpg'],
        alt: 'Glass-filled PBT granules pouring from a jar',
      },
    ],
    applications: [
      'Automotive accessories',
      'Motor covers',
      'TV set accessories',
      'Plugs and switches',
      'Holder parts',
    ],
    colors: ['Orange', 'Red', 'Black', 'White'],
    colorCards: [
      {
        name: 'Orange',
        images: ['/v-pbt-orange.jpg'],
        alt: 'Orange PBT granules',
      },
      {
        name: 'Red',
        images: ['/v-pbt-red.jpg', '/v-abs-red.jpg'],
        alt: 'Red PBT granules',
      },
      {
        name: 'Black',
        images: ['/v-black-jar.jpg', '/v-abs-superblack.jpg'],
        alt: 'Black PBT granules',
      },
      {
        name: 'White',
        images: ['/v-pbt-white.jpg', '/pc-2.jpg'],
        alt: 'White PBT granules',
      },
    ],
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}
