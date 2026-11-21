import { Link, useParams } from 'react-router-dom'
import { CTA, FAQ, PageHero, Panel, StatsBand, Testimonials } from '../components/sections/Blocks'
import { FixedBg } from '../components/sections/Scroller'
import { GalleryAccordion } from '../components/sections/Gallery'
import { Reveal, SectionHead } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/Cards'
import { services } from '../data/site'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = services.find((x) => x.slug === slug)
  if (!s) return <div className="grid h-screen place-items-center"><Link to="/services" className="btn btn-primary">Back to services</Link></div>
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3)
  return (
    <>
      <PageHero eyebrow={`Service ${s.icon}`} title={s.title} text={s.short} img={s.hero} />

      <Panel>
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHead eyebrow="Overview" title="Built around" ribbon="your brief." text={s.intro} />
            <Reveal delay={0.2}><Link to="/contact" className="btn btn-primary mt-6">Discuss this service →</Link></Reveal>
          </div>
          <div className="grid content-start gap-3 sm:grid-cols-2 md:col-span-7">
            {s.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.05}>
                <SpotlightCard className="glass-light h-full !rounded-2xl"><div className="flex items-start gap-3 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest text-xs text-cream">{i + 1}</span><p className="text-sm font-semibold">{f}</p></div></SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      <FixedBg src={s.gallery[0]} className="py-14 md:py-20">
        <div className="container-x">
          <SectionHead light eyebrow="How it works" title="Our process" ribbon="step by step." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {s.process.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="glass h-full rounded-2xl p-5 text-cream"><span className="h-display text-4xl text-gold">0{i + 1}</span><h3 className="h-display mt-2 text-xl">{t}</h3><p className="mt-1.5 text-sm text-cream/80">{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </FixedBg>

      <StatsBand top="var(--color-ink)" stats={s.stats} />

      <Panel>
        <div className="container-x">
          <SectionHead center eyebrow="Gallery" title="Work from this" ribbon="service." />
          <div className="mt-8"><GalleryAccordion items={[s.hero, ...s.gallery].map((img, i) => ({ img, label: ['Overview', 'Detail', 'Exterior', 'Interior', 'Finish'][i] }))} /></div>
        </div>
      </Panel>

      <Panel alt><div className="container-x"><SectionHead center eyebrow="Reviews" title="What clients" ribbon="say." /><div className="mt-8"><Testimonials /></div></div></Panel>

      <Panel>
        <div className="container-x">
          <SectionHead center eyebrow="FAQ" title="Common" ribbon="questions." />
          <div className="mt-8"><FAQ /></div>
          <h3 className="h-display mt-14 text-center text-2xl text-accent md:text-3xl">Explore other services</h3>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/services/${o.slug}`} className="group relative block overflow-hidden rounded-2xl">
                <img src={o.hero} alt={o.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent" />
                <p className="h-display absolute bottom-3 left-4 text-xl text-cream">{o.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </Panel>
      <CTA />
    </>
  )
}
