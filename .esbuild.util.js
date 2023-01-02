const shell = require('shelljs')
const shared = require('./.esbuild.shared')

function getAssetProps(newFilepath) {
  const directory = newFilepath.split('/')
  const newFile = directory.pop()
  const newFileParts = newFile.split('-')
  newFileParts.pop()
  const oldFile = `${newFileParts.join('-')}.${newFile.split('.').pop()}`

  let oldAsset = `/${shared.constants.PATH_ASSETS}/${oldFile}`
  let newAsset = `/${shared.constants.PATH_ASSETS}/${newFile}`

  if (newFilepath.startsWith(shared.constants.OUTDIR_ASSETS)) {
    const relativePathParts = directory.join('/').split(shared.constants.PATH_ASSETS);
    if (relativePathParts.length > 1 && relativePathParts[1]) {
      const relativePath = relativePathParts[1];
      oldAsset = `/${shared.constants.PATH_ASSETS}${relativePath}/${oldFile}`
      newAsset = `/${shared.constants.PATH_ASSETS}${relativePath}/${newFile}`
    }
  }

  return { oldAsset, newAsset, oldFile, newFile }
}

function copyImagesIgnored(filepath, oldFile) {
  const oldFileParts = oldFile.split('.')
  const oldFileExtension = oldFileParts.pop()
  const newHash = new Date().getTime().toString()
  const newFile = `${oldFileParts.join('.')}-${newHash}.${oldFileExtension}`
  const oldAsset = `/${shared.constants.PATH_ASSETS}/${oldFile}`
  const newAsset = `/${shared.constants.PATH_ASSETS}/${newFile}`
  shell.cp(filepath, `${shared.constants.OUTDIR_ASSETS}/${newFile}`)
  return { oldAsset, newAsset, oldFile, newFile }
}

module.exports = {
  getAssetProps,
  copyImagesIgnored,
}
