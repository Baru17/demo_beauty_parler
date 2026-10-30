/**
 * AURELLE — Unisex Hair & Beauty Studio
 * ------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for all business content.
 *
 * This is a fictional demonstration brand. Every business detail that
 * has not been supplied by a real salon is intentionally left blank
 * and rendered as a neutral "to be updated" state.
 *
 * To customise this template for another salon:
 *   1. Replace the brand + contact details below.
 *   2. Swap the images in /public/images (keep the same file names or
 *      update the `images` map).
 *   3. Edit services, gallery, values and testimonials.
 *   4. Set `booking.demoMode` to false and connect an endpoint,
 *      WhatsApp number or email in `booking` (see README).
 *
 * Never add unverified phone numbers, addresses, awards, ratings or
 * reviews to this file for a live business.
 */

const images = {
  hero: {
    src: '/images/hero.webp',
    small: '/images/hero-sm.webp',
    smallWidth: 720,
    width: 1500,
    height: 1875,
    alt: 'Beauty portrait of a woman with flowing, healthy hair in soft studio light.',
  },
  heroInset: {
    src: '/images/hero-inset.webp',
    small: '/images/hero-inset-sm.webp',
    smallWidth: 340,
    width: 700,
    height: 875,
    alt: 'Reception counter with fresh flowers in a warm, contemporary beauty studio.',
  },
  about: {
    src: '/images/about.webp',
    small: '/images/about-sm.webp',
    smallWidth: 560,
    width: 1100,
    height: 1375,
    alt: 'Warm salon interior with mirrors, a chandelier and elegant styling furniture.',
  },
  aboutDetail: {
    src: '/images/about-detail.webp',
    small: '/images/about-detail-sm.webp',
    smallWidth: 360,
    width: 720,
    height: 720,
    alt: 'Close-up of a caramel leather styling chair with brass detailing.',
  },
  serviceHair: {
    src: '/images/service-hair.webp',
    small: '/images/service-hair-sm.webp',
    smallWidth: 460,
    width: 900,
    height: 1125,
    alt: 'Stylist curling long hair into soft, glossy waves in a salon.',
  },
  serviceSkin: {
    src: '/images/service-skin.webp',
    small: '/images/service-skin-sm.webp',
    smallWidth: 460,
    width: 900,
    height: 1125,
    alt: 'Woman relaxing during a soothing facial treatment at a modern spa.',
  },
  serviceBridal: {
    src: '/images/service-bridal.webp',
    small: '/images/service-bridal-sm.webp',
    smallWidth: 460,
    width: 900,
    height: 1125,
    alt: 'Bride having her makeup applied in a salon before a wedding.',
  },
  serviceGrooming: {
    src: '/images/service-grooming.webp',
    small: '/images/service-grooming-sm.webp',
    smallWidth: 460,
    width: 900,
    height: 1125,
    alt: 'Barber trimming a client’s beard with scissors in a stylish studio.',
  },
  featuredMain: {
    src: '/images/featured-main.webp',
    small: '/images/featured-main-sm.webp',
    smallWidth: 560,
    width: 1100,
    height: 1375,
    alt: 'Hairstylist creating an elegant bridal updo from behind.',
  },
  featuredHair: {
    src: '/images/featured-hair.webp',
    small: '/images/featured-hair-sm.webp',
    smallWidth: 480,
    width: 950,
    height: 1188,
    alt: 'Close-up of a curling iron shaping a client’s hair.',
  },
  featuredSkin: {
    src: '/images/featured-skin.webp',
    small: '/images/featured-skin-sm.webp',
    smallWidth: 480,
    width: 950,
    height: 1188,
    alt: 'Close-up of a hydrating facial mask being applied.',
  },
  featuredMakeup: {
    src: '/images/featured-makeup.webp',
    small: '/images/featured-makeup-sm.webp',
    smallWidth: 480,
    width: 950,
    height: 1188,
    alt: 'Makeup artist applying lipstick to a model in soft light.',
  },
  modal: {
    src: '/images/modal.webp',
    small: '/images/modal-sm.webp',
    smallWidth: 420,
    width: 820,
    height: 1025,
    alt: 'Moody, elegant salon interior with warm ambient lighting.',
  },
  galleryHaircut1: {
    src: '/images/gallery-haircut-1.webp',
    small: '/images/gallery-haircut-1-sm.webp',
    smallWidth: 520,
    width: 1000,
    height: 750,
    alt: 'Back view of a woman with freshly sectioned brown hair in a salon chair.',
  },
  galleryHaircut2: {
    src: '/images/gallery-haircut-2.webp',
    small: '/images/gallery-haircut-2-sm.webp',
    smallWidth: 380,
    width: 760,
    height: 1013,
    alt: 'Close-up of a hairstylist cutting a client’s hair with precision scissors.',
  },
  galleryColour1: {
    src: '/images/gallery-colour-1.webp',
    small: '/images/gallery-colour-1-sm.webp',
    smallWidth: 520,
    width: 1000,
    height: 750,
    alt: 'Gloved hands applying hair colour to a client’s hair with a brush.',
  },
  galleryColour2: {
    src: '/images/gallery-colour-2.webp',
    small: '/images/gallery-colour-2-sm.webp',
    smallWidth: 380,
    width: 760,
    height: 1013,
    alt: 'Client and stylist comparing hair colour swatches during a consultation.',
  },
  galleryHairstyle1: {
    src: '/images/gallery-hairstyle-1.webp',
    small: '/images/gallery-hairstyle-1-sm.webp',
    smallWidth: 380,
    width: 760,
    height: 1013,
    alt: 'Elegant braided hairstyle seen from behind in a salon mirror.',
  },
  galleryHairstyle2: {
    src: '/images/gallery-hairstyle-2.webp',
    small: '/images/gallery-hairstyle-2-sm.webp',
    smallWidth: 520,
    width: 1000,
    height: 750,
    alt: 'Bridal hairstyle detailed with fresh flowers and delicate jewellery.',
  },
  galleryMakeup1: {
    src: '/images/gallery-makeup-1.webp',
    small: '/images/gallery-makeup-1-sm.webp',
    smallWidth: 520,
    width: 1000,
    height: 750,
    alt: 'Close-up of warm eyeshadow being applied with a makeup brush.',
  },
  galleryMakeup2: {
    src: '/images/gallery-makeup-2.webp',
    small: '/images/gallery-makeup-2-sm.webp',
    smallWidth: 380,
    width: 760,
    height: 1013,
    alt: 'South Indian bride in traditional attire and intricate jewellery.',
  },
  galleryTreatment: {
    src: '/images/gallery-treatment.webp',
    small: '/images/gallery-treatment-sm.webp',
    smallWidth: 380,
    width: 760,
    height: 1013,
    alt: 'Client enjoying a relaxing hair wash at a salon basin.',
  },
  galleryInterior1: {
    src: '/images/gallery-interior-1.webp',
    small: '/images/gallery-interior-1-sm.webp',
    smallWidth: 520,
    width: 1000,
    height: 750,
    alt: 'Bright salon with backwash chairs, mirrors and styling products.',
  },
  galleryInterior2: {
    src: '/images/gallery-interior-2.webp',
    small: '/images/gallery-interior-2-sm.webp',
    smallWidth: 380,
    width: 760,
    height: 1013,
    alt: 'Neatly arranged barber tray with scissors, combs and trimmers.',
  },
  og: {
    src: '/images/og.webp',
    small: '/images/og.webp',
    smallWidth: 1200,
    width: 1200,
    height: 630,
    alt: 'AURELLE — Unisex Hair & Beauty Studio.',
  },
}

