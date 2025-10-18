'use client';

import { ReactNode } from 'react';
import { SidebarLayout } from '@/components/dashboard/sidebar-layout';
import { Users, Database, FileText, Layers } from 'lucide-react';

const adminMenuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: Layers,
  },
  {
    title: 'Manage Users',
    href: '/admin/dashboard/manage-users',
    icon: Users,
  },
  {
    title: 'Database Tools',
    href: '/admin/dashboard/database-tools',
    icon: Database,
  },
  {
    title: 'Manage Posts',
    href: '/admin/dashboard/manage-posts',
    icon: FileText,
    children: [
      {
        title: 'All Posts',
        href: '/admin/dashboard/manage-posts',
      },
      {
        title: 'Categories',
        href: '/admin/dashboard/manage-posts/categories',
      },
    ],
  },
  {
    title: '7C Admin',
    href: '/admin/dashboard/sevenc-admin',
    icon: Layers,
  },
];

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout menuItems={adminMenuItems} role="admin">
      {children}
    </SidebarLayout>
  );
}
