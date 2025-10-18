'use client';

import { ReactNode } from 'react';
import { SidebarLayout } from '@/components/dashboard/sidebar-layout';
import { User, Image, Lock, FileText, Layers, BookOpen } from 'lucide-react';

const userMenuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Layers,
  },
  {
    title: 'Manage Account',
    href: '/dashboard/manage-account',
    icon: User,
    children: [
      {
        title: 'Profile Picture',
        href: '/dashboard/manage-account/profile-picture',
      },
      {
        title: 'Personal Profile',
        href: '/dashboard/manage-account/personal-profile',
      },
      {
        title: 'Author Bio',
        href: '/dashboard/manage-account/author-bio',
      },
    ],
  },
  {
    title: '7C Dashboard',
    href: '/dashboard/sevenc',
    icon: Layers,
  },
  {
    title: 'Blog',
    href: '/dashboard/blog',
    icon: BookOpen,
  },
];

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout menuItems={userMenuItems} role="user">
      {children}
    </SidebarLayout>
  );
}
