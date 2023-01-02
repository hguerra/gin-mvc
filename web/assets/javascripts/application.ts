import { MyService } from './services/service'
import '../stylesheets/application.css'

function main() {
  MyService.echo()
}

document.addEventListener('DOMContentLoaded', main)