const services = [
  {
    id: 'hair',
    index: '01',
    name: 'Hair',
    summary:
      'Precision cuts, luminous colour and restorative care — shaped around your hair, your routine and your sense of style.',
    image: images.serviceHair,
    items: [
      {
        name: 'Haircut & Styling',
        description: 'A consultation-led cut and finish designed for your hair texture and everyday routine.',
        samplePrice: 799,
      },
      {
        name: 'Hair Wash',
        description: 'A gentle cleanse and conditioning ritual with a relaxing scalp massage.',
        samplePrice: 399,
      },
      {
        name: 'Hair Spa',
        description: 'Deep conditioning and a soothing scalp treatment for softer, more manageable hair.',
        samplePrice: 1299,
      },
      {
        name: 'Hair Colouring',
        description: 'Dimensional colour, root touch-ups and gloss finishes, tailored to your tone.',
        samplePrice: 2499,
      },
      {
        name: 'Hair Smoothening',
        description: 'A polished, frizz-free finish with aftercare guidance to protect your hair.',
        samplePrice: 4999,
      },
      {
        name: 'Hair Treatments',
        description: 'Targeted repair for dryness, damage and scalp concerns, advised after a consultation.',
        samplePrice: 1799,
      },
    ],
  },
  {
    id: 'skin',
    index: '02',
    name: 'Skin & Beauty',
    summary:
      'Unhurried skin rituals that cleanse, refresh and restore — with advice that respects your skin, not a trend.',
    image: images.serviceSkin,
    items: [
      {
        name: 'Facial Treatments',
        description: 'A tailored facial to hydrate, brighten or calm, selected after a skin consultation.',
        samplePrice: 1499,
      },
      {
        name: 'Skin Care',
        description: 'Focused care for texture, tone and hydration, with a simple at-home routine.',
        samplePrice: 1199,
      },
      {
        name: 'Cleanup',
        description: 'A gentle reset to refresh tired skin and leave it feeling clean and comfortable.',
        samplePrice: 899,
      },
      {
        name: 'Detan',
        description: 'A brightening treatment to help reduce the look of sun-induced tanning.',
        samplePrice: 999,
      },
    ],
  },
  {
    id: 'bridal',
    index: '03',
    name: 'Bridal & Makeup',
    summary:
      'Occasion looks with a light hand and a lasting finish — designed to feel like you, only more luminous.',
    image: images.serviceBridal,
    items: [
      {
        name: 'Bridal Makeup',
        description: 'A complete bridal look, planned in advance and finished to last through the celebration.',
        samplePrice: 9999,
      },
      {
        name: 'Party Makeup',
        description: 'A polished, camera-ready look for an evening out or a special celebration.',
        samplePrice: 2999,
      },
      {
        name: 'Engagement Makeup',
        description: 'Soft, luminous occasion makeup with a focus on your best features.',
        samplePrice: 4999,
      },
      {
        name: 'Hairstyling',
        description: 'A considered updo, wave or sleek finish to complement your occasion look.',
        samplePrice: 1999,
      },
    ],
  },
  {
    id: 'grooming',
    index: '04',
    name: 'Grooming',
    summary:
      'Sharp, considered grooming in the same calm setting — because great style has no gender.',
    image: images.serviceGrooming,
    items: [
      {
        name: 'Beard Styling',
        description: 'Beard shaping, line work and a clean finish, guided by your face shape.',
        samplePrice: 399,
      },
      {
        name: 'Hair Grooming',
        description: 'A precise cut and styling routine that works with your hair, not against it.',
        samplePrice: 599,
      },
      {
        name: "Men's Haircut",
        description: 'A tailored cut with clean detailing, from classic to contemporary.',
        samplePrice: 499,
      },
      {
        name: 'Unisex Grooming',
        description: 'A flexible grooming appointment for anyone who wants a fresh, considered finish.',
        samplePrice: 699,
      },
    ],
  },
]

