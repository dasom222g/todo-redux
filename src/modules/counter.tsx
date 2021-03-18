import { ThunkDispatchType } from '../containers/CounterContainer'

export type CounterActionType = { type: typeof INCREASE } | { type: typeof DECREASE }
export type CounterStateType = {
  number: number
}

// action 타입 및 생성함수 정의

const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

export const increase = (): CounterActionType => ({
  type: INCREASE,
})
export const decrease = (): CounterActionType => ({
  type: DECREASE,
})

export const increaseAsync = () => (dispatch: ThunkDispatchType): void => {
  setTimeout(() => {
    console.log(typeof dispatch, dispatch)
    dispatch(increase())
  }, 1000)
}

export const decreaseAsync = () => (dispatch: ThunkDispatchType): void => {
  setTimeout(() => {
    dispatch(decrease())
  }, 1000)
}

const initialState = {
  number: 0,
}

//reducer 정의

export default function counter(
  state: CounterStateType = initialState,
  action: CounterActionType
): CounterStateType {
  switch (action.type) {
    case INCREASE:
      return { ...state, number: state.number + 1 }
    case DECREASE:
      return { ...state, number: state.number - 1 }
    default:
      return state
  }
}
