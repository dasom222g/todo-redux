import React from 'react'
import { TodoDataIDType } from '../lib/type'
import { GoCheck } from 'react-icons/go'
import { RiCloseCircleLine } from 'react-icons/ri'
// import { TiEdit } from 'react-icons/ti'

type TodoItemProps = {
  todo: TodoDataIDType
}

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const handleChange = (): void => {
    console.log('event 올릴껍니다')
  }

  const handleClick = (): void => {
    console.log('delete~~~')
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
          <button type="button" className="todo__item-button">
            <RiCloseCircleLine className="todo__item-button-icon delete" onClick={handleClick} />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoItem
