import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, fetchTodos, postTodo, putTodo } from '../actions'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { IRootState, ThunkDispatchType, TodoDataIDType } from '../lib/type'

export default function TodoHome(): JSX.Element | null {
  const { isLoading, payload: todos, error } = useSelector((state: IRootState) => state.todos)
  const dispatch: ThunkDispatchType = useDispatch()

  const addTodo = (title: string): void => {
    const sameArr = todos && todos.allIds.filter((id) => todos.byId[id].title === title)
    if (todos && sameArr?.length) return
    dispatch(postTodo(title))
  }

  const completeTodo = (id: string, changeItem: TodoDataIDType): void => {
    dispatch(putTodo(id, changeItem))
  }

  const removeTodo = (id: string): void => {
    dispatch(deleteTodo(id))
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (isLoading) return <div>Loading..</div>
  if (error) return <div>Error..</div>
  if (!todos) return null

  return (
    <div className="todo">
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} completeTodo={completeTodo} />
    </div>
  )
}
