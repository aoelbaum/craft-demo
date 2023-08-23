import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { createStore } from 'vuex';
import globalStore from './store';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';

const store = createStore({
  ...globalStore,
});
const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(store);
app.mount('#app');
