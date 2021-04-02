import { rest } from 'msw'
import { TodoDataIDType } from '../lib/type'
// import { TodoDataIDType } from '../lib/type'

const KEY = 'TODO_LIST'

export const handlers = [
  rest.get('/api/todos', (req, res, ctx) => {
    const store = localStorage.getItem(KEY)

    if (store) return res(ctx.status(200), ctx.json(JSON.parse(store)))
    else return res(ctx.status(200), ctx.json(null))
  }),
  rest.get('/api/todos/:itemId', (req, res, ctx) => {
    const store = localStorage.getItem(KEY)
    const id = Number(req.params.itemId)
    const target = store && JSON.parse(store).find((item: TodoDataIDType) => item.id === id)
    if (store && !target) return res(ctx.status(404), ctx.body('Not found'))
    else return res(ctx.status(200), ctx.json(target))
  }),
  rest.post('/api/todos', (req, res, ctx) => {
    if (typeof req.body !== 'string') return res(ctx.status(422), ctx.body('Error, not string'))

    const store = localStorage.getItem(KEY)
    const newItem = typeof req.body === 'string' && {
      id: Math.floor(Math.random() * 99999),
      ...JSON.parse(req.body),
    }

    store !== null
      ? localStorage.setItem(KEY, JSON.stringify([...JSON.parse(store), newItem]))
      : localStorage.setItem(KEY, JSON.stringify([newItem]))

    return res(ctx.status(200), ctx.json(newItem))
  }),
  rest.put('/api/todos/:itemId', (req, res, ctx) => {
    const itemId = Number(req.params.itemId)
    const content = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const { id, title, descritption, isComplete } = content
    const store = localStorage.getItem(KEY)
    if (store) {
      const parseStore = JSON.parse(store)
      console.log('put~~')
      const result = parseStore.map((item: TodoDataIDType) => {
        if (item.id === itemId) {
          return {
            ...item,
            id,
            title,
            descritption,
            isComplete,
          }
        } else {
          return { ...item }
        }
      })
      console.log('result', result)
      localStorage.setItem(KEY, JSON.stringify(result))

      return res(
        ctx.status(200),
        ctx.json(result.find((item: TodoDataIDType) => item.id === itemId)),
      )
    } else return res(ctx.status(404), ctx.body('Not found'))
  }),
  rest.delete('/api/todos/:itemId', (req, res, ctx) => {
    const id = Number(req.params.itemId)
    const store = localStorage.getItem(KEY)

    if (store) {
      const result = JSON.parse(store).filter((item: TodoDataIDType) => item.id !== id)
      result.length
        ? localStorage.setItem(KEY, JSON.stringify(result))
        : localStorage.removeItem(KEY)
      return res(
        ctx.status(200),
        ctx.json(JSON.parse(store).find((item: TodoDataIDType) => item.id === id)),
      )
    } else return res(ctx.status(404), ctx.body('Not found'))
  }),
]
