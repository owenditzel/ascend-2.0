import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[]
  title?: string
  actions?: React.ReactNode
}

export function Header({ breadcrumbs, title, actions }: HeaderProps) {
  if (!breadcrumbs && !title && !actions) return null
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 mb-2">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#444]" />}
              {crumb.to ? (
                <Link to={crumb.to} className="text-sm text-[#666] hover:text-[#F5F1ED] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-sm text-[#999]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4">
          {title && <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F1ED]">{title}</h1>}
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      )}
    </div>
  )
}
