import { Dispatch } from 'react'
import { header, sleep } from '../lib/todoUtils'
import { ActionType, TodoDataIDType } from '../lib/type'

export const GET_TODOS = 'GET_TODOS'
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS'
export const GET_TODOS_ERROR = 'GET_TODOS_ERROR'
export const GET_TODO = 'GET_TODO'
export const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS'
export const GET_TODO_ERROR = 'GET_TODO_ERROR'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
export const UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR'

// thunk생성 함수

export const postTodo = (title: string) => async (
  dispatch: Dispatch<ActionType>,
): Promise<void> => {
  const newItem = {
    title,
  }
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newItem),
    })
    const result: TodoDataIDType = await response.json()
    dispatch({ type: ADD_TODO_SUCCESS, payload: result })
  } catch (error) {
    dispatch({ type: ADD_TODO_ERROR, error })
    // console.error(error)
  }
}

export const fetchTodos = () => async (dispatch: Dispatch<ActionType>): Promise<void> => {
  dispatch({ type: GET_TODOS })
  try {
    await sleep(500)
    const response = await fetch('/api/todos', header)
    const result: TodoDataIDType[] = await response.json()
    dispatch({ type: GET_TODOS_SUCCESS, payload: result })
  } catch (error) {
    dispatch({ type: GET_TODOS_ERROR, error })
    // console.error(error)
  }
}

// export const deleteTodo = (id: string) => async(dispatch: Dispatch<ActionType>): Promise<void> => {
//   try {

//   } catch(error) {

//   }
// }
