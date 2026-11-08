/**
 * Build and dev server configuration.
 *
 * The game is served from /games/Commit_Chaos/ on the personal website. Asset paths
 * stay relative ('./'), so the same build also works locally and from any folder.
 */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    // Adds the site's analytics beacon exactly once, only to production builds, so that
    // local sessions are not measured. It is added here instead of in the deployed copy
    // because each deployment replaces that copy. The token is a public site identifier.
    // See PUBLISHING.md in personal_web_style; the workflow verifies the result.
    {
      name: 'cloudflare-web-analytics',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler: () => [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: 'https://static.cloudflareinsights.com/beacon.min.js',
              'data-cf-beacon': JSON.stringify({ token: 'e39c213b71d04ecea667fe1a7c72f355' }),
            },
            injectTo: 'body',
          },
        ],
      },
    },
  ],
  base: './',
});
