import { Link, useParams } from 'react-router-dom'
import { CTA, FAQ, PageHero, Panel, StatsBand, Testimonials } from '../components/sections/Blocks'
import { FixedBg } from '../components/sections/Scroller'
import { GalleryAccordion } from '../components/sections/Gallery'
import { Reveal, SectionHead } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/Cards'
import { services } from '../data/site'
import StackCover from '../components/ui/StackCover'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = services.find((x) => x.slug === slug)
  if (!s) return <div className="grid h-screen place-items-center"><Link to="/services" className="btn btn-primary">Back to services</Link></div>
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3)
  return (
    <>
      <PageHero eyebrow={`Service ${s.icon}`} title={s.title} text={s.short} img={s.hero} />

      <StackCover>

      <Panel>
        <div className="container-x grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* left: story + proof image */}
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Overview" title="Built around" ribbon="your brief." text={s.intro} />
            <Reveal delay={0.15}>
              <div className="relative mt-7 overflow-hidden rounded-2xl">
                <img src={s.gallery[0]} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
                <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-cream">
                  <span className="text-xs font-semibold leading-snug">One accountable team, from the first sketch to the final handover.</span>
                  <Link to="/contact" className="btn btn-light !px-4 !py-2 text-xs">Discuss →</Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* right: what is included */}
          <div className="flex flex-col lg:col-span-7 lg:self-stretch">
            <Reveal>
              <div className="mb-4 flex items-center gap-3">
                <p className="eyebrow text-accent">What is included</p>
                <span className="h-px flex-1 bg-line" />
                <span className="text-xs font-semibold text-fg/60">{s.features.length} essentials</span>
              </div>
            </Reveal>
            <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-rows-3">
              {s.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.05} className="h-full">
                  <SpotlightCard className="glass-light h-full !rounded-2xl">
                    <div className="flex h-full min-h-[84px] items-center gap-4 p-4">
                      <span className="h-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-forest to-forest-deep text-lg text-gold shadow-md">{String(i + 1).padStart(2, '0')}</span>
                      <p className="flex-1 text-[0.95rem] font-semibold leading-snug">{f}</p>
                      <span className="text-accent opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
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
      </StackCover>
    </>
  )
}
