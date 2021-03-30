import React from 'react'
import useInputs from '../hooks/useInputs'
import { TodoDataIDType } from '../lib/type'

type TodoUpdateFormProps = {
  todo: TodoDataIDType
}

function TodoUpdateForm({ todo }: TodoUpdateFormProps): JSX.Element {
  const NAME = 'title'
  const initial = {
    [NAME]: todo.title,
  }
  const [form, onChange, reset] = useInputs(initial)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (/^\s*$/.test(form[NAME])) {
      reset()
      return
    }
    // addTodo(form[NAME])
    reset()
  }

  return (
    <section>
      <div className="form">
        <form action="/update" method="put" onSubmit={handleSubmit}>
          <div className="form-wrap">
            <input
              type="text"
              className="form__element"
              name={NAME}
              value={form[NAME]}
              onChange={onChange}
            />
          </div>
          <div className="button-area">
            <button type="button" className="button-base button-base--cancel">
              Cancel
            </button>
            <button type="button" className="button-base">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default TodoUpdateForm
