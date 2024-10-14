import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { store } from './store';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

const queryClient = new QueryClient();

const app = createApp(App);

app.use(VueQueryPlugin, {
  queryClient,
  enableDevtoolsV6Plugin: true
});
app.use(store);
app.use(router);
app.use(Antd);

app.mount('#app');
