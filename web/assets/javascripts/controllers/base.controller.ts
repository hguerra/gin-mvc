import {App, Component} from "vue";

function init(rootContainer: HostElement | string, rootComponent: Component, rootProps?: Data | null) {
  const {createApp} = Vue
  const app: App<HostElement> = createApp(rootComponent, rootProps)
  // If necessary put Vue templates in Go (*.tmpl)
  // app.config.compilerOptions.delimiters = ['${', '}']
  app.mount(rootContainer)
}

export const BaseController = {
  init,
}
