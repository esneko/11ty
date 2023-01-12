import { useState } from 'react'

export const Cart = ({ total = 0 }) => {
  const [sum, inc] = useState(total)
  return (
    <>
      Total: {sum}
      <br />
      <button onClick={() => inc((s) => s + 1)}>INC</button>
    </>
  )
}