const experiences = [
  {
    id: 'signature-hair',
    index: '01',
    title: 'Signature Hair Styling',
    description:
      'A consultation-led cut, colour or finish shaped around your hair, your routine and the way you want to feel.',
    image: images.featuredHair,
    category: 'Hair',
  },
  {
    id: 'refreshing-skin',
    index: '02',
    title: 'Refreshing Skin Care',
    description:
      'A reset for tired skin — cleansing, gentle exfoliation and hydration, tailored after a skin consultation.',
    image: images.featuredSkin,
    category: 'Skin & Beauty',
  },
  {
    id: 'occasion-makeup',
    index: '03',
    title: 'Special Occasion Makeup',
    description:
      'Bridal, engagement or party looks built to last, with a finish that still feels unmistakably like you.',
    image: images.featuredMakeup,
    category: 'Bridal & Makeup',
  },
]

const galleryItems = [
  {
    id: 'g-haircut-1',
    title: 'Considered Cuts',
    category: 'Haircuts',
    image: images.galleryHaircut1,
  },
  {
    id: 'g-haircut-2',
    title: 'Precision Detail',
    category: 'Haircuts',
    image: images.galleryHaircut2,
  },
  {
    id: 'g-colour-1',
    title: 'Colour in Progress',
    category: 'Hair Colour',
    image: images.galleryColour1,
  },
  {
    id: 'g-colour-2',
    title: 'A Tonal Consultation',
    category: 'Hair Colour',
    image: images.galleryColour2,
  },
  {
    id: 'g-hairstyle-1',
    title: 'Braided Elegance',
    category: 'Hairstyles',
    image: images.galleryHairstyle1,
  },
  {
    id: 'g-hairstyle-2',
    title: 'Floral Bridal Finish',
    category: 'Hairstyles',
    image: images.galleryHairstyle2,
  },
  {
    id: 'g-makeup-1',
    title: 'The Finishing Touch',
    category: 'Makeup',
    image: images.galleryMakeup1,
  },
  {
    id: 'g-makeup-2',
    title: 'A South Indian Bride',
    category: 'Makeup',
    image: images.galleryMakeup2,
  },
  {
    id: 'g-treatment-1',
    title: 'The Hair Wash Ritual',
    category: 'Beauty Treatments',
    image: images.galleryTreatment,
  },
  {
    id: 'g-interior-1',
    title: 'The Washing Lounge',
    category: 'Salon Interiors',
    image: images.galleryInterior1,
  },
  {
    id: 'g-interior-2',
    title: 'Tools of the Trade',
    category: 'Salon Interiors',
    image: images.galleryInterior2,
  },
]

