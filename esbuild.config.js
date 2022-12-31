const esbuild = require('esbuild');
const manifestPlugin = require('esbuild-plugin-manifest')

esbuild.build({
  entryPoints: ['web/assets/javascripts/application.ts'],
  bundle: true,
  minify: true,
  outfile: 'web/assets/dist/bundle.js',
  plugins: [manifestPlugin()],
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
    '.png': 'file',
    '.svg': 'file',
  }
}).catch(() => process.exit(1))
