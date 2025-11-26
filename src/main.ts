import { createApp } from "vue";
import App from "./App.vue";
import "./scss/main.scss";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import router from './router';

const pinia = createPinia()
pinia.use(piniaPersist)

createApp(App).use(pinia).use(router).mount("#app");

