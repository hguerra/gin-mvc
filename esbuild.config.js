const shell = require('shelljs');
const esbuild = require('esbuild');
const manifestPlugin = require('esbuild-plugin-manifest');

shell.rm('-rf', 'build');

function getAssets(filepath) {
  const fileHash = filepath.split('/').pop();
  const file = `${fileHash.split('-')[0]}.${filepath.split('.').pop()}`;
  const oldAsset = `\/assets\/${file}`;
  const newAsset = `/assets/${fileHash}`;
  return {oldAsset, newAsset};
}

esbuild.build({
  entryPoints: ['web/assets/javascripts/application.ts'],
  bundle: true,
  minify: true,
  outdir: 'build/web/assets',
  plugins: [manifestPlugin({
    hash: true,
    shortNames: true,
  })],
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
    '.png': 'file',
    '.svg': 'file',
  }
})
  .then(() => {
    shell.mkdir('-p', 'build/web');
    shell.cp('-R', 'web/views', 'build/web/views');

    shell.ls('build/web/views/*/*.tmpl').forEach(function (templatePath) {
      shell.ls('build/web/assets/*.{js,css,png,svg}').forEach(function (imagePath) {
        const {oldAsset, newAsset} = getAssets(imagePath);
        shell.sed('-i', oldAsset, newAsset, templatePath);
      });
    });
  })
  .catch(() => process.exit(1))
