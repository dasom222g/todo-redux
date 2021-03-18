export {}
// import * as postsAPI from '../api/posts'
// import {
//   postsReducerUtils,
//   createPromiseThunk,
//   handleAsyncActions,
//   createPromiseThunkById,
//   handleAsyncActionsById,
// } from '../lib/asyncUtils'

// //action 타입 정의

// export const GET_POSTS = 'GET_POSTS'
// export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
// export const GET_POSTS_ERROR = 'GET_POSTS_ERROR'
// export const GET_POST = 'GET_POST'
// export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
// export const GET_POST_ERROR = 'GET_POST_ERROR'
// export const CLEAR_POST = 'CLEAR_POST'

// export type PostsActionType<U> =
//   | { type: typeof GET_POSTS }
//   | { type: typeof GET_POSTS_SUCCESS; payload: postsAPI.PostDataType[] }
//   | { type: typeof GET_POSTS_ERROR; payload: U }
//   | { type: typeof GET_POST; meta: string }
//   | { type: typeof GET_POST_SUCCESS; payload: postsAPI.PostDataType; meta: string }
//   | { type: typeof GET_POST_ERROR; payload: U; error: boolean; meta: string }
//   | { type: typeof CLEAR_POST }

// export type PostActionType<U> =
//   | { type: typeof GET_POST; meta: string }
//   | { type: typeof GET_POST_SUCCESS; payload: postsAPI.PostDataType; meta: string }
//   | { type: typeof GET_POST_ERROR; payload: U; error: boolean; meta: string }

// export type StateObjectType<T, U> = {
//   isLoading: boolean
//   data: T | null
//   error: U | null
// }

// export type PostsStateType = {
//   posts: StateObjectType<postsAPI.PostDataType[], unknown>
//   post: {
//     [key: string]: StateObjectType<postsAPI.PostDataType, unknown>
//   }
// }

// // thunk 생성 함수
// /*
// export const getPosts = () => async (dispatch: ) => {
//   // 요청이 시작됨
//   dispatch({ type: GET_POSTS })
//   // api 호출
//   try {
//     const payload = await postsAPI.getPosts()
//     // 성공시
//     dispatch({
//       type: GET_POSTS_SUCCESS,
//       payload,
//     })
//   } catch (e) {
//     // 실패시
//     dispatch({
//       type: GET_POSTS_ERROR,
//       payload: e,
//       error: false,
//     })
//   }
// }

// export const getPost = (id: number) => async (dispatch: ) => {
//   // 요청이 시작됨
//   dispatch({ type: GET_POST })
//   // api 호출
//   try {
//     const payload = await postsAPI.getPost(id)
//     // 성공시
//     dispatch({
//       type: GET_POST,
//       payload,
//     })
//   } catch (e) {
//     // 실패시
//     dispatch({
//       type: GET_POST_ERROR,
//       playload: e,
//       error: true,
//     })
//   }
// }
// */

// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts) // thunk함수가 리턴됨
// // export const getPost = createPromiseThunk(GET_POST, postsAPI.getPost)
// // byId타입으로 수정
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPost)

// // action 생성 함수
// export const clearPost = () => ({ type: CLEAR_POST })

// // reducer

// const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true) // reducer함수를 리턴
// // const getPostReducer = handleAsyncActions(GET_POST, 'post') // reducer함수를 리턴

// // byId 타입으로 수정
// const getPostReducer = handleAsyncActionsById(GET_POST, 'post', true)

// const inintialState = {
//   posts: postsReducerUtils.initial(),
//   post: {},
// }

// export default function posts(state: PostsStateType = inintialState, action: PostsActionType<unknown>): PostsStateType {
//   switch (action.type) {
//     case GET_POSTS:
//     case GET_POSTS_SUCCESS:
//     case GET_POSTS_ERROR:
//       // 위 세가지 경우일때 아래 reducer함수를 실행시켜 변경된 state값을 리턴함
//       return getPostsReducer(state, action)
//     case GET_POST:
//     case GET_POST_SUCCESS:
//     case GET_POST_ERROR:
//       return getPostReducer(state, action)
//     case CLEAR_POST:
//       return {
//         ...state,
//         post: postsReducerUtils.initial(),
//       }
//     default:
//       return state
//   }
// }
