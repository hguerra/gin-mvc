import { MyService } from './services/service'
import { HomeController } from './controllers/home.controller'

import '../stylesheets/application.css'

function main() {
  MyService.echo();
  HomeController.init()
}

document.addEventListener('DOMContentLoaded', main)
