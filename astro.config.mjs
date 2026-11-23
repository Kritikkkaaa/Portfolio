import { defineConfig } from 'astro/config';

// Redirects go here, e.g. redirects: { '/old-page': '/new-page' }
// "/" is the one-time intro, "/home" is the desk (src/pages/home.astro). Addresses that no longer exist (/home-redo, /work-redo, /home-revamp, /lets-talk) are not redirected: they show the 404 page.
export default defineConfig({
  site: 'https://www.kritikal.work',
  output: 'static',
  redirects: {
    // the first version of the Nexus case study was removed; its old addresses now open the current one
    '/icp-nexus': '/work/who-nexus-is-for',
    '/work/icp-positioning-messaging-nexus': '/work/who-nexus-is-for',
    // the old projects page now opens the work page
    '/jobs': '/work',
    // the revamp's pages moved to their final routes
    '/journey': '/roadmap',
    '/coffee': '/recommendations',
    '/substacks': '/substack'
  }
});
