import { createApp } from 'vue';
import messagePlugin from './utils/message_plugin/index.js';
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import 'materialize-css/dist/js/materialize.min'


createApp(App).use(messagePlugin).use(router).use(store).mount('#app');