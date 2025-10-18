"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, User, LogOut, ArrowLeft } from "lucide-react"
import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    // Handle page links (like /blog)
    if (href.startsWith('/')) {
      router.push(href)
      return
    }
    
    // Handle hash links - if not on home page, navigate to home page first
    if (pathname !== '/') {
      router.push(`/${href}`)
      return
    }
    
    // On home page, scroll to section
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) {
    return null
  }

  // Determine if current route is represented in the menu
  const menuPaths = navItems.filter(i => i.href.startsWith('/')).map(i => i.href)
  const isKnownPath = pathname === '/' || menuPaths.includes(pathname)
  const showBack = !isKnownPath
  
  // Hide navigation on dashboard and auth routes (they have their own navigation)
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')
  const isAuthPage = pathname?.startsWith('/auth/signin')
  
  if (isDashboard || isAuthPage) {
    return null
  }

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBack && (
              <Button variant="ghost" size="icon" onClick={handleBack} className="mr-1 h-9 w-9" title="Go back">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image
                src="/HarishBabry-logo.png"
                alt="Harish Kumar Babry Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-display font-bold text-xl">
              Harish Kumar Babry
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {session ? (
              <>
                <Link href={(session.user as any).role === 'admin' ? '/admin/dashboard' : '/dashboard'}>
                  <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{session.user?.name}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut()}
                  className="h-9 w-9"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}