import { Link } from 'react-router-dom'
import HeroStory from '../components/sections/HeroStory'
import { RibbonBand } from '../components/ui/Marquee'
import { CEOMessage, CTA, Panel, Partners, StatsBand, TeamGrid, Testimonials } from '../components/sections/Blocks'
import { ArcCarousel, FixedBg, HorizontalCards, OrbitImages, ScrollStack } from '../components/sections/Scroller'
import { Reveal, SectionHead } from '../components/ui/Reveal'
import { SpotlightCard } from '../components/ui/Cards'
import { I, gallery, projects, services } from '../data/site'
import StackCover from '../components/ui/StackCover'

const why = [
  ['Single accountability', 'Design, build and finish under one contract and one lead.'],
  ['Fixed-cost transparency', 'Detailed BOQ and a live cost dashboard — no surprises.'],
  ['Craft in-house', 'Our own joinery workshop and trained site crews.'],
  ['10-year warranty', 'Structural cover and a post-handover service desk.'],
]

export default function Home() {
  return (
    <>
      <HeroStory />

      <StackCover pull>

      {/* 1 · Who we are */}
      <Panel className="!pb-6">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Who we are" title="Craft, engineering and design —" ribbon="under one roof." text="For over 15 years we have delivered villas, towers and interiors across South India. Every project is led by one accountable team, from the first sketch to the final styling." />
            <Reveal delay={0.2}><Link to="/about" className="btn btn-primary mt-6">Our story →</Link></Reveal>
          </div>
          <Reveal x={30}>
            <OrbitImages
              images={[I.villa, I.tower, I.living, I.bedroom, I.kitchen, I.site, I.hall, I.detail]}
              center={<div><p className="h-display text-2xl leading-none md:text-3xl">Since<br />2008</p><p className="eyebrow mt-1.5 !text-[0.58rem] text-gold">Built to last</p></div>}
            />
          </Reveal>
        </div>
      </Panel>
      <div className="relative z-10 overflow-hidden bg-page pb-8 pt-4"><RibbonBand words={['Residential', 'Commercial', 'Interiors', 'Renovation', 'Architecture', 'Project Management']} /></div>

      {/* 2 · Proof */}
      <StatsBand title="Our track record" stats={[['15+', 'Years of craft'], ['500+', 'Projects delivered'], ['3.2M', 'Sq. ft built'], ['96%', 'On-time delivery']]} />

      {/* 3 · Services */}
      <Panel>
        <div className="container-x">
          <SectionHead eyebrow="What we do" title="Every discipline," ribbon="one standard of excellence." center />
          <div className="mt-10">
            <ScrollStack items={services.slice(0, 4).map((s) => ({ title: s.title, text: s.short, img: s.hero, to: `/services/${s.slug}`, tag: `Service ${s.icon}`, list: s.features.slice(0, 3) }))} />
          </div>
        </div>
      </Panel>

      {/* 4 · Work — pinned bg, cards glide right → left */}
      <HorizontalCards
        bg={I.skyline} eyebrow="Selected work" title="Projects in motion"
        items={projects.slice(0, 7).map((p) => ({ title: p.title, sub: `${p.loc} · ${p.area}`, meta: `${p.cat} · ${p.year}`, img: p.img, to: '/projects' }))}
      />

      {/* 5 · Gallery on the arc */}
      <Panel className="overflow-hidden !pb-8">
        <div className="container-x"><SectionHead center eyebrow="Gallery" title="Spaces we have" ribbon="brought to life." /></div>
        <div className="mt-6">
          <ArcCarousel
            images={gallery}
            title="Seen. Loved. Lived in."
            text="Hover a frame to pause the run and take a closer look."
            cta={<Link to="/projects" className="btn btn-primary">Open full gallery →</Link>}
          />
        </div>
      </Panel>

      {/* 6 · Why us — fixed bg, glass cards */}
      <FixedBg src={I.lobby} className="py-14 md:py-20">
        <div className="container-x">
          <SectionHead light eyebrow="Why choose us" title="A different way" ribbon="to build." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <SpotlightCard dark className="glass h-full !rounded-2xl text-cream">
                  <div className="p-5">
                    <p className="h-display text-3xl text-gold">0{i + 1}</p>
                    <h3 className="h-display mt-3 text-lg md:text-xl">{t}</h3>
                    <p className="mt-2 text-sm text-cream/80">{d}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </FixedBg>

      {/* 7 · Voices */}
      <Panel alt>
        <div className="container-x">
          <SectionHead center eyebrow="Testimonials" title="Kind words from" ribbon="people we have built for." />
          <div className="mt-8"><Testimonials /></div>
        </div>
      </Panel>

      <CEOMessage top="var(--page-2)" />
      <Partners />

      <Panel className="!pt-4">
        <div className="container-x">
          <SectionHead eyebrow="The team" title="The people" ribbon="behind the work." />
          <div className="mt-8"><TeamGrid /></div>
        </div>
      </Panel>
      <CTA />
      </StackCover>
    </>
  )
}
