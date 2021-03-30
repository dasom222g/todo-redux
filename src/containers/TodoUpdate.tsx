import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TodoUpdateForm from '../components/TodoUpdateForm'
import { IRootState } from '../lib/type'

function TodoUpdate(): JSX.Element {
  const { isLoading, payload: data, error } = useSelector((state: IRootState) => state.todos)
  // const dispatch = useDispatch<ThunkDispatchType>()
  const todoId = useParams<{ itemId: string }>().itemId

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  if (!data) return <></>

  return (
    <div className="todo">
      <header>
        <h2 className="todo__title">What’s the Plan for Today?</h2>
      </header>
      <TodoUpdateForm todo={data.byId[todoId]} />
    </div>
  )
}

export default TodoUpdate
