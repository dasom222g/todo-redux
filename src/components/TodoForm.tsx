import React from 'react'
import useInputs from '../hooks/useInputs'

type TodoFormProps = {
  addTodo: (title: string) => void
}

function TodoForm({ addTodo }: TodoFormProps): JSX.Element {
  const NAME = 'title'
  const initial = {
    [NAME]: '',
  }
  const [form, onChange, reset] = useInputs(initial)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (/^\s*$/.test(form[NAME])) {
      reset()
      return
    }
    addTodo(form[NAME])
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
              name={NAME}
              value={form[NAME]}
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
