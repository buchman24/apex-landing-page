import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/components/ui/logo"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              Building Israel&apos;s AI Fortress: From frontier tech to real-world traction - APEX gets you building.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tracks#architect-track" className="text-sm text-muted-foreground hover:text-foreground">
                  Architect Track
                </Link>
              </li>
              <li>
                <Link href="/tracks#founder-track" className="text-sm text-muted-foreground hover:text-foreground">
                  Founder Track
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">
                  Model
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} APEX. All rights reserved.
          </p>

          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Powered by</span>
            <Image
              src="/communityO.png"
              alt="Community O"
              width={80}
              height={20}
              className="opacity-80"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
