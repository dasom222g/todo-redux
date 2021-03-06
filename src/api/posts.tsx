export type PostDataType = {
  id: number
  title: string
  body: string
}

const sleep = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms))

const posts: PostDataType[] = [
  {
    id: 1,
    title: 'Redux-logger',
    body: 'action과 이전상태값, 이후 상태값을 콘솔에 찍어주는 미들웨어',
  },
  {
    id: 2,
    title: 'Redux-thunk',
    body: '비동기작없을 처리해주는 미들웨어',
  },
  {
    id: 3,
    title: 'Redux-saga',
    body: '비동기작없을 처리해주는 미들웨어2',
  },
]

export const getPosts = async (): Promise<PostDataType[]> => {
  await sleep(500)
  return posts
}

export const getPost = async (id: number): Promise<PostDataType | Error> => {
  await sleep(500)
  const data = posts.find((item) => item.id === id)
  return data ? data : new Error() // 객체로 리턴
}
