import React from 'react'
import useInputs from '../hooks/useInputs'

type TodoFormProps = {
  addTodo: (title: string) => void
}

function TodoForm({ addTodo }: TodoFormProps): JSX.Element {
  const initial = {
    title: '',
  }
  const [form, onChange, reset] = useInputs(initial)
  const { title } = form

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (/^\s*$/.test(title)) {
      reset()
      return
    }
    addTodo(title)
    reset()
  }

  return (
    <section>
      <div className="form">
        <form action="/create" method="post" onSubmit={handleSubmit}>
          <div className="form-wrap">
            <input
              type="text"
              className="form__element"
              name="title"
              value={title}
              onChange={onChange}
            />
            <button type="submit" className="form__button">
              Add
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default TodoForm
