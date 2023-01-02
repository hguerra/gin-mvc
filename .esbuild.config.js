const shell = require('shelljs')
const esbuild = require('esbuild')
const shared = require('./.esbuild.shared')

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

    shell.mkdir('-p', 'build/web')
    shell.cp('-R', 'web/views', 'build/web/views')

    shell.ls('web/assets/images/*.{png,svg}').forEach((filepath) => {
      const props = shared.getAssetProps(filepath)
      imagesNotCopied[props.newFile] = filepath
    })

    shell.ls('build/web/assets/*.{js,css,png,svg}').forEach((filepath) => {
      const props = shared.getAssetProps(filepath)
      delete imagesNotCopied[props.oldFile]
      assetsProps.push(props)
    })

    for (const oldFile in imagesNotCopied) {
      assetsProps.push(
        shared.copyImagesIgnored(imagesNotCopied[oldFile], oldFile),
      )
    }

    shell.ls('build/web/views/*/*.tmpl').forEach((templatePath) => {
      for (const props of assetsProps) {
        shell.sed('-i', props.oldAsset, props.newAsset, templatePath)
      }
    })
  })
  .catch(() => process.exit(1))
