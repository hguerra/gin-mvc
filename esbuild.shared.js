const shell = require('shelljs')
const sharedOptions = {
  entryPoints: ['web/assets/javascripts/application.ts'],
  outdir: 'build/web/assets',
  bundle: true,
  format: 'iife',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
    '.png': 'file',
    '.svg': 'file',
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

function getAssetProps(newFilepath) {
  const directory = newFilepath.split('/')
  const newFile = directory.pop()
  const newFileParts = newFile.split('-')
  newFileParts.pop()
  const oldFile = `${newFileParts.join('-')}.${newFile.split('.').pop()}`
  const oldAsset = `\/assets\/${oldFile}`
  const newAsset = `/assets/${newFile}`
  return { oldAsset, newAsset, oldFile, newFile }
}

function copyImagesIgnored(filepath, oldFile) {
  const oldFileParts = oldFile.split('.')
  const oldFileExtension = oldFileParts.pop()
  const newHash = new Date().getTime().toString()
  const newFile = `${oldFileParts.join('.')}-${newHash}.${oldFileExtension}`

  const oldAsset = `\/assets\/${oldFile}`
  const newAsset = `/assets/${newFile}`

  shell.cp(filepath, `build/web/assets/${newFile}`)
  return { oldAsset, newAsset, oldFile, newFile }
}

module.exports = {
  sharedOptions,
  envPlugin,
  getAssetProps,
  copyImagesIgnored,
}
