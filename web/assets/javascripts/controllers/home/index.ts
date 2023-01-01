import App from './components/App'

function init() {
  const { createApp } = Vue
  const app = createApp(App)

  // If necessary put Vue templates in Go (*.tmpl)
  // app.config.compilerOptions.delimiters = ['${', '}']
  app.mount('#app')
}

export const HomeController = {
  init,
}