const values = [
  {
    index: '01',
    icon: 'Sparkles',
    title: 'Personalised styling',
    description: 'Every appointment begins with a conversation, not an assumption.',
  },
  {
    index: '02',
    icon: 'Users',
    title: 'Unisex by design',
    description: 'One inclusive studio for hair, skin, bridal and grooming.',
  },
  {
    index: '03',
    icon: 'Gem',
    title: 'Attention to detail',
    description: 'The finish, the comfort and the small touches all matter.',
  },
  {
    index: '04',
    icon: 'Palette',
    title: 'Modern beauty options',
    description: 'Contemporary techniques and considered, current looks.',
  },
  {
    index: '05',
    icon: 'Armchair',
    title: 'A comfortable atmosphere',
    description: 'Calm, uncluttered and designed for you to exhale.',
  },
  {
    index: '06',
    icon: 'HeartHandshake',
    title: 'A customer-focused approach',
    description: 'Clear guidance, honest advice and your preferences first.',
  },
]

const testimonials = [
  {
    quote: 'The kind of calm, considered space where you leave feeling more yourself.',
    service: 'Hair',
    name: 'Sample review',
  },
  {
    quote: 'A haircut that finally felt like it was designed for me.',
    service: 'Haircut & Styling',
    name: 'Sample review',
  },
  {
    quote: 'Thoughtful from the first consultation to the final finish.',
    service: 'Bridal & Makeup',
    name: 'Sample review',
  },
]

