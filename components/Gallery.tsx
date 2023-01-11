import works from '../_data/works.json' assert { type: "json" }
import { Cart } from './Cart.js'

const Gallery = () => (
  <>
    <h1>Gallery</h1>
    <Cart total={22} />
    {works.map((work) => (
      <div>
        <h3>{work.title}</h3>
        {work.pictures.map((picture) => (
          <img src={picture.src} alt={picture.alt}></img>
        ))}
      </div>
    ))}
  </>
)

export default Gallery
