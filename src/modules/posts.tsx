import * as postsAPI from '../api/posts'
import { PostThunkDispatchType } from '../containers/PostContainer'
import { postsReducerUtils, createPromiseThunk, handleAsyncActions } from '../lib/asyncUtils'

//action 타입 정의

export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR'
export const GET_POST = 'GET_POST'
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const GET_POST_ERROR = 'GET_POST_ERROR'
export const CLEAR_POST = 'CLEAR_POST'

export type PostsActionType =
  | { type: typeof GET_POSTS }
  | { type: typeof GET_POSTS_SUCCESS; payload: postsAPI.PostDataType[] }
  | { type: typeof GET_POSTS_ERROR; payload: object }
  | { type: typeof GET_POST; meta: string }
  | { type: typeof GET_POST_SUCCESS; payload: postsAPI.PostDataType; meta: string }
  | { type: typeof GET_POST_ERROR; payload: object; error: boolean; meta: string }
  | { type: typeof CLEAR_POST }

export type PostActionType =
  | { type: typeof GET_POST; meta: string }
  | { type: typeof GET_POST_SUCCESS; payload: postsAPI.PostDataType; meta: string }
  | { type: typeof GET_POST_ERROR; payload: object; error: boolean; meta: string }

type StateObjectType<T> = {
  isLoading: boolean
  data: T | null
  error: object | null
}

export type PostsStateType = {
  posts: StateObjectType<postsAPI.PostDataType[]>
  post: {
    [key: string]: StateObjectType<postsAPI.PostDataType>
  }
}

// thunk 생성 함수
/*
export const getPosts = () => async (dispatch: PostThunkDispatchType) => {
  // 요청이 시작됨
  dispatch({ type: GET_POSTS })
  // api 호출
  try {
    const payload = await postsAPI.getPosts()
    // 성공시
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload,
    })
  } catch (e) {
    // 실패시
    dispatch({
      type: GET_POSTS_ERROR,
      payload: e,
      error: false,
    })
  }
}

export const getPost = (id: number) => async (dispatch: PostThunkDispatchType) => {
  // 요청이 시작됨
  dispatch({ type: GET_POST })
  // api 호출
  try {
    const payload = await postsAPI.getPost(id)
    // 성공시
    dispatch({
      type: GET_POST,
      payload,
    })
  } catch (e) {
    // 실패시
    dispatch({
      type: GET_POST_ERROR,
      playload: e,
      error: true,
    })
  }
}
*/

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)
// export const getPost = createPromiseThunk(GET_POST, postsAPI.getPost)
// byId타입으로 수정
export const getPost = (id: number) => async (dispatch: PostThunkDispatchType) => {
  dispatch({ type: GET_POST, meta: id.toString() })
  try {
    const payload = await postsAPI.getPost(id)
    dispatch({ type: GET_POST_SUCCESS, payload, meta: id.toString() })
  } catch (e) {
    dispatch({ type: GET_POST_ERROR, payload: e, error: true, meta: id.toString() })
  }
}

// action 생성 함수
export const clearPost = () => ({ type: CLEAR_POST })

// reducer

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true) // reducer함수를 리턴
// const getPostReducer = handleAsyncActions(GET_POST, 'post') // reducer함수를 리턴

// byId 타입으로 수정
const getPostReducer = (state: PostsStateType, action: PostActionType) => {
  const id = action.meta
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: postsReducerUtils.loading(state.post[id] ? state.post[id].data : null),
        },
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: postsReducerUtils.success(action.payload),
        },
      }
    case GET_POST_ERROR: {
      return {
        ...state,
        post: {
          ...state.post,
          [id]: postsReducerUtils.error(action.payload),
        },
      }
    }
    default:
      return state
  }
}

const inintialState = {
  posts: postsReducerUtils.initial(),
  post: {},
}

export default function posts(state: PostsStateType = inintialState, action: PostsActionType) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      // 위 세가지 경우일때 아래 reducer함수를 실행시켜 변경된 state값을 리턴함
      return getPostsReducer(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action)
    case CLEAR_POST:
      return {
        ...state,
        post: postsReducerUtils.initial(),
      }
    default:
      return state
  }
}
