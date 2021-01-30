import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
axios.defaults.baseURL = 'http://127.0.0.1/api/'
app.use(VueAxios, axios)
app.mount('#app')