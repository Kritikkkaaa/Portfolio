// How I launched a pricing plan on Twitter. Words and pictures from the page that was live at /work/plane-one-campaign/.
import type { CaseStudy } from './types';

const IMG = '/work/plane-one-campaign/img/';

const c: CaseStudy = {
  slug: 'plane-one-campaign',
  title: 'How I launched a pricing plan on Twitter',
  tldr: [
    { h: 'Context', p: 'Plane already had a free Community edition. Plane One asked those teams to pay once for easier, more secure self-hosting. I ran the launch solo.' },
    { h: 'What I changed', p: 'I turned the CLI demo, the engineering blog and the founders’ letter into the campaign, then brought the stories together in one thread.' },
    { h: 'Impact', p: 'The April 11 reveal drew 8.1K views. The May 15 thread drew 2.9K.' }
  ],
  hero: { src: IMG + 'blog.webp', alt: 'The engineering blog post written for the Plane One launch', cap: 'The blog: how we got there' },
  lead: [
    { t: 'p', text: 'Plane already had a free Community edition. Plane One asked those teams to pay once for easier, more secure self-hosting. What would make them pay?' },
    { t: 'p', text: 'My head of marketing let me run this one solo. My first frustration: what the hell is a CLI?' }
  ],
  sections: [
    {
      h: 'Start with what the user is trying to do.',
      blocks: [
        { t: 'p', text: 'I went to Product to understand what we’d built and why. Then I broke the setup into steps: what does someone trying to run Plane on their own server actually have to do? Where does it get easier?' },
        { t: 'p', text: 'That’s usually where I start hearing the posts I want to write. A command-line tool is a feature. Getting Plane running in under three minutes is something you can show. And all the things we got wrong on the way to making self-hosting easier? That’s a developer blog I’d actually want to read.' },
        { t: 'p', text: 'I chose the CLI demo, the engineering blog, and the founders’ letter as pieces of the campaign, then repurposed them for Twitter. The demo showed what changed. The blog explained how we got there. The letter answered why we’d chosen a one-time license in the first place.' },
        { t: 'figs', figs: [
          { src: IMG + 'reveal.jpg', cap: 'The reveal: what’s in One', alt: 'The reveal post' },
          { src: IMG + 'install.jpg', cap: 'The demo: what changed', alt: 'The CLI demo post' },
          { src: IMG + 'letter.jpg', cap: 'The letter: why a one-time license', alt: 'The founders’ letter' }
        ] }
      ]
    },
    {
      h: 'The posts were getting views. Discord was quiet.',
      blocks: [
        { t: 'p', text: 'People were seeing the posts, but I wasn’t seeing the conversation I’d expected. I went back to my content plan. The reveal spoke to “serious self-hosters,” and I’d given them plenty to look at: faster setup, more control over their servers, and better security. I’d spent less time connecting those features to the work that made people like Plane in the first place.' },
        { t: 'p', text: 'The May 15 thread was where I brought those stories together. I opened with what One meant for growing businesses and reused the demo to show how quickly they could get started. Then I pulled in posts about seeing all your active sprints in one place and sharing project views with clients. The thread gave admins a reason to care about the setup and gave the rest of the team a reason to care about the plan. It ended with the price and a deadline to preorder.' },
        { t: 'figs', figs: [
          { src: IMG + 'thread-1.jpg', cap: 'The May 15 thread', alt: 'The opening of the May 15 thread' },
          { src: IMG + 'thread-clients.jpg', cap: 'Project views for clients', alt: 'A post in the thread about sharing project views with clients' }
        ] }
      ]
    },
    {
      h: 'What happened.',
      blocks: [
        { t: 'p', text: 'The April 11 reveal drew 8.1K views. The May 15 thread drew 2.9K views. The reveal got more reach; I’d feature the thread because it best shows what I did with the content over the course of the campaign.' },
        { t: 'figs', figs: [
          { src: IMG + 'reveal.jpg', cap: '8.1K views · Apr 11 · reveal', alt: 'The April 11 reveal' },
          { src: IMG + 'thread-1.jpg', cap: '2.9K views · May 15 · thread', alt: 'The May 15 thread' }
        ] }
      ]
    },
    {
      h: 'What I’d do differently.',
      blocks: [
        { t: 'list', items: [
          'I’d add a “What does this post answer?” column to my content calendar. How long does setup take? What changes for my team? Why is this a one-time payment? That gives every post a job and makes it easier to see which questions I’m repeating and which ones I’ve left unanswered.',
          'I’d decide what success looks like before the reveal. I’d track views, pricing-page visits, and license purchases separately, with tagged links for each post. A quiet Discord tells me something about the conversation. It doesn’t tell me whether people are considering or buying the plan.'
        ] }
      ]
    }
  ],
  card: { line: 'Launching Plane One on Twitter: the tease, the reveal and the letter.', img: '/jobs/pricing-invoice.webp', mins: 3 }
};
export default c;
