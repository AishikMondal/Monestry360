import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
  
  const variantClasses = {
    default: "border-transparent bg-gray-900 text-white",
    secondary: "border-transparent bg-gray-100 text-gray-900", 
    destructive: "border-transparent bg-red-500 text-white",
    outline: "border-gray-300 text-gray-900"
  }

  const allClasses = [baseClasses, variantClasses[variant], className].filter(Boolean).join(' ')

  return (
    <div className={allClasses} {...props}>
      {children}
    </div>
  )
}
