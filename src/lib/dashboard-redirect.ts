export function getDashboardUrl(role: 'admin' | 'user'): string {
  return role === 'admin' ? '/admin/dashboard' : '/dashboard';
}
