import { Link } from 'react-router-dom'
import { I } from '../data/site'

export default function NotFound() {
  return (
    <section data-hero className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-ink px-4 text-center text-cream">
      <img src={I.aerial} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="relative">
        <p className="eyebrow text-gold">— Error 404</p>
        <h1 className="h-display mt-3 text-[clamp(4rem,14vw,9rem)]">Lost the plot?</h1>
        <p className="mx-auto mt-2 max-w-md text-cream/80">The page you are looking for has moved or never existed. Let us get you back on site.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-light">Back to home</Link>
          <Link to="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  )
}
