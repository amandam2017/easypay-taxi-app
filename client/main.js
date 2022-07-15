import './semantic.css'
import './style.css'

import Alpine from 'alpinejs'
import './login'
import './routes'
import Taxi from './app'
import persist from '@alpinejs/persist'

window.Alpine = Alpine
Alpine.plugin(persist)
Alpine.data('taxisapis',Taxi)
Alpine.start()
