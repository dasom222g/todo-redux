import {
  ADD_TODO_ERROR,
  ADD_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  GET_TODO,
  GET_TODOS,
  GET_TODOS_ERROR,
  GET_TODOS_SUCCESS,
  GET_TODO_ERROR,
  GET_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  UPDATE_TODO_SUCCESS,
} from '../actions/index'

type TodoType = {
  id?: number
  title: string
  description?: string
  isComplete?: boolean
}

type ByIdType = {
  [key: string]: TodoType
}

export type NormalType = {
  allIds: string[]
  byId: ByIdType
}
export type ActionType =
  | { type: typeof ADD_TODO_SUCCESS; payload: TodoType }
  | { type: typeof ADD_TODO_ERROR; error: Error }
  | { type: typeof DELETE_TODO_SUCCESS; id: string }
  | { type: typeof DELETE_TODO_ERROR; error: Error }
  | { type: typeof UPDATE_TODO_SUCCESS; payload: TodoType }
  | { type: typeof UPDATE_TODO_ERROR; error: Error }
  | { type: typeof GET_TODOS }
  | { type: typeof GET_TODOS_SUCCESS; payload: TodoType[] }
  | { type: typeof GET_TODOS_ERROR; error: Error }
  | { type: typeof GET_TODO }
  | { type: typeof GET_TODO_SUCCESS; payload: TodoType }
  | { type: typeof GET_TODO_ERROR; error: Error }
