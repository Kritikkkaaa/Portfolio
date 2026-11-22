// What I learnt building Plane's Twitter from scratch! Words and pictures from the page that was live at /work/grow-planes-twitter/.
import type { CaseStudy } from './types';

const IMG = '/work/grow-planes-twitter/img/';
const MEDIA = '/work/grow-planes-twitter/media/';

const c: CaseStudy = {
  slug: 'grow-planes-twitter',
  title: 'What I learnt building Plane’s Twitter from scratch!',
  tldr: [
    { h: 'Context', p: 'My head of marketing said, “You are Gen Z. Go be snappy on Twitter, and you better make something of it.”' },
    { h: 'What I changed', p: 'I started with the product: weekly updates and release notes. Then I kept telling the same story over and over, in the language of customers who knew their stuff, and talked back to the community.' },
    { h: 'Impact', p: 'Views climbed with every update done well, and Plane’s Discord started buzzing, with people answering each other’s queries. 500+ posts and 20+ release notes.' }
  ],
  hero: { src: IMG + 'v020.jpg', alt: 'Plane’s tweet announcing the v0.20-dev release, with a release graphic, posted 31 May 2024.', cap: 'v0.20-dev release tweet, 31 May 2024' },
  lead: [
    { t: 'p', text: 'My head of marketing said, “You are Gen Z. Go be snappy on Twitter, and you better make something of it.”' },
    { t: 'p', text: 'I took it to heart 😉 Here is what I swear by!' }
  ],
  sections: [
    {
      h: 'Start simple. With your product updates.',
      blocks: [
        { t: 'p', text: 'Every user cares about the product they use. That is where I began building Plane’s Twitter. Good brands educate their users in their own way!' },
        { t: 'p', text: 'My co-founder taught me how much release notes matter in an open-core product. I added my Gen Z sass and started showing Plane’s Twitter community what was new each week.' },
        { t: 'label', text: 'Why it worked' },
        { t: 'bullets', items: [
          'Our views climbed with every update done well. We were reaching new people. Exactly what we wanted.',
          'Our Discord community was buzzing. People had started talking to each other and answering each other’s queries. We didn’t expect this, and we were so happy!'
        ] },
        { t: 'video', src: MEDIA + 'swimlanes.mp4', poster: IMG + 'swimlanes.jpg', cap: 'Release note clip: swimlanes', w: 800, h: 586 },
        { t: 'video', src: MEDIA + 'kanban.mp4', poster: IMG + 'kanban.jpg', cap: 'Release note clip: kanban', w: 800, h: 854 }
      ]
    },
    {
      h: 'Nothing is a one-post activity. Talk about it over and over!',
      blocks: [
        { t: 'p', text: 'I thought Plane’s Twitter was the best. Our customers did not agree with me.' },
        { t: 'p', text: 'From the pricing launch to our open-core events, everything worked when I told a story and kept bringing their attention back to what mattered.' },
        { t: 'p', text: 'For us, that was our community, at the centre of everything we did.' },
        { t: 'figs', figs: [
          { src: IMG + 'letter.jpg', cap: 'Founders’ letter tweet, 17 May 2024', alt: 'Plane’s #WhyPlaneOne tweet with the founders’ letter attached, posted 17 May 2024.', w: 900, h: 1139 }
        ] }
      ]
    },
    {
      h: 'It won’t matter if your audience can’t understand it.',
      blocks: [
        { t: 'p', text: 'Plane was an open-source product, which is apparently a huge deal from a security point of view. I never got half the things I had to talk about.' },
        { t: 'p', text: 'But I quickly realised our customers were savvy and smart, and that meant talking to them in their language. Technical storytelling came to my rescue.' },
        { t: 'figs', figs: [
          { src: IMG + 'install.jpg', cap: 'Installs in 3 minutes, 3 May', alt: 'Plane’s tweet showing Plane One installing in under three minutes, with a video and a quoted tweet, posted 3 May 2024.', w: 806, h: 1568 },
          { src: IMG + 'deploy.jpg', cap: 'One-click deploy, 16 Apr', alt: 'Plane’s tweet about Plane One’s one-click deploy with a pretty CLI, posted 16 Apr 2024.', w: 796, h: 1570 }
        ] }
      ]
    },
    {
      h: 'To have a village, you must be willing to be a villager.',
      blocks: [
        { t: 'p', text: 'I had so much fun building Plane’s Twitter. Talking to its community was the best part.' },
        { t: 'figs', figs: [
          { src: IMG + 'r1.jpg', cap: 'Licious’s juicy chicken tweet, and the reply', alt: 'Licious tweets that whoever said you can’t have juicy chicken every time needs to talk. Plane replies in the same format about managing projects.' },
          { src: IMG + 'r2.jpg', cap: 'Omar McAdam asks about “Jira tears”', alt: 'Omar McAdam asks if these are the good kind of tears, not Jira tears. Plane replies that they are the best ever kind.' },
          { src: IMG + 'r3.jpg', cap: 'Alex Walter asks for file attachments', alt: 'Alex Walter asks for file attachments in comments. Plane replies with a preview of a whole Drive feature, coming soon.' },
          { src: IMG + 'r4.jpg', cap: 'Didier Lopes asks for a Confluence swap', alt: 'Didier Lopes asks whether Plane has a Confluence replacement. Plane replies with Pages and asks for his feedback.' },
          { src: IMG + 'r5.jpg', cap: 'Lorenzo De Nobili asks if Plane is Italian', alt: 'Lorenzo De Nobili asks if Plane is Italian. Plane replies, no signore, just global and a little too Internet.' }
        ] }
      ]
    },
    {
      h: 'What I learnt?',
      blocks: [
        { t: 'list', items: [
          'Consistency will beat creativity any time.',
          'Experimenting with your audience is a more authentic story than any you can weave.'
        ] }
      ]
    }
  ],
  card: { line: 'Plane’s Twitter from zero: 500+ posts and 20+ release notes.', img: '/jobs/twitter-network.webp', mins: 3 }
};
export default c;
