import React, { useState } from 'react'
import useRouter from 'use-react-router'
import useInputs from '../hooks/useInputs'
import { TodoDataIDType } from '../lib/type'
import TodoDetailForm from './TodoDetailForm'

type TodoUpdateFormProps = {
  todo: TodoDataIDType
  updateTodo: (changeItem: TodoDataIDType) => void
}

function TodoUpdateForm({ todo, updateTodo }: TodoUpdateFormProps): JSX.Element {
  const { history } = useRouter()

  const { title: initialTitle, description: initialDescription } = todo

  const initial = {
    title: initialTitle,
    description: initialDescription,
  }
  const [form, onChange, reset] = useInputs(initial)
  const [description, setDescription] = useState(initialDescription)
  const { title } = form

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (/^\s*$/.test(title)) {
      reset()
      return
    }
    const changeItem: TodoDataIDType = {
      ...todo,
      title: title.trim(),
      description: description ? description.trim() : '',
    }
    updateTodo(changeItem)
    reset()
    goHome()
  }

  const updateNote = (text: string): void => {
    // if (/^\s*$/.test(title)) {
    //   reset()
    //   return
    // }
    setDescription(text)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e)
  }

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    e.preventDefault()
  }

  const goHome = (): void => {
    history.push('/')
  }

  return (
    <section>
      <div className="form">
        <form action="/update" method="put" onSubmit={handleSubmit}>
          <div className="form-wrap">
            <input
              type="text"
              className="form__element"
              name="title"
              value={title}
              onChange={handleChange}
              onKeyPress={handleKeypress}
            />
          </div>
          <TodoDetailForm todo={todo} updateNote={updateNote} />
          <div className="button-area">
            <button type="button" className="button-base button-base--cancel" onClick={goHome}>
              Cancel
            </button>
            <button type="submit" className="button-base">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default TodoUpdateForm
