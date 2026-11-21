import { Link, useLocation } from 'react-router-dom'
import { services } from '../../data/site'

const labels: Record<string, string> = { about: 'About Us', services: 'Services', projects: 'Projects', contact: 'Contact Us' }

/** Pill breadcrumb: home icon › section › current page. */
export default function Breadcrumbs({ last }: { last?: string }) {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)
  const crumbs = parts.map((p, i) => ({
    to: '/' + parts.slice(0, i + 1).join('/'),
    label: i === parts.length - 1 && last ? last : labels[p] ?? services.find((s) => s.slug === p)?.title ?? p,
  }))
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-500 shadow-lg shadow-black/10 backdrop-blur dark:border-white/10 dark:bg-ink/70 dark:text-cream/70">
        <li>
          <Link to="/" aria-label="Home" className="grid place-items-center text-slate-500 transition hover:text-forest dark:text-cream/70 dark:hover:text-gold">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3 11.5L12 4l9 7.5V21h-6v-6H9v6H3z" /></svg>
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.to} className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-50" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="text-forest dark:text-gold">{c.label}</span>
            ) : (
              <Link to={c.to} className="transition hover:text-forest dark:hover:text-gold">{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
