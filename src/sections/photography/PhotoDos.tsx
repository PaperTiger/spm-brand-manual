import ExampleGrid, { type ExampleItem } from '../../components/ui/ExampleGrid'

// Captions come straight from the stylesheet's photography panel.
const items: ExampleItem[] = [
  { src: 'client-philz-coffee.webp',   caption: 'Include bright photography.' },
  { src: 'team-candid.webp',           caption: 'Capture authentic and warm expressions.' },
  { src: 'portrait-headshot.webp',     caption: 'Mix in warm images of team members.' },
  { src: 'food-dessert-honeydew.webp', caption: 'Use consistent lighting and grain effect.' },
  {
    src: 'grading-do-dont.webp',
    caption: 'Use warm / neutral colour toning consistently. Avoid a blue or yellow overcast.',
    alt: 'The same photograph twice: warm neutral grading approved above, blue-cast grading rejected below',
  },
]

export default function PhotoDos() {
  return (
    <div className="page">
      <div className="section-label">Photography</div>
      <h2 className="section-title">Do's and don'ts</h2>
      <p className="section-intro">
        SPM imagery should feel real and human: candid teams at work, real environments, and
        clean product shots over staged stock. Photography earns trust by showing how the work
        actually gets done.
      </p>

      <ExampleGrid items={items} dir="photography" minColumn={280} aspect="1 / 1" fit="cover" />
    </div>
  )
}
