import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  linkClassName?: string;
}

export function Logo({
  size = "md",
  showText = true,
  className = "",
  linkClassName = ""
}: LogoProps) {
  const logoSizes = {
    sm: { width: 20, height: 20, className: "h-5 w-5" },
    md: { width: 32, height: 32, className: "h-8 w-8" },
    lg: { width: 40, height: 40, className: "h-10 w-10" }
  }
  
  const { width, height, className: sizeClassName } = logoSizes[size];
  
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className} ${linkClassName}`}>
      <Image
        src="/logo.svg"
        alt="APEX Logo"
        width={width} 
        height={height} 
        className={`${sizeClassName} object-contain`}
      />
      {showText && <span className={`font-bold font-['Poppins'] tracking-wide ${size === "lg" ? "text-3xl" : size === "md" ? "text-2xl" : "text-base"}`}>APEX</span>}
    </Link>
  )
} 