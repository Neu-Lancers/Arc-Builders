import { Link } from 'react-router-dom'
import { CTA, FAQ, PageHero, Panel, Partners, ServiceCard, StatsBand } from '../components/sections/Blocks'
import { ArcCarousel, FixedBg, HorizontalCards } from '../components/sections/Scroller'
import { Reveal, SectionHead } from '../components/ui/Reveal'
import { I, services } from '../data/site'
import StackCover from '../components/ui/StackCover'

const steps = [['Consult', 'We listen, visit the site and understand your goals.'], ['Design', 'Concept, drawings, 3D walkthroughs and approvals.'], ['Build', 'Phased execution with weekly reporting.'], ['Handover', 'Quality audit, snag-free delivery and warranty.']]

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="End-to-end" ribbon="design & construction." text="Six dedicated disciplines — each with its own specialists, process and portfolio." img={I.tower2} />

      <StackCover>

      <Panel>
        <div className="container-x">
          <SectionHead center eyebrow="What we offer" title="Choose your" ribbon="starting point." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}</div>
        </div>
      </Panel>

      <FixedBg src={I.living} className="py-14 md:py-20">
        <div className="container-x">
          <SectionHead light eyebrow="Our process" title="Simple, clear," ribbon="in four steps." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="glass h-full rounded-2xl p-5 text-cream">
                  <span className="h-display text-4xl text-gold">0{i + 1}</span>
                  <h3 className="h-display mt-2 text-xl">{t}</h3>
                  <p className="mt-1.5 text-sm text-cream/80">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </FixedBg>

      <StatsBand top="var(--color-ink)" bottom="var(--color-ink)" stats={[['500+', 'Projects delivered'], ['96%', 'On-time delivery'], ['4.9★', 'Client rating'], ['10 yr', 'Structural warranty']]} />

      <HorizontalCards bg={I.skyline} eyebrow="Explore" title="Every service, up close"
        items={services.map((s) => ({ title: s.title, sub: s.short, meta: `Service ${s.icon}`, img: s.hero, to: `/services/${s.slug}` }))} />

      <Panel className="overflow-hidden !pb-8">
        <div className="container-x"><SectionHead center eyebrow="Portfolio" title="Recent" ribbon="spaces." /></div>
        <div className="mt-6">
          <ArcCarousel
            images={[{ img: I.villa, label: 'Residential' }, { img: I.tower, label: 'Commercial' }, { img: I.living, label: 'Interiors' }, { img: I.hall, label: 'Renovation' }, { img: I.detail4, label: 'Architecture' }, { img: I.site, label: 'Management' }, { img: I.kitchen, label: 'Kitchens' }, { img: I.bedroom, label: 'Suites' }]}
            title="One team, every space."
            text="From foundations to finishing touches."
            cta={<Link to="/contact" className="btn btn-primary">Discuss your project →</Link>}
          />
        </div>
      </Panel>

      <Partners />
      <Panel alt><div className="container-x"><SectionHead center eyebrow="FAQ" title="Good" ribbon="to know." /><div className="mt-8"><FAQ /></div></div></Panel>
      <CTA top="var(--page-2)" />
      </StackCover>
    </>
  )
}
