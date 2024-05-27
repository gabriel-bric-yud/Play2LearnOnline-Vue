import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import MathGameConfig from './components/MathGameConfig.vue';
import MathFactsGame from './components/MathFactsGame.vue';
import AnagramHuntConfig from './components/AnagramHuntConfig.vue'
import GameSelector from './components/GameSelector.vue';
import App from './App.vue';
import AnagramHuntGame from './components/AnagramHuntGame.vue';

const routes = [
  { path: '/', component: GameSelector},
  { path: '/MathFactsConfig', component: MathGameConfig },
  { path: '/MathFactsGame/:operation/:maxNumber', component: MathFactsGame, props: true },
  { path: '/AnagramHuntConfig', component: AnagramHuntConfig },
  { path: '/AnagramHuntGame/:wordlength', component: AnagramHuntGame, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
