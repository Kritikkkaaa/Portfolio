// Who Nexus is for, and how I got there. Words and numbers from the interactive board that was live at /work/who-nexus-is-for,
// rebuilt as a blog (sentence case). The board's cards, charts, comparison columns and interview are the blocks below.
import type { CaseStudy } from './types';

const POSTS = '/work/who-nexus-is-for/';
const DOCS = '/case/icp-nexus/';

// colours for the numbers: plum for the thing being measured, stone for the rest, green for a third group
const PLUM = '#5a1626', STONE = '#c5b9a6', GREEN = '#4a7568';

const c: CaseStudy = {
  slug: 'who-nexus-is-for',
  title: 'Who Nexus is for, and how I got there',
  tldr: [
    { h: 'Context', p: 'Knowing who uses your product doesn’t tell you who to target. It tells you even less about what to say to them.' },
    { h: 'What I changed', p: 'I brought a product manager’s understanding of users into Nexus’s ideal customer profile and positioning.' },
    { h: 'Impact', p: 'Free to start became simple to start, manage and grow a marketplace. The promise moved from what it costs to what it takes.' }
  ],
  hero: {
    src: POSTS + 'nexus-linkedin-1-sellers-not-jobs.jpg',
    alt: 'Nexus LinkedIn post: “You wanted more sellers. Not more jobs.” Five painters each painting a strip of one wall a different colour.',
    cap: 'LinkedIn post: more sellers, not jobs'
  },
  lead: [
    { t: 'p', text: 'Knowing who uses your product doesn’t tell you who to target. It tells you even less about what to say to them. That takes research, care and more research.' },
    { t: 'p', text: 'Follow along to see how I brought a product manager’s understanding of users into Nexus’s ideal customer profile and positioning.' },
    { t: 'qlist', items: ['Who uses Nexus?', 'Who should we target?', 'What should we say?'] },
    { t: 'p', text: 'How did I arrive at this messaging?' },
    { t: 'figs', figs: [
      { src: POSTS + 'nexus-linkedin-2-messy-to-organised.jpg', cap: 'LinkedIn post: messy vs organised', alt: 'Nexus LinkedIn post: a crowded, messy table of people on laptops beside one calm person on an empty bench. “Messy. Chaotic. Disordered.” versus “Organised. Structured. Streamlined.”', w: 1920, h: 943 }
    ] }
  ],
  sections: [
    {
      h: 'What I knew, and what I didn’t',
      blocks: [
        { t: 'label', text: 'Things I knew' },
        { t: 'chart', kind: 'donut', cap: 'Current segmentation of users', centre: { n: '7.9%', l: 'paying' }, parts: [
          { label: 'Trial expired', value: 211, share: '87.9%', color: STONE },
          { label: 'Paying', value: 19, share: '7.9%', color: PLUM },
          { label: 'On trial', value: 10, share: '4.2%', color: GREEN }
        ] },
        { t: 'fact', text: '17 stores pay for Nexus today. 8 of them run 10+ sellers.' },
        { t: 'label', text: 'Open questions' },
        { t: 'qlist', items: ['Who installs Nexus, and who pays?', 'Who did the founders build it for?', 'What do those customers need handled?', 'Who do we speak to first?'] }
      ]
    },
    {
      h: 'Who gets the most value?',
      blocks: [
        { t: 'p', text: 'I defined who gets the most value from Nexus.' },
        { t: 'p', text: 'I read why merchants uninstalled and what they asked for on Intercom.' },
        { t: 'p', text: 'The answer was specific: established brands with their own catalogue, who need vendors, orders and payouts handled in one place.' },
        { t: 'figs', figs: [
          { src: DOCS + 'icp-table.png', cap: 'Final ICP!', alt: 'The Nexus ideal customer profile: business, Shopify plan, region, trigger moment and job to be done, each with its evidence.', w: 1084, h: 660 },
          { src: DOCS + 'not-for.png', cap: 'Guardrails, aka who we do not serve', alt: 'Who Nexus is not for: stores syncing to Etsy, Amazon or Walmart, vendors looking to join a marketplace, agencies testing on dev stores, and large enterprises needing a custom build.', w: 1106, h: 488 },
          { src: DOCS + 'where-they-gather.png', cap: 'Where they hang out', alt: 'Where they gather: Shopify App Store search, about 48% of discovery; Google, about 11%; AI assistants and the listicles they cite; other platforms such as Product Hunt and G2.', w: 896, h: 252 }
        ] },
        { t: 'chart', kind: 'pie', cap: 'Current installs with primary ICP', parts: [
          { label: 'Primary ICP', value: 18, share: '18%', color: PLUM },
          { label: 'Other installs', value: 82, share: '82%', color: STONE }
        ] }
      ]
    },
    {
      h: 'What value do they get?',
      blocks: [
        { t: 'p', text: 'Once I knew who they were, I asked what they actually get from Nexus.' },
        { t: 'fact', text: 'For Shopify brands, Nexus makes running a multi-vendor marketplace simple: to decide on, to set up, and to grow.' },
        { t: 'compare', oldH: 'The old way', nowH: 'With Nexus', groups: [
          { label: 'Simple to use',
            old: ['Onboard vendors and chase them for information', 'Teach vendors how to use a new platform', 'Hand-hold them through the first few weeks'],
            now: ['Sellers sign up through your branded link. All information collected before onboarding not after.', 'Each seller lands on their own dashboard for products, orders and payouts', 'Guided steps take them from sign-up to their first product'],
            msgH: 'Onboard sellers without becoming their help desk.',
            msg: 'Collect everything at sign-up, not after. Guided steps take each seller from joining to their first product.' },
          { label: 'Simple to grow with',
            old: ['A new seller sends an Excel sheet for you to review', 'Your team uploads every product to Shopify by hand', 'After delivery, your team calculates commissions by hand'],
            now: ['Sellers upload and manage their own products on their dashboard', 'You review, add remarks or approve them from your dashboard', 'Nexus calculates each commission. You review it and pay.'],
            msgH: 'Add sellers, not spreadsheets.',
            msg: 'No more Excel sheets to review or products to upload by hand. Sellers manage their own listings, and Nexus works out every commission.' },
          { label: 'Simple to migrate',
            old: ['Demo to understand the product.', 'Quotes and pricing for a custom build', 'Migration plan after all is decided'],
            now: ['Install Nexus from Shopify app store', 'Try everything for 14 days, no demos needed', 'Start on your existing Shopify store'],
            msgH: 'No migration plan required.',
            msg: 'Install from the Shopify App Store and run it on your live store for 14 days.' }
        ] }
      ]
    },
    {
      h: 'Why build Nexus at all?',
      blocks: [
        { t: 'p', text: 'Then I asked the founder why he built Nexus when competitors already exist. Another chance to practise the Mom Test: ask for stories and trade-offs, not opinions on my own ideas. Three of his six answers came back to simple or easy.' },
        { t: 'qa', pairs: [
          ['A year in, what should a brand tell a friend?', 'Simple to use, to find users, to configure, to decide.'],
          ['If Nexus were a car or a person?', 'Powerful, yet so simple to use.'],
          ['Which merchant would you turn away?', 'People who don’t respect software, or want a custom build.'],
          ['What should Nexus never feel like?', 'Unstable or unreliable.'],
          ['Which merchant story makes you proudest?', 'Erica from art therapy.'],
          ['If we showed one thing, what would it be?', 'How easy Nexus is to use.']
        ] }
      ]
    },
    {
      h: 'What changed',
      blocks: [
        { t: 'p', text: 'Free to start became simple to start, manage and grow a marketplace. The promise moved from what it costs to what it takes.' },
        { t: 'shift', fromLabel: 'Previous positioning', from: 'Free to start', toLabel: 'Current positioning', to: 'Simple to start, manage and grow a marketplace' },
        { t: 'learnt', label: 'What I learnt', text: 'Users show you what they do. You decide who you’re for, and what you’re best at.' }
      ]
    }
  ],
  closing: 'Behind every uninstall was someone who hoped Nexus would work for them. I still think about them.',
  card: { line: 'How I brought a product manager’s understanding of users into Nexus’s ideal customer profile and positioning.', img: '/jobs/chess-linocut.png', mins: 3 }
};
export default c;
