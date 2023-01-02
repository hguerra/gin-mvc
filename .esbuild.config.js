const shell = require('shelljs')
const esbuild = require('esbuild')
const shared = require('./.esbuild.shared')
const util = require('./.esbuild.util')

const manifestPlugin = require('esbuild-plugin-manifest')

shell.rm('-rf', 'build')

esbuild
  .build({
    ...shared.sharedOptions,
    minify: true,
    sourcemap: false,
    treeShaking: true,
    watch: false,
    plugins: [
      manifestPlugin({
        hash: true,
        shortNames: true,
      }),
      shared.envPlugin,
    ],
  })
  .then(() => {
    const assetsProps = []
    const imagesNotCopied = {}

    shell.mkdir('-p', shared.constants.BUILDDIR)
    shell.cp('-R',shared.constants.INDIR_VIEWS, shared.constants.OUTDIR_VIEWS)
    shell.cp('-R',shared.constants.INDIR_PUBLIC, shared.constants.OUTDIR_PUBLIC)

    shell.ls(`${shared.constants.INDIR_ASSETS}/**/*.{png,svg}`).forEach((filepath) => {
      const props = util.getAssetProps(filepath)
      imagesNotCopied[props.newFile] = filepath
    })

    shell.ls(`${shared.constants.OUTDIR_ASSETS}/**/*.{js,css,png,svg}`).forEach((filepath) => {
      const props = util.getAssetProps(filepath)
      delete imagesNotCopied[props.oldFile]
      assetsProps.push(props)
    })

    for (const oldFile in imagesNotCopied) {
      assetsProps.push(
        util.copyImagesIgnored(imagesNotCopied[oldFile], oldFile),
      )
    }

    shell.ls(`${shared.constants.OUTDIR_VIEWS}/**/*.tmpl`).forEach((templatePath) => {
      for (const props of assetsProps) {
        shell.sed('-i', props.oldAsset, props.newAsset, templatePath)
      }
    })
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
