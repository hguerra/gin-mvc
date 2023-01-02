const shell = require('shelljs')
const esbuild = require('esbuild')
const shared = require('./.esbuild.shared')

shell.rm('-rf', shared.constants.BUILDDIR)
shell.mkdir('-p', shared.constants.OUTDIR_PUBLIC)
shell.mkdir('-p', 'build/tmp')

shell.cp(
  '-R',
  `${shared.constants.INDIR_PUBLIC}/images`,
  `${shared.constants.OUTDIR_PUBLIC}/images`,
)

shell.cp(
  '-R',
  `${shared.constants.INDIR_PUBLIC}/javascripts`,
  `${shared.constants.OUTDIR_PUBLIC}/javascripts`,
)

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
