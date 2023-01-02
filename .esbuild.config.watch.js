const shell = require('shelljs')
const esbuild = require('esbuild')
const shared = require('./.esbuild.shared')

shell.rm('-rf', 'build/web')
shell.mkdir('-p', 'build/tmp')

esbuild
  .build({
    ...shared.sharedOptions,
    minify: false,
    sourcemap: true,
    treeShaking: false,
    watch: true,
    plugins: [shared.envPlugin],
  })
  .then(() => {
    shell
      .ls(`${shared.constants.INDIR_ASSETS}/**/*.{png,svg}`)
      .forEach((filepath) => {
        shell.cp(filepath, shared.constants.OUTDIR_ASSETS)
      })
  })
  .catch((e) => console.error(e))
