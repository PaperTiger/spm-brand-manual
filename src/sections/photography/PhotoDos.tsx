import ExampleGrid, { type ExampleItem } from '../../components/ui/ExampleGrid'
import brand from '../../brand.config'

// Captions come straight from the stylesheet's photography panel.
const items: ExampleItem[] = [
  {
    src: 'bright-light.webp', caption: 'Include bright photography.',
    alt: 'A plated chicken and roast squash dish shot in bright, even daylight',
  },
  { src: 'team-candid.webp',       caption: 'Capture authentic and warm expressions.' },
  { src: 'portrait-headshot.webp', caption: 'Mix in warm images of team members.' },
  {
    src: 'consistent-grain.webp', caption: 'Use consistent lighting and grain effect.',
    alt: 'Four dogs on turf, all carrying the same warm tone and grain',
  },
  {
    src: 'grading-do-dont.webp',
    caption: 'Use warm / neutral colour toning consistently. Avoid a blue or yellow overcast.',
    alt: 'The same photograph twice: warm neutral grading approved above, blue-cast grading rejected below',
  },
]

export default function PhotoDos() {
  // Same gate the motion, applications, and pattern sections use: a tile whose
  // file is not in the config inventory is dropped rather than rendered broken.
  const inventory = new Set(brand.images.photography)
  const available = items.filter(i => inventory.has(i.src))

  return (
    <div className="page">
      <div className="section-label">Photography</div>
      <h2 className="section-title">Do's and don'ts</h2>
      <p className="section-intro">
        SPM imagery should feel real and human: candid teams at work, real environments, and
        clean product shots over staged stock. Photography earns trust by showing how the work
        actually gets done.
      </p>

      <ExampleGrid items={available} dir="photography" minColumn={280} aspect="1 / 1" fit="cover" />
    </div>
  )
}
