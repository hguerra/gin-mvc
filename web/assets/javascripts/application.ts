import { MyService } from './services/my-service'
import '../stylesheets/application.css'

function main() {
  MyService.echo()
  MyService.requests()
    .catch((e) => console.error(e));
}

document.addEventListener('DOMContentLoaded', main)
