import React, { useEffect } from 'react'
import useInputs from '../hooks/useInputs'
import { TodoDataIDType } from '../lib/type'

type TodoDetailFormProps = {
  todo: TodoDataIDType
  updateNote: (text: string) => void
}

function TodoDetailForm({ todo, updateNote }: TodoDetailFormProps): JSX.Element {
  const NAME = 'description'
  const initial = {
    [NAME]: todo.description ? todo.description : '',
  }
  const [form, onChange] = useInputs(initial)

  useEffect(() => {
    updateNote(form[NAME])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  return (
    <div className="todo__detail-desc">
      <textarea
        placeholder="Write a note.."
        name="description"
        value={form[NAME]}
        onChange={onChange}></textarea>
    </div>
  )
}

export default TodoDetailForm
