import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchTodo, putTodo } from '../actions'
import TodoUpdateForm from '../components/TodoUpdateForm'
import { IRootState, ThunkDispatchType, TodoDataIDType } from '../lib/type'

function TodoUpdate(): JSX.Element {
  const { isLoading, payload: data, error } = useSelector((state: IRootState) => state.todos)
  const dispatch: ThunkDispatchType = useDispatch()
  const todoId = useParams<{ itemId: string }>().itemId
  const updateTodo = (changeItem: TodoDataIDType): void => {
    dispatch(putTodo(todoId, changeItem))
  }

  useEffect(() => {
    dispatch(fetchTodo(todoId))
  }, [dispatch, todoId])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  if (!data) return <></>

  return (
    <div className="todo">
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      <TodoUpdateForm todo={data.byId[todoId]} updateTodo={updateTodo} />
    </div>
  )
}

export default TodoUpdate
