export const header = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

export const sleep = (ms: number): Promise<() => void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
