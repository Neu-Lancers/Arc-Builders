import { CEOMessage, CTA, FAQ, PageHero, Panel, Partners, ScrollExpand, StatsBand, TeamGrid } from '../components/sections/Blocks'
import { FixedBg, HorizontalCards, OrbitImages } from '../components/sections/Scroller'
import { MasonryGallery } from '../components/sections/Gallery'
import { Reveal, SectionHead } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/Cards'
import { I } from '../data/site'

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

      <Panel>
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <SectionHead eyebrow="Our story" title="From one villa to" ribbon="five hundred projects." text="What started as a small team obsessed with finishing details has grown into a full-service builder and design studio. Our promise has not changed: one accountable team, honest costs and craftsmanship you can feel." />
          <Reveal x={30}><OrbitImages images={[I.villa, I.tower, I.living, I.bedroom, I.kitchen, I.site, I.hall, I.detail]} center={<p className="h-display text-2xl leading-none">Our<br />Story</p>} /></Reveal>
        </div>
      </Panel>

      <StatsBand stats={[['15+', 'Years'], ['500+', 'Projects'], ['250', 'Crew & staff'], ['4', 'States served']]} />

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
    </>
  )
}
