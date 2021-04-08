import React from 'react'
import { TodoDataIDType } from '../lib/type'
import { GoCheck } from 'react-icons/go'
import { RiCloseCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { TiEdit } from 'react-icons/ti'

type TodoItemProps = {
  todo: TodoDataIDType
  removeTodo: (id: string) => void
  completeTodo: (id: string, changeItem: TodoDataIDType) => void
}

function TodoItem({ todo, removeTodo, completeTodo }: TodoItemProps): JSX.Element {
  const handleChange = (): void => {
    const id = todo.id.toString()
    const changeItem = {
      ...todo,
      isComplete: !todo.isComplete,
    }
    completeTodo(id, changeItem)
  }

  return (
    <li className="todo__item" key={todo.id}>
      <div className={todo.isComplete ? 'todo__content complete' : 'todo__content'}>
        <div className="todo__item-check">
          <label>
            <input
              type="checkbox"
              checked={todo.isComplete ? true : false}
              onChange={handleChange}
            />
            <i className="todo__item-check-icon"></i>
            <GoCheck className="todo__item-check-icon complete" />
            <span className="todo__content-text">{todo.title}</span>
          </label>
        </div>
        <div className="todo__item-buttonarea">
          <Link to={`update/${todo.id}`}>
            <TiEdit />
          </Link>
          <button type="button" className="todo__item-button">
            <RiCloseCircleLine
              className="todo__item-button-icon delete"
              onClick={() => removeTodo(todo.id.toString())}
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoItem
