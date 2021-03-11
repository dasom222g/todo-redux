import { rest } from 'msw'

const KEY = 'TODOS'

export const handlers = [
  rest.get('api/todos', (req, res, ctx) => {
    const store = localStorage.getItem(KEY)
    console.log('store', store)
    return res(
      ctx.status(200),
      // ctx.json()
    )
  }),
]
