import { ReactNode } from 'react'

export default function OnboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {children}
    </div>
  )
}
