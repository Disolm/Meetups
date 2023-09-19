/** @implements {import('vue-router').NavigationGuard} */
import { useAuthStore } from '@/stores/useAuthStore';
export function authGuard(to) {
  // TO DO: Task AuthGuard
  const authStore = useAuthStore();
  const { isAuthenticated } = authStore;

  if (to.meta.requireGuest && isAuthenticated) {
    return { name: 'meetups' };
  } else if (to.meta.requireAuth && !isAuthenticated) {
    return { name: 'login', query: { from: to.path } };
  }
}
