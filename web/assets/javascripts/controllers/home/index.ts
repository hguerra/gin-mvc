import Count from './components/Count'

function init() {
  const { createApp } = Vue
  const app = createApp(Count)

  // If necessary put Vue templates in Go (*.tmpl)
  // app.config.compilerOptions.delimiters = ['${', '}']
  app.mount('#app')
}

export const HomeController = {
  init,
}
