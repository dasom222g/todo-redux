import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Counter from '../components/Counter'
import {
  CounterStateType,
  increaseAsync,
  decreaseAsync,
  CounterActionType,
} from '../modules/counter'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

export type ThunkDispatchType = ThunkDispatch<CounterStateType, CounterActionType, AnyAction>

interface IRootStateType {
  counter: CounterStateType
}

function CounterContainer(): JSX.Element {
  const number = useSelector((state: IRootStateType) => state.counter.number)
  const dispatch: ThunkDispatchType = useDispatch()

  const onIncrease = (): void => dispatch(increaseAsync())
  const onDecrease = (): void => dispatch(decreaseAsync())

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
}

export default CounterContainer
