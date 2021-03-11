import React, { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Counter from '../components/Counter'
import { CounterStateType, CounterActionType, increase, decrease } from '../modules/counter'

interface IRootStateType {
  counter: CounterStateType
}

function CounterContainer() {
  const number = useSelector((state: IRootStateType) => state.counter.number)
  const dispatch = useDispatch<Dispatch<CounterActionType>>()

  const onIncrease = () => dispatch(increase())
  const onDecrease = () => dispatch(decrease())

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
}

export default CounterContainer
