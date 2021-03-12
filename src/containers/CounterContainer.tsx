import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Counter from '../components/Counter'
import { CounterStateType, increaseAsync, decrease } from '../modules/counter'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

export type ThunkDispatchType = ThunkDispatch<CounterStateType, any, AnyAction>

interface IRootStateType {
  counter: CounterStateType
}

function CounterContainer() {
  const number = useSelector((state: IRootStateType) => state.counter.number)
  const dispatch: ThunkDispatchType = useDispatch()

  const onIncrease = () => dispatch(increaseAsync())
  const onDecrease = () => dispatch(decrease())

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
}

export default CounterContainer
