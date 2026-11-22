import { CEOMessage, CTA, FAQ, PageHero, Panel, Partners, ScrollExpand, StatsBand, TeamGrid } from '../components/sections/Blocks'
import { FixedBg, HorizontalCards, OrbitImages } from '../components/sections/Scroller'
import { MasonryGallery } from '../components/sections/Gallery'
import { Reveal, SectionHead } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/Cards'
import { I, features } from '../data/site'
import StackCover from '../components/ui/StackCover'

const values = [
  ['Integrity', 'We say what we will do, and do what we say — in writing.'],
  ['Craftsmanship', 'Details are not extras. They are the work.'],
  ['Safety', 'Every person goes home safe, every day, on every site.'],
  ['Sustainability', 'Efficient design and responsibly sourced materials.'],
]
const timeline = [
  ['2008', 'Founded', 'Started with a single villa project and a team of eight.'],
  ['2013', 'Interior studio', 'Launched our in-house design and joinery workshop.'],
  ['2018', 'Commercial wing', 'Delivered our first 500,000 sq ft campus.'],
  ['2022', 'Four states', 'Expanded across Tamil Nadu, Karnataka, Kerala and Telangana.'],
  ['2025', '500+ projects', 'Crossed 3.2 million sq ft of built space.'],
]

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="We build with" ribbon="care, craft and conviction." text="A construction and design company on a mission to make building a calm, transparent and beautiful experience." img={I.crew} />

      <StackCover>

      <Panel>
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <SectionHead eyebrow="Our story" title="From one villa to" ribbon="five hundred projects." text="What started as a small team obsessed with finishing details has grown into a full-service builder and design studio. Our promise has not changed: one accountable team, honest costs and craftsmanship you can feel." />
          <Reveal x={30}><OrbitImages images={[I.villa, I.tower, I.living, I.bedroom, I.kitchen, I.site, I.hall, I.detail]} center={<p className="h-display text-2xl leading-none">Our<br />Story</p>} /></Reveal>
        </div>
      </Panel>

      <StatsBand stats={[['15+', 'Years'], ['500+', 'Projects'], ['250', 'Crew & staff'], ['4', 'States served']]} />

      {features.aboutRefresh ? (
        <>
      <ScrollExpand img={I.villa2} caption="Every home is a promise kept." chips={['Est. 2008', '500+ homes & towers', '10-year warranty']} />

      <Panel>
        <div className="container-x">
          <SectionHead eyebrow="Leadership" title="Meet the" ribbon="team." text="Architects, engineers and craftspeople — led by people who still walk the site every week." />
          <div className="mt-8"><TeamGrid /></div>
        </div>
      </Panel>

      <HorizontalCards bg={I.lobby} eyebrow="Our journey" title="Milestones"
        overlay="bg-gradient-to-b from-forest-deep/90 via-forest/70 to-forest-deep/95"
        items={timeline.map(([y, t, d], i) => ({ title: t, sub: d, meta: y, img: [I.house, I.living, I.tower, I.aerial, I.villa][i] }))} />

      <CEOMessage light />

      <FixedBg src={I.living2} overlay="bg-gradient-to-br from-forest-deep/95 via-forest/80 to-forest-deep/90" className="py-16 md:py-24">
        <div className="container-x">
          <SectionHead light eyebrow="What drives us" title="Purpose, promise" ribbon="and the way we work." />
          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="glass relative h-full overflow-hidden rounded-3xl p-6 text-cream md:p-9">
                <div className="grid gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-cream/15">
                  <div className="md:pr-8">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/20 text-gold"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg></span>
                    <p className="eyebrow mt-4 text-gold">Mission</p>
                    <h3 className="h-display mt-2 text-2xl md:text-3xl">Make building predictable and beautiful.</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/80">Deliver spaces that perform for decades, through transparent process and exceptional craft.</p>
                  </div>
                  <div className="md:pl-8">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/20 text-gold"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg></span>
                    <p className="eyebrow mt-4 text-gold">Vision</p>
                    <h3 className="h-display mt-2 text-2xl md:text-3xl">The most trusted builder in South India.</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/80">Setting the benchmark for quality, safety and client experience in every city we serve.</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 lg:col-span-5">
              {values.map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.06}>
                  <SpotlightCard dark className="glass h-full !rounded-2xl text-cream">
                    <div className="p-4 md:p-5">
                      <p className="h-display text-4xl leading-none text-gold/90">0{i + 1}</p>
                      <h4 className="h-display mt-3 text-lg">{t}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-cream/75">{d}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </FixedBg>

        </>
      ) : (
        <>
      <ScrollExpand img={I.villa2} caption="Every home is a promise kept." />

      <FixedBg src={I.tower} className="py-14 md:py-20">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal><SpotlightCard dark className="glass h-full !rounded-2xl text-cream"><div className="p-6"><p className="eyebrow text-gold">Mission</p><h3 className="h-display mt-3 text-2xl md:text-3xl">Make building predictable and beautiful.</h3><p className="mt-3 text-sm text-cream/80">Deliver spaces that perform for decades, through transparent process and exceptional craft.</p></div></SpotlightCard></Reveal>
            <Reveal delay={0.1}><SpotlightCard dark className="glass h-full !rounded-2xl text-cream"><div className="p-6"><p className="eyebrow text-gold">Vision</p><h3 className="h-display mt-3 text-2xl md:text-3xl">The most trusted builder in South India.</h3><p className="mt-3 text-sm text-cream/80">Setting the benchmark for quality, safety and client experience in every city we serve.</p></div></SpotlightCard></Reveal>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}><div className="glass h-full rounded-2xl p-5 text-cream"><p className="h-display text-3xl text-gold">0{i + 1}</p><h4 className="h-display mt-2 text-lg">{t}</h4><p className="mt-1.5 text-xs text-cream/80 md:text-sm">{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </FixedBg>

      <HorizontalCards bg={I.aerial} eyebrow="Our journey" title="Milestones"
        items={timeline.map(([y, t, d], i) => ({ title: `${y} — ${t}`, sub: d, meta: `Step ${i + 1}`, img: [I.site, I.living, I.tower, I.skyline, I.villa][i] }))} />


      <CEOMessage top="var(--color-ink)" />

      <Panel>
        <div className="container-x">
          <SectionHead eyebrow="Leadership" title="Meet the" ribbon="team." text="Architects, engineers and craftspeople — led by people who still walk the site every week." />
          <div className="mt-8"><TeamGrid /></div>
        </div>
      </Panel>

        </>
      )}

      <Partners />

      <Panel alt>
        <div className="container-x">
          <SectionHead center eyebrow="Life on site" title="Our work," ribbon="in pictures." />
          <div className="mt-8">
            <MasonryGallery items={[
              { img: I.site, label: 'Foundations', cat: 'Site' }, { img: I.crew, label: 'Our crew', cat: 'Site' }, { img: I.site2, label: 'Structure', cat: 'Site' },
              { img: I.villa, label: 'Exterior', cat: 'Finished' }, { img: I.living, label: 'Living', cat: 'Finished' }, { img: I.kitchen, label: 'Kitchen', cat: 'Finished' },
            ]} />
          </div>
        </div>
      </Panel>

      <Panel>
        <div className="container-x"><SectionHead center eyebrow="FAQ" title="Questions," ribbon="answered." /><div className="mt-8"><FAQ /></div></div>
      </Panel>
      <CTA />
      </StackCover>
    </>
  )
}
