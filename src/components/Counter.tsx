import React from 'react'

type CounterProps = {
  number: number
  onIncrease: () => void
  onDecrease: () => void
}

function Counter({ number, onIncrease, onDecrease }: CounterProps) {
  return (
    <div>
      <h1>{number}</h1>
      <button type="button" onClick={onIncrease}>
        +
      </button>
      <button type="button" onClick={onDecrease}>
        -
      </button>
    </div>
  )
}

export default Counter
