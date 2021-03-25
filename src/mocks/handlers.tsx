import { rest } from 'msw'
// import { TodoDataIDType } from '../lib/type'

const KEY = 'TODO_LIST'

export const handlers = [
  rest.get('/api/todos', (req, res, ctx) => {
    const store = localStorage.getItem(KEY)

    if (store) return res(ctx.status(200), ctx.json(JSON.parse(store)))
    else return res(ctx.status(200), ctx.json(null))
  }),
  rest.get('/api/todos.:itemId', (req, res, ctx) => {
    const store = localStorage.getItem(KEY)
    const id = Number(req.params.itemId)
    const target = store && JSON.parse(store).find((item: { id: number }) => item.id === id)

    if (store && !target) return res(ctx.status(404), ctx.body('Not found'))
    if (store) return res(ctx.status(200), ctx.json(JSON.parse(store)))
    else return res(ctx.status(200), ctx.json(null))
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
]
