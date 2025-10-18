'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  children?: { title: string; href: string }[];
}

interface SidebarLayoutProps {
  children: ReactNode;
  menuItems: MenuItem[];
  role: 'admin' | 'user';
}

export function SidebarLayout({ children, menuItems, role }: SidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: MenuItem) => {
    if (isActive(item.href)) return true;
    return item.children?.some((child) => isActive(child.href));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 p-2 hover:bg-muted rounded-md"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold capitalize">{role} Portal</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {role}</span>
            <button className="p-2 hover:bg-muted rounded-md">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300',
            isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
          )}
        >
          <nav className="space-y-2 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.includes(item.title);
              const isItemActive = isParentActive(item);

              return (
                <div key={item.title}>
                  <div
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
                      isItemActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted hover:text-foreground'
                    )}
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpand(item.title);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 flex-1"
                      onClick={(e) => hasChildren && e.preventDefault()}
                    >
                      <Icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                    {hasChildren && (
                      <div className="ml-2">
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <div className="ml-9 mt-1 space-y-1">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block rounded-lg px-3 py-2 text-sm transition-colors',
                            isActive(child.href)
                              ? 'bg-muted font-medium'
                              : 'hover:bg-muted/50'
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            'flex-1 p-8 transition-all duration-300',
            isSidebarOpen ? 'ml-64' : 'ml-0'
          )}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
