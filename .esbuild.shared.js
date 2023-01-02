const entryPoints = require('./.esbuild.bundle.js')

const constants = {
  INDIR_ASSETS: 'web/assets',
  INDIR_VIEWS: 'web/views',
  INDIR_PUBLIC: 'web/public',
  BUILDDIR: 'build/web',
  OUTDIR_ASSETS: 'build/web/assets',
  OUTDIR_VIEWS: 'build/web/views',
  OUTDIR_PUBLIC: 'build/web/public',
  PATH_ASSETS: 'assets',
}

const sharedOptions = {
  entryPoints: entryPoints.bundles,
  bundle: true,
  format: 'iife',
  outdir: constants.OUTDIR_ASSETS,
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
    '.png': 'file',
    '.svg': 'file',
    '.html': 'text',
  },
}

const envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (args) => ({
      path: args.path,
      namespace: 'env-ns',
    }))
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }))
  },
}

module.exports = {
  constants,
  sharedOptions,
  envPlugin,
}
