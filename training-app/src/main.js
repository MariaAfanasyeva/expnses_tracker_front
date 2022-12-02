import { createApp } from 'vue';
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import 'materialize-css/dist/js/materialize.min'


createApp(App).use(router).use(store).mount('#app');