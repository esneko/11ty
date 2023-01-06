import * as React from 'react'
import price from '../_data/price.json'
import { Cart } from './Cart'

const Header = () => (
  <>
    <h1>Hello</h1>
    <Cart start={price.price} />
    <p>This demo will show you how to use:</p>
    <ol>
      <li>11ty</li>
      <li>Vite</li>
      <li>React</li>
      <li>Prisma</li>
    </ol>
  </>
)

export default Header
