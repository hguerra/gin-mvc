import {BaseController} from "../base.controller";
import App from './components/App'

function init() {
  BaseController.init('#app', App);
}

export const HomeController = {
  init,
}
