import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, User, Menu, MessageSquare, Users, BarChart3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { currentUser, getUnreadNotificationCount } from "@/lib/mockData"

export function Header() {
  const [isAuthenticated] = useState(true) // Mock auth state
  const location = useLocation()
  const unreadCount = getUnreadNotificationCount(currentUser.id)

  const navItems = [
    { href: "/", label: "Home", icon: Users },
    { href: "/browse", label: "Browse", icon: Search },
    { href: "/swaps", label: "My Swaps", icon: BarChart3 },
    { href: "/messages", label: "Messages", icon: MessageSquare, badge: unreadCount },
  ]

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col space-y-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-smooth hover:bg-accent ${
                location.pathname === item.href ? "bg-accent text-primary" : ""
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
          <div className="pt-4 border-t">
            <Link to="/profile">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="sketch-border bg-primary p-2">
            <div className="text-primary-foreground font-bold text-xl">SS</div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold">SkillSwap</h1>
            <p className="text-xs text-muted-foreground">Learn & Teach</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth hover:bg-accent/50 ${
                  location.pathname === item.href ? "bg-accent text-primary font-medium" : ""
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        )}
        
        {/* Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search skills..." 
              className="pl-10 sketch-border"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex relative" asChild>
                <Link to="/messages">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Link>
              </Button>
              <Button variant="outline" className="hidden sm:flex" asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  {currentUser.name}
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="hidden sm:flex" asChild>
                <Link to="/login">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/register">Join Now</Link>
              </Button>
            </>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}