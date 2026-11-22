import { img } from '../lib/utils'

/** Placeholder brand — change name here and it updates everywhere. */
export const brand = {
  name: 'Aurelia Builders',
  short: 'Aurelia',
  tagline: 'Building spaces worth living in',
  phone: '+91 98765 43210',
  email: 'hello@aureliabuilders.com',
  address: '12, Cathedral Road, Chennai, Tamil Nadu 600086',
  hours: 'Mon – Sat · 9:00 – 18:30',
  credit: 'NeuLancers',
  whatsapp: '919876543210',
}

/** Site-wide feature switches. */
export const features = {
  /** Heroes pin in place and the next section (with its wave edge) slides up over them. Set to false to restore normal scrolling. */
  stackedHeroes: true,
  /** About page: refreshed middle sections (scroll-expand, mission & values, milestones). false = previous version. */
  aboutRefresh: true,
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

/** All imagery in one place — swap ids/urls to re-skin. */
export const I = {
  aerial: img('1480714378408-67cf0d13bc1b', 2200),
  skyline: img('1448630360428-65456885c650', 2000),
  tower: img('1486406146926-c627a92ad1ab', 2000),
  tower2: img('1545324418-cc1a3fa10c00', 1800),
  villa: img('1600585154340-be6161a56a0c', 2200),
  villa2: img('1613490493576-7fde63acd811', 2000),
  villa3: img('1600596542815-ffad4c1539a9', 1800),
  house: img('1564013799919-ab600027ffc6', 1800),
  house2: img('1512917774080-9991f1c4c750', 1800),
  house3: img('1582268611958-ebfd161ef9cf', 1800),
  lobby: img('1600607687939-ce8a6c25118c', 2200),
  living: img('1618221195710-dd6b41faaea6', 2200),
  living2: img('1600210492486-724fe5c67fb0', 1800),
  living3: img('1560448204-e02f11c3d0e2', 1800),
  kitchen: img('1556911220-e15b29be8c8f', 1800),
  bedroom: img('1505691938895-1758d7feb511', 2200),
  bedroom2: img('1618219908412-a29a1bb7b86e', 1800),
  suite: img('1600566753190-17f0baa2a6c3', 1800),
  suite2: img('1600047509807-ba8f99d2cdde', 1800),
  suite3: img('1600573472550-8090b5e0745e', 1800),
  hall: img('1502672260266-1c1ef2d93688', 1800),
  apt: img('1522708323590-d24dbb6b0267', 1800),
  apt2: img('1493809842364-78817add7ffb', 1800),
  site: img('1503387762-592deb58ef4e', 2000),
  site2: img('1541888946425-d81bb19240f5', 2000),
  site3: img('1504307651254-35680f356dfd', 2000),
  crew: img('1581094794329-c8112a89af12', 1800),
  detail: img('1600121848594-d8644e57abab', 1800),
  detail2: img('1600607688969-a5bfcd646154', 1800),
  detail3: img('1600585152220-90363fe7e115', 1800),
  detail4: img('1621905251189-08b45d6a269e', 1800),
  detail5: img('1589939705384-5185137a7f0f', 1800),
  detail6: img('1600566752355-35792bedcfea', 1800),
}

export const services = [
  {
    slug: 'residential-construction', title: 'Residential Construction', icon: '01',
    short: 'Signature villas, row houses and gated communities built to outlast generations.',
    hero: I.villa, gallery: [I.villa2, I.house, I.house2, I.villa3],
    intro: 'From foundation to final finish, we deliver homes where structural integrity meets quiet luxury. Every villa is engineered, detailed and handed over by a single accountable team.',
    features: ['Custom villas & bungalows', 'Gated community development', 'Row houses & duplexes', 'Structural & MEP engineering', 'Vastu & climate-responsive planning', '10-year structural warranty'],
    process: [['Brief & Site Study', 'We study your plot, lifestyle and budget.'], ['Design & Approvals', 'Concept, drawings and statutory sign-off.'], ['Build', 'Phased construction with weekly reporting.'], ['Handover', 'Snag-free inspection and warranty pack.']],
    stats: [['120+', 'Homes delivered'], ['18 mo', 'Avg. build time'], ['0', 'Delay disputes'], ['10 yr', 'Structural warranty']],
  },
  {
    slug: 'commercial-construction', title: 'Commercial Construction', icon: '02',
    short: 'Offices, retail and mixed-use towers delivered on time, on budget, fully compliant.',
    hero: I.tower, gallery: [I.tower2, I.skyline, I.aerial, I.site2],
    intro: 'We build workplaces and commercial landmarks that move fast without cutting corners — with BIM-led coordination and rigorous schedule control.',
    features: ['Corporate offices & campuses', 'Retail & showrooms', 'Mixed-use towers', 'Warehouses & industrial sheds', 'BIM coordination & clash detection', 'Fast-track delivery models'],
    process: [['Feasibility', 'Cost, schedule and risk modelling.'], ['Preconstruction', 'BIM, procurement and phasing.'], ['Construction', 'Safety-first, schedule-driven execution.'], ['Commissioning', 'Testing, certification and handover.']],
    stats: [['3.2M', 'Sq. ft built'], ['96%', 'On-time projects'], ['40+', 'Corporate clients'], ['0', 'Lost-time incidents']],
  },
  {
    slug: 'interior-design', title: 'Interior Design & Fit-out', icon: '03',
    short: 'Considered interiors — joinery, lighting, materials — crafted in our own workshop.',
    hero: I.living, gallery: [I.living2, I.bedroom, I.kitchen, I.living3],
    intro: 'Our in-house design studio and joinery workshop create interiors that feel collected, calm and unmistakably yours — with one team accountable for design and delivery.',
    features: ['Full-home turnkey interiors', 'Bespoke furniture & joinery', 'Lighting & automation design', 'Modular kitchens & wardrobes', 'Material & art curation', 'Hospitality & boutique fit-outs'],
    process: [['Discover', 'Mood, materials and spatial planning.'], ['Design', '3D visuals, walkthroughs and specification.'], ['Craft', 'Workshop production and site installation.'], ['Style', 'Final styling and white-glove handover.']],
    stats: [['300+', 'Interiors styled'], ['45 days', 'Typical fit-out'], ['4.9★', 'Client rating'], ['100%', 'In-house joinery']],
  },
  {
    slug: 'renovation-remodeling', title: 'Renovation & Remodeling', icon: '04',
    short: 'Breathe new life into existing spaces — structure, layout and finish — with minimal disruption.',
    hero: I.hall, gallery: [I.detail, I.detail2, I.detail3, I.apt],
    intro: 'Renovation is about respect — for the structure, the neighbours and your routine. We plan every phase to keep disruption low and surprises lower.',
    features: ['Structural strengthening', 'Layout reconfiguration', 'Kitchen & bath remodels', 'Facade & exterior refresh', 'Waterproofing & retrofit', 'Heritage restoration'],
    process: [['Survey', 'Condition survey and scope definition.'], ['Plan', 'Phased plan to protect your routine.'], ['Transform', 'Careful demolition and rebuild.'], ['Finish', 'Quality audit and clean handover.']],
    stats: [['200+', 'Renovations'], ['30%', 'Avg. value uplift'], ['14 days', 'Quick refresh'], ['2 yr', 'Finishing warranty']],
  },
  {
    slug: 'architecture-planning', title: 'Architecture & Planning', icon: '05',
    short: 'Concept to construction drawings — master planning, design and approvals under one roof.',
    hero: I.detail4, gallery: [I.house3, I.villa2, I.detail5, I.tower2],
    intro: 'Our architects design with the build in mind, so what is drawn is what is delivered — beautiful, buildable and budget-aware from the first sketch.',
    features: ['Concept & schematic design', '3D visualisation & VR walkthroughs', 'Statutory approvals', 'Master planning', 'Sustainable design & green rating', 'Value engineering'],
    process: [['Sketch', 'Ideas, massing and options.'], ['Develop', 'Detailed drawings and specs.'], ['Approve', 'Authority submissions handled.'], ['Deliver', 'Design-to-build coordination.']],
    stats: [['150+', 'Projects designed'], ['12', 'Architects'], ['100%', 'Approvals secured'], ['3D', 'Walkthrough on every design']],
  },
  {
    slug: 'project-management', title: 'Project Management', icon: '06',
    short: 'Independent PMC — cost control, quality assurance and transparent reporting for your project.',
    hero: I.site, gallery: [I.crew, I.site2, I.site3, I.skyline],
    intro: 'Building with another contractor? Our PMC team protects your interests with rigorous scheduling, audit and quality governance — with a live dashboard you can trust.',
    features: ['Schedule & cost control', 'Quality & safety audits', 'Vendor & contractor management', 'Live progress dashboards', 'Risk management', 'Third-party inspections'],
    process: [['Baseline', 'Scope, budget and schedule baseline.'], ['Govern', 'Weekly reviews and audits.'], ['Control', 'Change & cost management.'], ['Close', 'Handover and documentation.']],
    stats: [['₹900Cr', 'Value managed'], ['−12%', 'Avg. cost saved'], ['24/7', 'Live tracking'], ['100%', 'Audit coverage']],
  },
]

export const projects = [
  { title: 'The Emerald Residence', cat: 'Residential', loc: 'ECR, Chennai', year: '2025', area: '8,400 sq ft', img: I.villa },
  { title: 'Skyline Corporate Park', cat: 'Commercial', loc: 'OMR, Chennai', year: '2024', area: '1.2M sq ft', img: I.tower },
  { title: 'Linden Court Villas', cat: 'Residential', loc: 'Coimbatore', year: '2025', area: '42 villas', img: I.villa2 },
  { title: 'Marlowe Penthouse', cat: 'Interiors', loc: 'Adyar, Chennai', year: '2025', area: '5,200 sq ft', img: I.living },
  { title: 'Orchid Heights', cat: 'Residential', loc: 'Bengaluru', year: '2023', area: '220 apartments', img: I.tower2 },
  { title: 'Atelier Suite Hotel', cat: 'Interiors', loc: 'Pondicherry', year: '2024', area: '38 suites', img: I.bedroom },
  { title: 'Harbor Row Houses', cat: 'Residential', loc: 'Kochi', year: '2023', area: '18 homes', img: I.house },
  { title: 'Verde Retail Plaza', cat: 'Commercial', loc: 'Hyderabad', year: '2024', area: '260,000 sq ft', img: I.skyline },
  { title: 'Cedar Hill Renovation', cat: 'Renovation', loc: 'Ooty', year: '2022', area: '6,100 sq ft', img: I.house3 },
]

export const gallery = [
  { img: I.villa, label: 'Exterior' }, { img: I.lobby, label: 'Lobby' }, { img: I.living, label: 'Living' },
  { img: I.kitchen, label: 'Kitchen' }, { img: I.bedroom, label: 'Suite' }, { img: I.detail, label: 'Detailing' },
  { img: I.tower, label: 'Towers' }, { img: I.site, label: 'On Site' }, { img: I.aerial, label: 'Aerial' },
]

export const testimonials = [
  { name: 'Meera Krishnan', role: 'Homeowner · Emerald Residence', text: 'They treated our home like their own. The finish, the schedule, the communication — flawless from day one.', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Rahul Menon', role: 'Director · Skyline Corp Park', text: 'Delivered a 1.2M sq ft campus two weeks early. The BIM coordination alone saved us months.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Ananya Rao', role: 'Founder · Atelier Hotels', text: 'Interiors that guests photograph before they even unpack. Genuinely world-class craftsmanship.', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Vikram Shah', role: 'Investor · Orchid Heights', text: 'Transparent costs and a live dashboard. First contractor I never had to chase.', img: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { name: 'Priya Nair', role: 'Homeowner · Harbor Row', text: 'From approvals to handover, one team, zero stress. We moved in on the promised day.', img: 'https://randomuser.me/api/portraits/women/12.jpg' },
]

export const partners = ['Tata Steel', 'UltraTech', 'Asian Paints', 'Kohler', 'Schneider', 'Jaquar', 'Saint-Gobain', 'Havells', 'Kajaria', 'Godrej']

export const team = [
  { name: 'Arjun Raghavan', role: 'Founder & CEO', img: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { name: 'Divya Subramanian', role: 'Principal Architect', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Karthik Iyer', role: 'Head of Construction', img: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { name: 'Sneha Pillai', role: 'Interior Studio Lead', img: 'https://randomuser.me/api/portraits/women/33.jpg' },
]

export const faqs: { cat: string; q: string; a: string }[] = [
  { cat: 'Process', q: 'How long does a typical villa take to build?', a: 'Most signature villas are delivered in 14–20 months from approvals, depending on scale and finish level. We commit to a dated schedule in your contract.' },
  { cat: 'Process', q: 'Do you handle design and approvals too?', a: 'Yes. Our architecture studio manages concept, drawings, statutory approvals and design-to-build coordination, so there is one accountable team.' },
  { cat: 'Process', q: 'Can I visit my site during construction?', a: 'Always. You get weekly photo and video updates, a live progress dashboard and open site access by appointment.' },
  { cat: 'Pricing', q: 'How do you manage cost certainty?', a: 'We lock a detailed BOQ before construction, share a live cost dashboard and route every change through a written approval.' },
  { cat: 'Pricing', q: 'What are your payment terms?', a: 'Milestone-linked payments tied to verified progress — never advance-heavy. The schedule is fixed in the contract.' },
  { cat: 'Pricing', q: 'Is there a charge for the first consultation?', a: 'No. The first consultation, site visit and a preliminary estimate are free of charge.' },
  { cat: 'Coverage', q: 'Which cities do you operate in?', a: 'We currently build across Tamil Nadu, Karnataka, Kerala and Telangana, and take select projects elsewhere.' },
  { cat: 'Coverage', q: 'What warranty do you provide?', a: 'A 10-year structural warranty and 2-year finishing warranty, with a dedicated post-handover service desk.' },
]

export const story = [
  { img: I.aerial, tag: 'Chapter 01', title: 'It begins from above', text: 'Every landmark starts as a plot of possibility. We read the land, the light and the skyline.' },
  { img: I.tower, tag: 'Chapter 02', title: 'Structures that stand tall', text: 'Engineered towers and campuses, delivered with precision across four states.' },
  { img: I.villa, tag: 'Chapter 03', title: 'Arrive home', text: 'Signature villas where architecture meets landscape — and every line is deliberate.' },
  { img: I.lobby, tag: 'Chapter 04', title: 'Step inside', text: 'Lobbies and halls that set the tone — warm stone, soft light, quiet grandeur.' },
  { img: I.living, tag: 'Chapter 05', title: 'Rooms that feel collected', text: 'Bespoke joinery, curated materials and lighting designed with our own studio.' },
  { img: I.bedroom, tag: 'Chapter 06', title: 'Rest, perfected', text: 'Suites crafted for stillness. This is where every detail finally disappears.' },
]
