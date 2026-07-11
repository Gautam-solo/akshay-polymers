// All site content in one place, sourced from akshaypolymers.in.

export const PHONE_MAIN = '+919725829280'

export const PHONES = [
  { label: '+91 97258 29280', tel: '+919725829280' },
  { label: '+91 97000 00701', tel: '+919700000701' },
  { label: '+91 83280 93342', tel: '+918328093342' },
]

export const EMAILS = ['jainjainjain701@gmail.com', 'akshaypolymer014@gmail.com']

export const ADDRESS =
  'No-81, Tirupati Aakruti Industrial Estate, Opp. Abhishree Estate, Odhav Ring Road, Odhav, Ahmedabad - 382415, Gujarat, India'

export const HOURS = [
  { days: 'Monday to Saturday', time: '9:00 am to 7:00 pm' },
  { days: 'Sunday', time: 'Closed' },
]

export const STATS = [
  { value: '200+', label: 'Happy customers' },
  { value: '12+', label: 'Years experience' },
  { value: 'All India', label: 'Delivery' },
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
    images: ['/pc-1.jpg', '/pc-2.jpg', '/pc-3.jpg'],
    alt: 'Grey polycarbonate granules spilling from glass test tubes',
    lede:
      'Manufactured on modern technology, our polycarbonate granules combine superior strength with excellent heat resistance. They join cleanly by mechanical, solvent and welding methods, making them a dependable base for electrical accessories and engineering products.',
    variants: [
      {
        name: 'PC Super Natural',
        body: 'High-strength transparent granules with outstanding stiffness, impact resistant even at low temperatures. Chosen for sheet production, electrical locks, bullet-resistant glazing and headlights.',
        images: ['/v-pc-natural.jpg', '/pc-1.jpg'],
        alt: 'Transparent polycarbonate granules in a heap',
      },
      {
        name: 'PC Super Black',
        body: 'Premium finishing with a deep shine, built for lighting systems and injection molding. Holds up against moisture damage over its lifetime.',
        images: ['/v-pc-black.jpg', '/pc-3.jpg'],
        alt: 'Glossy black polycarbonate granules',
      },
      {
        name: 'PC LED',
        body: 'A specialised formulation engineered for LED light manufacturing, tuned to carry light evenly through the moulded body.',
        images: ['/v-pc-led.jpg', '/pc-2.jpg'],
        alt: 'Milky white diffuser-grade polycarbonate granules',
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
    images: ['/abs-1.jpg', '/abs-2.jpg', '/abs-3.jpg'],
    alt: 'ABS granules in many colors with matching color swatch tags',
    lede:
      'Acrylonitrile Butadiene Styrene is one of the most widely used engineering granules. Ours is manufactured in multiple grades and colours with quality controlled across every parameter, giving tough products outstanding mechanical and impact strength.',
    variants: [
      {
        name: 'ABS Milky White',
        body: 'A clean base for moulded components and high-temperature applications, popular across electrical fittings and toy manufacturing.',
        images: ['/v-abs-milky.jpg', '/abs-3.jpg'],
        alt: 'Milky white ABS granules spilling from test tubes',
      },
      {
        name: 'ABS Black',
        body: 'The workhorse grade behind computer keyboard parts, toy building bricks, wall-socket face guards and protective housings for power tools.',
        images: ['/v-black-jar.jpg', '/v-pc-black.jpg'],
        alt: 'Black ABS granules pouring from a glass jar',
      },
      {
        name: 'ABS Super Black',
        body: 'The premium grade: great shine with full strength and outstanding impact resistance, suited to large plastic components.',
        images: ['/v-abs-superblack.jpg', '/pc-3.jpg'],
        alt: 'High-shine super black ABS granules with a test tube',
      },
      {
        name: 'ABS Red',
        body: 'A ready coloured variant for products that need consistent red right out of the bag.',
        images: ['/v-abs-red.jpg', '/v-pbt-red.jpg'],
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
    images: ['/pbt-1.jpg', '/pbt-2.jpg', '/pbt-3.jpg'],
    alt: 'Beakers filled with PBT granules in white, green, black, blue and yellow',
    lede:
      'Polybutylene Terephthalate offers very good electrical resistance thanks to its fast crystallisation. Processed by skilled professionals, it is offered in multiple ranges and colours to match customer requirements, at pricing that stays competitive with the market.',
    variants: [
      {
        name: 'FR range',
        body: 'Fire-retardant PBT, including a 30% glass-filled option, for components that must meet flammability requirements.',
        images: ['/v-pbt-orange.jpg', '/pbt-1.jpg'],
        alt: 'Orange fire-retardant PBT granules with a glass bottle',
      },
      {
        name: 'Non-FR range',
        body: 'Standard PBT for general electrical and mechanical parts where fire rating is not required.',
        images: ['/v-pbt-white.jpg', '/pbt-3.jpg'],
        alt: 'White PBT granules pouring from a measuring cup',
      },
      {
        name: 'Glass-filled range',
        body: 'Reinforced with glass fibre for higher stiffness and dimensional stability in demanding components.',
        images: ['/v-pbt-red.jpg', '/v-black-jar.jpg'],
        alt: 'Red glass-filled PBT granules around a jar',
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
