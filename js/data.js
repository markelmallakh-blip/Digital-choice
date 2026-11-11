/* ==========================================================================
   Digital Choice — shared content (projects drive Home, Work and Case pages)
   Everything here is editable copy. Services/industry per project are best
   guesses from the live sites — confirm with the team before launch.
   ========================================================================== */
window.DC = {
  // Calendly event link for the "Book a free 30-min consultation" block, e.g. https://calendly.com/your-name/30min
  // Leave empty to hide the scheduler.
  calendly: '',
  projects: [
    {
      slug: 'zainac-solar', name: 'Zainac Solar', cat: 'Corporate · Renewable energy', tags: ['corporate'],
      url: 'https://zainacsolar.com/en', host: 'zainacsolar.com', img: 'zainac',
      industry: 'Renewable energy', services: ['Corporate website', 'UI/UX design', 'Bilingual EN/AR'], platform: 'Web · Responsive',
      intro: 'A bright, credible web presence for a solar energy company selling clean power to homes and businesses.',
      challenge: 'Solar is a considered purchase. Visitors arrive sceptical about cost and reliability, so the site had to build trust in seconds and make the next step — a consultation — feel easy.',
      approach: 'We led with big, sunlit photography and a single promise, then structured the site around solutions, projects and proof. Clear CTAs and a downloadable company profile give sales teams something to send.',
    },
    {
      slug: 'zawya-media', name: 'Zawya Media', cat: 'News & media platform', tags: ['custom', 'media'],
      url: 'https://zawaya.media', host: 'zawaya.media', img: 'zawya',
      industry: 'News & media', services: ['Custom web platform', 'Editorial CMS', 'UI/UX design'], platform: 'Web · Arabic RTL',
      intro: 'A fast Arabic news platform built to publish all day — featured stories, categories, video and opinion.',
      challenge: 'Newsrooms live on speed. Editors needed to publish and re-order stories in seconds, and readers needed a clean RTL experience that loads fast on mobile data.',
      approach: 'We designed a modular homepage of story blocks the editorial team can rearrange, a reading layout tuned for Arabic typography, and a lightweight front end that keeps pages quick.',
    },
    {
      slug: 'ifc-consultant', name: 'IFC Consultant', cat: 'Corporate · Façade engineering', tags: ['corporate'],
      url: 'https://ifc-consultant.com', host: 'ifc-consultant.com', img: 'ifc',
      industry: 'Engineering consultancy', services: ['Corporate website', 'UI/UX design', 'Content structure'], platform: 'Web · Responsive',
      intro: 'A corporate platform for a MENA façade engineering consultancy and training provider.',
      challenge: 'Two audiences — developers buying consultancy and engineers buying courses — had to find their path without the site feeling like two companies.',
      approach: 'Architectural imagery and a confident headline set the tone, while services and case studies split cleanly from the first screen. Typography stays technical and precise, like the work.',
    },
    {
      slug: 'anoush-dahabiya', name: 'Anoush Dahabiya', cat: 'Hospitality · Nile cruises', tags: ['ecommerce', 'brand'],
      url: 'https://anoushdahabiya.com', host: 'anoushdahabiya.com', img: 'anoush',
      industry: 'Luxury travel', services: ['Website & booking enquiries', 'UI/UX design', 'Media buying'], platform: 'Web · Responsive',
      intro: 'An immersive website for a private dahabiya Nile cruise between Luxor and Aswan.',
      challenge: 'Luxury travellers book on emotion. The site needed to sell an experience — not a cabin list — and turn that feeling into direct enquiries instead of OTA commissions.',
      approach: 'Full‑bleed cinematic visuals, a slow editorial pace and trips presented as stories. Every section ends in a clear enquiry path, ready to plug into paid campaigns.',
    },
    {
      slug: 'oncreation', name: 'Oncreation', cat: 'Corporate · Creative agency', tags: ['corporate'],
      url: 'https://on-creation.pages.dev', host: 'on-creation.pages.dev', img: 'oncreation',
      industry: 'Creative services', services: ['Corporate website', 'UI/UX design', 'Motion'], platform: 'Web · Responsive',
      intro: 'A bold corporate site for a creative company — people‑first, with a meeting booked in one click.',
      challenge: 'The brand sells people and ideas. The site had to feel human and premium while keeping the path to a meeting obvious on every page.',
      approach: 'Dark, cinematic photography with a single accent colour, a persistent “Schedule meeting” action and a services menu that stays short and scannable.',
    },
    {
      slug: 'imkan-media', name: 'Imkan Media', cat: 'Marketing agency · Arabic', tags: ['corporate', 'media'],
      url: 'https://imkanmedia.com', host: 'imkanmedia.com', img: 'imkan',
      industry: 'Marketing agency', services: ['Corporate website', 'Arabic UI/UX', 'Lead generation'], platform: 'Web · Arabic RTL',
      intro: 'An Arabic‑first website for an integrated marketing agency helping businesses grow.',
      challenge: 'A marketing agency’s site is its own proof. It needed to explain integrated services fast and convert visitors into consultation requests.',
      approach: 'A deep‑blue, tech‑forward look with a strong Arabic headline, service blocks that read in seconds and a consultation CTA above the fold.',
    },
    {
      slug: 'basem-bahaa', name: 'Eng. Basem Bahaa', cat: 'Personal brand', tags: ['brand'],
      url: 'https://basembahaa.com', host: 'basembahaa.com', art: { bg: '#0E0E0E', fg: '#EA573E', t: 'BB' },
      industry: 'Personal brand', services: ['Personal website', 'UI/UX design'], platform: 'Web · Responsive',
      intro: 'A personal brand website for an engineer and consultant.',
      challenge: 'A personal site has to do the networking for you — credibility, expertise and a way to get in touch, in one scroll.',
      approach: 'A clean, typographic layout that puts the person first, with expertise, highlights and contact laid out as a simple story.',
    },
    {
      slug: 'crafted', name: 'Crafted', cat: 'UI/UX · Desktop & mobile', tags: ['uiux'],
      host: 'figma prototype', art: { bg: '#F8C9BE', fg: '#0E0E0E', t: 'Cr' },
      industry: 'Product design', services: ['UI/UX design', 'Desktop prototype', 'Mobile prototype'], platform: 'Figma · Desktop + Mobile',
      intro: 'A desktop and mobile product design — the mobile view designed as the hero, not an afterthought.',
      challenge: 'Most traffic is on phones, so every interaction had to work with a thumb first and scale up to desktop gracefully.',
      approach: 'We designed mobile‑first in Figma, prototyped the key flows and then adapted the system for desktop with shared components.',
    },
    {
      slug: 'animarise', name: 'Animarise', cat: 'UI/UX · Prototype', tags: ['uiux'],
      host: 'figma prototype', art: { bg: '#1A1A1A', fg: '#F3EFE7', t: 'An' },
      industry: 'Animation studio', services: ['UI/UX design', 'Interactive prototype', 'Motion direction'], platform: 'Figma · Prototype',
      intro: 'An interactive prototype for an animation studio where motion is the message.',
      challenge: 'For an animation studio, a static site would undersell the craft. The interface itself had to move.',
      approach: 'We prototyped scroll‑driven transitions and micro‑interactions in Figma so the team could feel the experience before a line of code.',
    },
  ],
};
