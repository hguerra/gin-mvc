const shell = require('shelljs')
const esbuild = require('esbuild')
const shared = require('./esbuild.shared')

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
    shell.ls('web/assets/images/*.{png,svg}').forEach((filepath) => {
      shell.cp(filepath, 'build/web/assets/')
    })
  })
  .catch((e) => console.error(e))
