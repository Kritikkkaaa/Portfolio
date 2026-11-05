import { defineConfig } from 'astro/config';

// Redirects for future landing pages go here, e.g.
// redirects: { '/old-page': '/new-page' }
export default defineConfig({
  site: 'https://www.kritikal.work',
  output: 'static',
  redirects: {
    '/icp-nexus': '/work/icp-positioning-messaging-nexus'
  }
});
