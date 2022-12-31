const shell = require('shelljs');
const esbuild = require('esbuild');

shell.rm('-rf', 'build/web');
shell.mkdir('-p', 'build/tmp');

esbuild.build({
  entryPoints: ['web/assets/javascripts/application.ts'],
  bundle: true,
  sourcemap: true,
  watch: true,
  outdir: 'build/web/assets',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
    '.png': 'file',
    '.svg': 'file',
  }
})
  .then(() => {
    shell.ls('web/assets/images/*.{png,svg}').forEach(function (filepath) {
      shell.cp(filepath, 'build/web/assets/');
    });
  })
  .catch(() => process.exit(1))
