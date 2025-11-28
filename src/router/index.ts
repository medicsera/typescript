import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import TodoView from "../views/TodoView.vue";
import AboutView from "../views/AboutView.vue";
import { useUserStore } from "../stores/useUserStore";
import RegistrationView from "../views/RegistrationView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegistrationView },
  { path: '/about', component: AboutView },
  { path: '/todo', component: TodoView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory('/typescript'),
  routes
});

router.beforeEach((to, _from, next) => {
  const user = useUserStore();
  if (to.meta.requiresAuth && !user.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
