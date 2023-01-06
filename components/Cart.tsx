import * as React from 'react'

export const Cart = ({ start = 0, currency = 'EUR' }) => {
  const [sum, inc] = React.useState(start)
  return (
    <>
      Total: {sum} {currency}
      <br />
      <button onClick={() => inc((s) => s + 1)}>INC</button>
    </>
  )
}
