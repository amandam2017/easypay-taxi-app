import './semantic.css'
import './style.css'
import './bootstrap.min.css'

import Alpine from 'alpinejs'
import './login'
import './routes'
import './driver'
import './map'

import Taxi from './app'
// import persist from '@alpinejs/persist'

window.Alpine = Alpine
// Alpine.plugin(persist)
Alpine.data('taxisapis',Taxi)
Alpine.start()
