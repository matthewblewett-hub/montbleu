import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      // Absolute path to the prerender entry script
      prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
      // Query selector for where to inject rendered HTML (matches our <div id="root">)
      renderTarget: '#root',
      // Additional routes not auto-discovered via links
      additionalPrerenderRoutes: [
        '/',
        '/stay',
        '/explore',
        '/connect-experience',
        '/gallery',
        '/contact',
        '/book',
        '/dining',
        '/booking-terms',
        '/faq',
        '/relax',
        '/winter-package',
      ],
    }),
  ],
})

