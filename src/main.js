import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import GameConfig from './components/GameConfig.vue';
import GamePlay from './components/GamePlay.vue';
import App from './App.vue';

const routes = [
  { path: '/', component: GameConfig },
  { path: '/play/:operation/:maxNumber', component: GamePlay, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
