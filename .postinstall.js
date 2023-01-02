const shell = require('shelljs')

const publicJavascriptsDir = 'web/public/javascripts/'
shell.cp('node_modules/vue/dist/vue.global.js', publicJavascriptsDir)
shell.cp('node_modules/vue/dist/vue.global.prod.js', publicJavascriptsDir)
