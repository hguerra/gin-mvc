const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['web/assets/javascripts/application.ts'],
  bundle: true,
  sourcemap: true,
  watch: true,
  outfile: 'web/assets/dist/bundle.js',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
    '.png': 'file',
    '.svg': 'file',
  }
}).catch(() => process.exit(1))
