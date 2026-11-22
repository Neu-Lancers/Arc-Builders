import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CTA, PageHero, Panel, Partners } from '../components/sections/Blocks'
import { GalleryAccordion, GridMotion, MasonryGallery } from '../components/sections/Gallery'
import { Reveal, SectionHead } from '../components/ui/Reveal'
import { GlareHover, TiltedCard } from '../components/ui/Cards'
import { WaveBand } from '../components/ui/Wave'
import { cn } from '../lib/utils'
import { I, gallery, projects } from '../data/site'
import StackCover from '../components/ui/StackCover'

export default function Projects() {
  const cats = ['All', ...Array.from(new Set(projects.map((p) => p.cat)))]
  const [cat, setCat] = useState('All')
  const list = projects.filter((p) => cat === 'All' || p.cat === cat)
  return (
    <>
      <PageHero eyebrow="Projects" title="A portfolio of" ribbon="places people love." text="Villas, towers, hotels and homes — delivered across four states." img={I.skyline} />

      <StackCover>
      <Panel>
        <div className="container-x">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {cats.map((c) => <button key={c} onClick={() => setCat(c)} className={cn('rounded-full px-4 py-1.5 text-xs font-semibold transition', cat === c ? 'bg-forest text-cream' : 'glass-light')}>{c}</button>)}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <TiltedCard max={5}>
                  <GlareHover className="rounded-2xl">
                    <div className="relative aspect-[4/4.4] overflow-hidden rounded-2xl">
                      <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-bold text-forest">{p.cat}</span>
                      <div className="glass absolute inset-x-2.5 bottom-2.5 rounded-xl p-3.5 text-cream">
                        <h3 className="h-display text-lg">{p.title}</h3>
                        <p className="mt-0.5 text-xs text-cream/80">{p.loc} · {p.area} · {p.year}</p>
                      </div>
                    </div>
                  </GlareHover>
                </TiltedCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      <WaveBand className="overflow-hidden !py-16 md:!py-24">
        <GridMotion images={gallery.map((g) => g.img)} />
        <div className="absolute inset-0 bg-forest-deep/80" />
        <div className="container-x relative text-center">
          <SectionHead light center eyebrow="Immersive" title="Every angle," ribbon="every detail." />
          <Link to="/contact" className="btn btn-light mt-6">Start yours →</Link>
        </div>
      </WaveBand>

      <Panel>
        <div className="container-x">
          <SectionHead center eyebrow="Spaces" title="Rooms that" ribbon="invite you in." />
          <div className="mt-8"><GalleryAccordion items={gallery} /></div>
        </div>
      </Panel>

      <Panel alt>
        <div className="container-x"><SectionHead center eyebrow="Gallery" title="The full" ribbon="picture." /><div className="mt-8">
          <MasonryGallery items={[
            ...gallery.map((g, i) => ({ ...g, cat: ['Exterior', 'Interior', 'Interior', 'Interior', 'Interior', 'Interior', 'Exterior', 'Site', 'Exterior'][i] })),
            { img: I.suite, label: 'Suite', cat: 'Interior' }, { img: I.house, label: 'Row house', cat: 'Exterior' }, { img: I.crew, label: 'Crew', cat: 'Site' },
          ]} />
        </div></div>
      </Panel>
      <Partners />
      <CTA />
      </StackCover>
    </>
  )
}
