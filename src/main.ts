import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './assets/styles/main.scss';
import '@/config/dayjs';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
