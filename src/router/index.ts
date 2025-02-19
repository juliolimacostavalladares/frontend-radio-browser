import { createRouter, createWebHistory } from 'vue-router';
import Favorites from '@/pages/favorites.vue';
import { Star } from 'lucide-vue-next';

export const routes = [
  {
    path: '/',
    name: 'Favorites',
    component: Favorites,
    icon: Star,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