export const businessConfig = {
  // -----------------------------------------------------------------
  // Brand identity
  // -----------------------------------------------------------------
  name: 'AURELLE',
  wordmark: 'AURELLE',
  subtitle: 'Unisex Hair & Beauty Studio',
  tagline: 'Beauty Beyond Ordinary.',
  shortDescription:
    'A considered unisex studio for hair, skin, bridal and grooming — where every visit begins with a conversation.',
  announcement: 'Welcome to AURELLE — Beauty Beyond Ordinary.',

  // -----------------------------------------------------------------
  // Location & contact — intentionally unverified in this demo
  // -----------------------------------------------------------------
  location: {
    city: 'Ramanathapuram',
    region: 'Tamil Nadu',
    country: 'India',
    display: 'Ramanathapuram, Tamil Nadu',
  },
  contact: {
    // Add verified details here to activate the contact UI.
    phone: '',
    phoneDisplay: '',
    email: '',
    address: '',
    instagram: '',
    whatsapp: '',
    mapsUrl: '',
    mapsEmbedUrl: '',
  },
  hours: [], // e.g. [{ days: 'Monday – Saturday', time: '10:00 – 20:00' }]
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },

  // -----------------------------------------------------------------
  // Pricing — sample values are never displayed until switched on
  // -----------------------------------------------------------------
  pricing: {
    showPrices: false,
    currency: 'INR',
    note: 'Pricing is confirmed during your consultation. Current rates are available on request.',
    onRequestLabel: 'On request',
  },

  // -----------------------------------------------------------------
  // Bookings — demo mode by default
  // -----------------------------------------------------------------
  booking: {
    enabled: true,
    demoMode: true,
    eyebrow: 'Appointments',
    title: 'Request an Appointment',
    intro:
      'Share a few details and the studio can follow up to confirm your preferred time. This demonstration does not send or book anything.',
    modeLabel: 'Demo enquiry',
    // Set to a real endpoint to POST JSON. Leave blank for front-end demo.
    endpoint: '',
    // Add a verified WhatsApp number (digits only, including country code) to
    // enable a "Send via WhatsApp" action on the success screen.
    whatsappNumber: '',
    email: '',
    timeSlots: [
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ],
    disclaimer: 'Demo mode — your enquiry is not transmitted or booked.',
  },

  // -----------------------------------------------------------------
  // Navigation
  // -----------------------------------------------------------------
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],

  // -----------------------------------------------------------------
  // Content
  // -----------------------------------------------------------------
  images,
  services,
  experiences,
  galleryCategories: ['All', 'Haircuts', 'Hair Colour', 'Hairstyles', 'Makeup', 'Beauty Treatments', 'Salon Interiors'],
  gallery: {
    isDemo: true,
    note: 'Demonstration gallery — licensed stock photography for layout preview only. These images are not client work. Replace them with the studio’s own photography before launch.',
    items: galleryItems,
  },
  values,
  valuesNote:
    'Proposed brand messaging for this template. Final wording should be confirmed with the studio.',
  testimonials: {
    enabled: true,
    isDemo: true,
    note:
      'This section is a layout preview. No customer reviews or ratings are shown because none have been supplied. Replace these placeholders with verified reviews before launch.',
    items: testimonials,
  },

  // -----------------------------------------------------------------
  // Images used for social sharing (replace domain before launch)
  // -----------------------------------------------------------------
  seo: {
    title: 'AURELLE | Unisex Hair & Beauty Studio',
    description:
      'AURELLE is a fictional unisex hair and beauty studio demo in Ramanathapuram, Tamil Nadu. Explore hair, skin, bridal and grooming services.',
    ogImage: '/images/og.webp',
  },
}

export const isConfigured = (value) => typeof value === 'string' && value.trim().length > 0

export default businessConfig
