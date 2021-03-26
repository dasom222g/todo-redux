import { ActionType, NormalType, StateType, ByIdType, TodoDataIDType } from '../lib/type'
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR,
  ADD_TODO_ERROR,
  ADD_TODO_SUCCESS,
  // GET_TODO,
  // GET_TODO_SUCCESS,
  // GET_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
} from '../actions/index'
import produce from 'immer'

const initialState: StateType = {
  isLoading: false,
  payload: null,
  error: null,
}

const dataInitial: NormalType = {
  allIds: [],
  byId: {},
}

const getData = (payload: TodoDataIDType[] | null): NormalType | null => {
  if (payload) {
    const allIds = payload.map((item: TodoDataIDType) => item.id.toString())
    const byId = payload.reduce((acc: ByIdType, current: TodoDataIDType) => {
      if (current.id) acc[current.id] = current
      return acc
    }, {})
    return {
      allIds,
      byId,
    }
  } else return dataInitial
}

const addTodo = (payload: NormalType, newItem: TodoDataIDType): NormalType => {
  const { allIds, byId } = payload
  const id = newItem.id.toString()
  return {
    ...payload,
    allIds: [...allIds, id],
    byId: {
      ...byId,
      [id]: newItem,
    },
  }
}

const updateTodo = (payload: NormalType, changeItem: TodoDataIDType, id: string): NormalType => {
  const byId = produce(payload.byId, (draft) => {
    draft[id] = changeItem
  })
  return {
    ...payload,
    byId,
  }
}

const removeTodo = (payload: NormalType, id: string): NormalType => {
  const result = produce(payload, (draft) => {
    const allIds = payload.allIds.filter((itemId) => itemId !== id)
    draft.allIds = allIds
    delete draft.byId[id]
  })
  console.log('result', result)
  return result
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
    case ADD_TODO_SUCCESS:
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.payload = state.payload && addTodo(state.payload, action.payload)
        draft.error = null
      })
    case DELETE_TODO_SUCCESS:
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.payload = state.payload && removeTodo(state.payload, action.id)
        draft.error = null
      })
    case UPDATE_TODO_SUCCESS:
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.payload = state.payload && updateTodo(state.payload, action.payload, action.id)
        draft.error = null
      })
    case GET_TODOS_ERROR:
    case ADD_TODO_ERROR:
    case UPDATE_TODO_ERROR:
    case DELETE_TODO_ERROR:
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.payload = null
        draft.error = action.error
      })
    default:
      return state
  }
}
