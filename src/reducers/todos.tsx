import { ActionType, NormalType, StateType, ByIdType, TodoDataIDType } from '../lib/type'
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR,
  // GET_TODO,
  // GET_TODO_SUCCESS,
  // GET_TODO_ERROR,
  // ADD_TODO_SUCCESS,
  // ADD_TODO_ERROR,
  // DELETE_TODO_SUCCESS,
  // DELETE_TODO_ERROR,
  // UPDATE_TODO_SUCCESS,
  // UPDATE_TODO_ERROR,
} from '../actions/index'
import produce from 'immer'

const initialState: StateType = {
  isLoading: false,
  payload: null,
  error: null,
}

const getData = (payload: TodoDataIDType[]): NormalType => {
  const allIds = payload.map((item: TodoDataIDType) => item.id.toString())
  const byId = payload.reduce((acc: ByIdType, current: TodoDataIDType) => {
    if (current.id) acc[current.id] = current
    return acc
  }, {})
  return {
    allIds,
    byId,
  }
}

export const todos = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case GET_TODOS:
      return produce(state, (draft) => {
        draft.isLoading = true
        draft.payload = null
        draft.error = null
      })
    case GET_TODOS_SUCCESS:
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.payload = getData(action.payload)
        draft.error = null
      })
    case GET_TODOS_ERROR:
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.payload = null
        draft.error = action.error
      })
    default:
      return state
  }
}
