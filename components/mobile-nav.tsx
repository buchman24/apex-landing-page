"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { ThemeToggle } from "@/components/theme-toggle"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden p-0 w-10 h-10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <VisuallyHidden>
          <SheetTitle>Mobile Navigation Menu</SheetTitle>
        </VisuallyHidden>
        <div className="flex items-center justify-between border-b pb-4">
          <Logo size="sm" linkClassName="ml-1" />
        </div>
        <nav className="flex flex-col gap-4 mt-6">
          <Link
            href="/#about"
            className="text-base font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/#features"
            className="text-base font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Model
          </Link>
          <Link
            href="/tracks"
            className="text-base font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Tracks
          </Link>
          <Collapsible open={communityOpen} onOpenChange={setCommunityOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium transition-colors hover:text-primary">
              Community
              {communityOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-2">
              <Link
                href="/community"
                className="block text-sm transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Community
              </Link>
              <Link
                href="/community/alumni"
                className="block text-sm transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Alumni
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </nav>
        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm">Toggle Theme</span>
            <ThemeToggle />
          </div>
          {/* <Button asChild className="w-full">
            <Link href="/apply" onClick={() => setOpen(false)}>
              Apply Now
            </Link>
          </Button> */}
          <Button asChild className="w-full">
            <Link href="/community/alumni" onClick={() => setOpen(false)}>
              Meet the Alumni
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

