import { createRouter, createWebHistory } from 'vue-router';
import { Store } from './store';
import Home from './components/Home.vue';
import NewPost from './components/NewPost.vue';

export function routerWithStore(store: Store) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Home },
      {
        path: '/posts/new',
        component: NewPost,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    const auth = !store.getState().authors.currentUserId;
    if (!to.meta.requiresAuth) {
      next();
      return;
    }

    if (to.meta.requiresAuth && auth) {
      next();
    } else {
      next({
        path: '/',
      });
    }
  });

  return router;
}
