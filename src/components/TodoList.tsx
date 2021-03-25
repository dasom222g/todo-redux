import React from 'react'
import { NormalType } from '../lib/type'
import TodoItem from './TodoItem'

type TodoListProps = {
  todos: NormalType
}

function TodoList({ todos }: TodoListProps): JSX.Element {
  const { allIds, byId } = todos

  return (
    <section>
      <ul className="todo__list">
        {allIds.map((id) => (
          <TodoItem todo={byId[id]} key={id} />
        ))}
      </ul>
    </section>
  )
}

export default TodoList
