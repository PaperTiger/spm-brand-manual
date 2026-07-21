import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'fs'
import { createRequire } from 'module'
import vm from 'vm'
import path from 'path'

async function loadBrandConfig(base: string) {
  const filePath = path.resolve('./src/brand.config.ts')
  const code = readFileSync(filePath, 'utf-8')
  const { transform } = await import('esbuild')
  const { code: compiled } = await transform(code, {
    loader: 'ts',
    format: 'cjs',
    define: {
      'import.meta.env.BASE_URL': JSON.stringify(base),
      'import.meta.env.MODE':     '"production"',
      'import.meta.env.PROD':     'true',
      'import.meta.env.DEV':      'false',
    },
  })
  const mod = { exports: {} as any }
  vm.runInNewContext(compiled, {
    module: mod,
    exports: mod.exports,
    require: createRequire(import.meta.url),
    process,
  })
  return (mod.exports.default ?? mod.exports) as any
}

function brandLinkedDataPlugin() {
  let base = '/'
  let cachedBrand: Promise<any> | null = null

  const getBrand = (b: string) => {
    if (!cachedBrand) cachedBrand = loadBrandConfig(b)
    return cachedBrand
  }

  return {
    name: 'brand-linked-data',

    configResolved(config: any) {
      base = config.base
    },

    transformIndexHtml: {
      order: 'post' as const,
      async handler(html: string, ctx: any) {
        if (ctx.server) return html // dev mode — skip
        try {
          const brand = await getBrand(base)

          const ld = {
            '@context': 'https://schema.org',
            '@type': 'Brand',
            name: brand.meta.client,
            description: `${brand.meta.title} for ${brand.meta.client}. Prepared by ${brand.meta.preparedBy}. ${brand.meta.version}, ${brand.meta.date}.`,
            logo: brand.meta.sidebarLogoImage,
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'primaryColors',
                value: JSON.stringify(brand.colors.primary),
              },
              {
                '@type': 'PropertyValue',
                name: 'secondaryColors',
                value: JSON.stringify(brand.colors.secondary),
              },
              {
                '@type': 'PropertyValue',
                name: 'displayFont',
                value: brand.typography.displayFont,
              },
              {
                '@type': 'PropertyValue',
                name: 'bodyFont',
                value: brand.typography.bodyFont,
              },
              {
                '@type': 'PropertyValue',
                name: 'designTokens',
                value: JSON.stringify(brand.tokens),
              },
              {
                '@type': 'PropertyValue',
                name: 'typeScale',
                value: JSON.stringify(brand.typeScale),
              },
            ],
          }

          const script = `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n</script>`
          return html.replace('</head>', `  ${script}\n  </head>`)
        } catch (err) {
          console.warn('[brand-ld] Failed to inject JSON-LD:', err)
          return html
        }
      },
    },

    async generateBundle(this: any) {
      try {
        const brand = await getBrand(base)

        const primaryList = brand.colors.primary
          .map((c: any) => `  - ${c.name}: ${c.hex}`)
          .join('\n')
        const secondaryList = brand.colors.secondary.length
          ? brand.colors.secondary.map((c: any) => `  - ${c.name}: ${c.hex}`).join('\n')
          : '  (none)'

        const llms = `\
# ${brand.meta.client} — ${brand.meta.title}

> ${brand.meta.title} for ${brand.meta.client}. Prepared by ${brand.meta.preparedBy}. ${brand.meta.version}, ${brand.meta.date}.

This is an interactive brand book. The complete brand data is embedded in the page HTML as JSON-LD inside \`<script type="application/ld+json">\`. Fetch the page source and parse that tag to extract all brand tokens programmatically.

## Colors

Primary palette:
${primaryList}

Secondary palette:
${secondaryList}

## Typography

- Display font: ${brand.typography.displayFont}
- Body font: ${brand.typography.bodyFont}
- Google fallback: ${brand.typography.googleFallbackFont}
- System fallback: ${brand.typography.systemFallbackFont}

## Design tokens

CSS custom properties: ${Object.keys(brand.tokens).map((k: string) => `--${k}`).join(', ')}

## How to extract brand data

Fetch this page's HTML and locate \`<script type="application/ld+json">\`.
The \`additionalProperty\` array contains all brand tokens keyed by \`name\`.
`

        this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms })
      } catch (err) {
        console.warn('[brand-ld] Failed to emit llms.txt:', err)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), brandLinkedDataPlugin()],
  base: process.env.VITE_BASE_PATH ?? '/',
})
