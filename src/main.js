// src/main.js
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import clickOutside from './directives/clickOutside'
import fadeOnScroll from './directives/fadeOnScroll'
import App from './App.vue'
import router from './router'


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.directive('click-outside', clickOutside)
app.directive('fade-on-scroll', fadeOnScroll)



app.mount('#app')
