import './style.css'
// import './bootstrap.min.css'

import Alpine from 'alpinejs'

import Taxi from './app'
import persist from '@alpinejs/persist'

window.Alpine = Alpine
Alpine.plugin(persist)
Alpine.data('taxisapis',Taxi)
Alpine.start()
