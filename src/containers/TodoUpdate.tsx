import React, { useEffect } from 'react'
import Loader from 'react-loader-spinner'
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
  if (error) return <div>Error...</div>

  return (
    <>
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      {isLoading ? (
        <div className="loading">
          <div className="loading">
            <Loader height="100" timeout={3000} type="Circles" visible={true} width={80} />
          </div>
        </div>
      ) : (
        data && <TodoUpdateForm todo={data.byId[todoId]} updateTodo={updateTodo} />
      )}
    </>
  )
}

export default TodoUpdate
