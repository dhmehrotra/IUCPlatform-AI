import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t py-6 px-8 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <span>© 2025 IUC Platform. Partner-supported. All rights reserved.</span>
        <Image src="/images/iuc-logo.png" alt="IUC Platform Logo" width={80} height={24} className="h-5 w-auto" />
      </div>
    </footer>
  )
}
