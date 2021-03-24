import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR,
  GET_TODO,
  GET_TODO_SUCCESS,
  GET_TODO_ERROR,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
} from '../actions/index'

export type TodoDataType = {
  title: string
  description?: string
  isComplete?: boolean
}

export type TodoDataIDType = {
  id: number
  title: string
  description?: string
  isComplete?: boolean
}

export type ByIdType = {
  [key: string]: TodoDataType
}

export type NormalType = {
  allIds: string[]
  byId: ByIdType
}
export type ActionType =
  | { type: typeof ADD_TODO_SUCCESS; payload: TodoDataType }
  | { type: typeof ADD_TODO_ERROR; error: Error }
  | { type: typeof DELETE_TODO_SUCCESS; id: string }
  | { type: typeof DELETE_TODO_ERROR; error: Error }
  | { type: typeof UPDATE_TODO_SUCCESS; payload: TodoDataIDType }
  | { type: typeof UPDATE_TODO_ERROR; error: Error }
  | { type: typeof GET_TODOS }
  | { type: typeof GET_TODOS_SUCCESS; payload: TodoDataIDType[] }
  | { type: typeof GET_TODOS_ERROR; error: Error }
  | { type: typeof GET_TODO }
  | { type: typeof GET_TODO_SUCCESS; payload: TodoDataIDType }
  | { type: typeof GET_TODO_ERROR; error: Error }

export type StateType = {
  isLoading: boolean
  payload: NormalType | null
  error: Error | null
}
