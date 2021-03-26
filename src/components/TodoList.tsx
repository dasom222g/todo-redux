import React from 'react'
import { NormalType, TodoDataIDType } from '../lib/type'
import TodoItem from './TodoItem'

type TodoListProps = {
  todos: NormalType
  removeTodo: (id: string) => void
  completeTodo: (id: string, changeItem: TodoDataIDType) => void
}

function TodoList({ todos, removeTodo, completeTodo }: TodoListProps): JSX.Element {
  const { allIds, byId } = todos

  return (
    <section>
      <ul className="todo__list">
        {allIds.map((id) => (
          <TodoItem todo={byId[id]} key={id} removeTodo={removeTodo} completeTodo={completeTodo} />
        ))}
      </ul>
    </section>
  )
}

export default TodoList
