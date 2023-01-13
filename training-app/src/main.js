import { createApp } from 'vue';
import messagePlugin from './utils/message_plugin/index.js';
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import 'materialize-css/dist/js/materialize.min'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCk9tqh4wkD7IjwiC3bIFYSL2obvdAvuuk",
  authDomain: "vue-expenses-track.firebaseapp.com",
  projectId: "vue-expenses-track",
  storageBucket: "vue-expenses-track.appspot.com",
  messagingSenderId: "419651291774",
  appId: "1:419651291774:web:3fd8e0c492e575a3c0262f",
  measurementId: "G-6TJ1B4DM6V"
};
// Initialize Firebase Authentication and get a reference to the service
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)

let app 
auth.onAuthStateChanged( () => {
    if (!app){
        app = createApp(App).use(messagePlugin).use(router).use(store).mount('#app');
    }
    
})
