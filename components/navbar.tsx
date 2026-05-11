import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface NavbarProps {
  activePage?: "home" | "tracks" | "team" | "office-hours"
}

export function Navbar({ activePage }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-8 md:px-12">
        <div className="flex items-center gap-2">
          <Logo size="md" />
        </div>
        <nav className="hidden md:flex gap-8">
          <Link 
            href="/#about" 
            className={`text-base font-medium transition-colors hover:text-primary`}
          >
            About
          </Link>
          <Link 
            href="/#features" 
            className={`text-base font-medium transition-colors hover:text-primary`}
          >
            Model
          </Link>
          <Link 
            href="/tracks" 
            className={`text-base font-medium transition-colors hover:text-primary ${activePage === "tracks" ? "text-primary" : ""}`}
          >
            Tracks
          </Link>

          <Link 
            href="/office-hours" 
            className={`text-base font-medium transition-colors hover:text-primary ${activePage === "office-hours" ? "text-primary" : ""}`}
          >
            Office Hours
          </Link>
          
          {/* <DropdownMenu>
            <DropdownMenuTrigger className={`text-base font-medium transition-colors hover:text-primary flex items-center gap-1 ${activePage === "team" ? "text-primary" : ""}`}>
              Community
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/community">Community</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/community/alumni">Alumni</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
         {/* <Button asChild size="lg" className="hidden md:flex">
          <Link href="/community/alumni">Meet the Alumni</Link>
          </Button> */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
} 
