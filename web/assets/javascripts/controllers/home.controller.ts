function init() {
  const { createApp } = Vue

  const app = createApp({
    data() {
      return {
        message: 'Hello Vue!',
      }
    },
  })

  app.config.compilerOptions.delimiters = ['${', '}']
  app.mount('#app')
}

export const HomeController = {
  init,
}
