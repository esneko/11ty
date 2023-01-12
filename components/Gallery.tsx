import works from '../_data/works.json' assert { type: 'json' }
import { Cart } from './Cart.js'

const Gallery = () => (
  <>
    <h1>Gallery</h1>
    <Cart total={22} />
    {works.map((work, i) => (
      <div key={`work_${i}`}>
        <h3>{work.title}</h3>
        {work.pictures.map((picture, i) => (
          <img
            key={`picture_${i}`}
            src={picture.src}
            alt={picture.alt}
            height="auto"
            width="auto"
          ></img>
        ))}
      </div>
    ))}
  </>
)

export default Gallery
