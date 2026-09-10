// Lightweight prerender script — returns page-specific meta content for each route.
// This avoids SSR issues with framer-motion, IntersectionObserver, and other
// browser-only APIs used in the full App component tree.
// Google's crawler only needs real HTML content + correct head tags to approve sitelinks.

const pageMeta: Record<string, { title: string; description: string; h1: string; body: string }> = {
  '/': {
    title: 'Mont Bleu Guesthouse | Boutique Accommodation Franschhoek',
    description: 'Mont Bleu is a boutique guesthouse on Le Sanctuaire Farm in Franschhoek. Five unique suites, mountain views, pool, sauna, and daily farm breakfasts.',
    h1: 'Mont Bleu Guesthouse',
    body: 'A boutique guesthouse on Le Sanctuaire Farm in Franschhoek. Five unique suites with mountain and valley views, a sparkling pool, riverside sauna, mountain hot tub, and daily continental breakfast. Book direct for the best rates.',
  },
  '/stay': {
    title: 'Boutique Rooms & Accommodation | Mont Bleu Guesthouse Franschhoek',
    description: 'Book one of five unique suites at Mont Bleu Guesthouse in Franschhoek — Mountain Suite, Olive Suite, Protea Suite, Oak Room and Fynbos Room.',
    h1: 'The Guest Home — Mont Bleu',
    body: 'Five unique suites set on Le Sanctuaire Farm in Franschhoek. Mountain Suite: private balcony, king bed, Simonsberg mountain views. Olive Suite: garden access, freestanding bath, olive grove views. Protea Suite: outdoor shower, panoramic mountain views, indoor fireplace. Oak Room: panoramic valley views, private balcony, light and airy. Fynbos Room: outdoor shower, glass reading space, valley views. All rooms include Nespresso, Smart TV, luxury linen, daily housekeeping. Shared facilities include swimming pool, mountain hot tub, sauna, plunge pool, yoga deck, mezzanine library, and honesty bar.',
  },
  '/explore': {
    title: 'Explore Franschhoek | Activities & Wine Country | Mont Bleu',
    description: 'Discover Franschhoek from Mont Bleu Guesthouse. Explore world-class wine estates, fine dining, the iconic Wine Tram, and activities on Le Sanctuaire Farm.',
    h1: 'Explore Franschhoek',
    body: 'Discover the best of Franschhoek from Mont Bleu. Visit world-class wine estates, enjoy fine dining, ride the iconic Franschhoek Wine Tram, hike through fynbos, and explore Le Sanctuaire Farm. The farm features pristine Cape Floral Kingdom fynbos, olive groves, honey production, and guided walks through the Wemmershoek mountains.',
  },
  '/dining': {
    title: 'Dining & Breakfast | Farm-to-Table Food | Mont Bleu Franschhoek',
    description: 'Enjoy a fresh continental breakfast at Mont Bleu including local sourdough, artisan cheeses, seasonal fruit and Nespresso coffee served daily.',
    h1: 'Dining at Mont Bleu',
    body: 'Start your day with a fresh continental breakfast served daily at Mont Bleu. Local sourdough bread, artisan cheeses, seasonal fruit, yogurt, fresh pastries and Nespresso coffee or tea. Enjoy breakfast on the main deck with sweeping views of the Franschhoek valley. Honesty bar with curated wines and refreshments available throughout the day.',
  },
  '/relax': {
    title: 'Relax & Wellness | Pool, Hot Tub & Sauna | Mont Bleu Franschhoek',
    description: 'Unwind at Mont Bleu with our mountain hot tub, outdoor pool, riverside sauna, plunge pool and yoga deck in the Franschhoek mountains.',
    h1: 'Relax at Mont Bleu',
    body: 'Wellness facilities at Mont Bleu: sparkling outdoor swimming pool with panoramic mountain views, gas-fired mountain hot tub overlooking the stream, private couples sauna on the riverbank with natural plunge pool, yoga and sunset deck, and meditation labyrinth. Perfect for rest, renewal and reconnection with nature.',
  },
  '/connect-experience': {
    title: 'The Connect Experience | Retreats & Immersive Stays | Mont Bleu',
    description: 'Curated retreats blending nature, silence, and guided discovery on Le Sanctuaire Farm in Franschhoek.',
    h1: 'The Connect Experience',
    body: 'The Mont Bleu Connect Experience offers curated retreats blending nature, silence, and guided discovery on Le Sanctuaire Farm in Franschhoek. Immersive experiences designed for rest, reflection and renewal in the Wemmershoek mountains.',
  },
  '/gallery': {
    title: 'Photo Gallery | Mont Bleu Guesthouse Franschhoek',
    description: 'Browse photos of Mont Bleu boutique guesthouse in Franschhoek — rooms, mountain views, the pool, sauna, dining deck and the Le Sanctuaire Farm estate.',
    h1: 'Gallery',
    body: 'Photos of Mont Bleu boutique guesthouse in Franschhoek. View our five unique suites, sparkling pool, riverside sauna, mountain hot tub, yoga deck, mezzanine library, and the stunning Le Sanctuaire Farm estate in the Wemmershoek mountains.',
  },
  '/contact': {
    title: 'Contact & Book | Mont Bleu Guesthouse Franschhoek',
    description: 'Contact Mont Bleu Guesthouse to book your stay in Franschhoek. Email bookings@montbleu.co.za. Located on Le Sanctuaire Farm.',
    h1: 'Contact & Book',
    body: 'Book your stay at Mont Bleu Guesthouse in Franschhoek. Email: bookings@montbleu.co.za. Located on Le Sanctuaire Farm, Franschhoek, Western Cape, South Africa. We welcome guests aged 12 years and older. Check availability and reserve your suite for a peaceful mountain retreat.',
  },
  '/book': {
    title: 'Book Now | Mont Bleu Guesthouse Franschhoek',
    description: 'Book your stay at Mont Bleu boutique guesthouse in Franschhoek. Check availability and reserve your suite directly online.',
    h1: 'Book Your Stay',
    body: 'Reserve your suite at Mont Bleu boutique guesthouse in Franschhoek. Choose from five unique rooms: Mountain Suite, Olive Suite, Protea Suite, Oak Room, and Fynbos Room. Book direct for the best rates. All stays include daily continental breakfast and access to shared facilities.',
  },
  '/faq': {
    title: 'Frequently Asked Questions | Mont Bleu Guesthouse Franschhoek',
    description: 'Answers to common questions about staying at Mont Bleu — check-in times, breakfast, pet policy, children, booking and cancellation.',
    h1: 'Frequently Asked Questions',
    body: 'Everything you need to know before your stay at Mont Bleu in Franschhoek. Check-in from 14:00, check-out by 11:00. Continental breakfast included daily. Guest age policy: 12 years and older for most rooms. Fynbos Room and Oak Room welcome infants under 2 years by prior arrangement. No pets. Free Wi-Fi throughout. Cancellation policy applies.',
  },
  '/booking-terms': {
    title: 'Booking Terms & Conditions | Mont Bleu Guesthouse',
    description: 'Booking terms and conditions for Mont Bleu Guesthouse in Franschhoek, including cancellation policy, check-in/out times, and house rules.',
    h1: 'Booking Terms & Conditions',
    body: 'Booking terms and conditions for Mont Bleu Guesthouse in Franschhoek. Includes cancellation policy, check-in and check-out times, house rules, payment terms, and guest age policy. Please read carefully before confirming your reservation.',
  },
  '/winter-package': {
    title: 'Winter Special Package | Mont Bleu Guesthouse Franschhoek',
    description: 'Enjoy Mont Bleu\'s winter special in Franschhoek — cosy fireplace rooms, wine pairing and valley views at a special midweek rate.',
    h1: 'Winter Special Package',
    body: 'Mont Bleu winter special package in Franschhoek. Cosy fireplace rooms, wine pairing, and sweeping valley views at a special midweek rate. Limited availability. Book direct to secure your winter retreat in the Wemmershoek mountains.',
  },
};

export async function prerender(data: { url: string }) {
  const meta = pageMeta[data.url] ?? pageMeta['/'];
  const canonicalUrl = `https://www.montbleu.co.za${data.url === '/' ? '/' : data.url}`;

  const html = `
    <main>
      <h1>${meta.h1}</h1>
      <p>${meta.body}</p>
    </main>
  `;

  return {
    html,
    links: new Set<string>(),
    head: {
      lang: 'en',
      title: meta.title,
      elements: new Set([
        { type: 'meta', props: { name: 'description', content: meta.description } },
        { type: 'link', props: { rel: 'canonical', href: canonicalUrl } },
        { type: 'meta', props: { property: 'og:url', content: canonicalUrl } },
        { type: 'meta', props: { property: 'og:title', content: meta.title } },
        { type: 'meta', props: { property: 'og:description', content: meta.description } },
        { type: 'meta', props: { property: 'og:type', content: 'website' } },
      ]),
    },
  };
}
