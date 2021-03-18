import { PostDataType } from '../api/posts'
import { PostThunkDispatchType } from '../containers/PostContainer'
import {
  GET_POSTS,
  GET_POST,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  PostsStateType,
  PostsActionType,
  PostActionType,
  StateObjectType,
} from '../modules/posts'

// 중복되는 코드를 간단히 해주기 위한 thunk 생성함수
// type PostsPromiseType = () => Promise<PostDataType[]>
// type PostPromiseType = (id: number) => Promise<PostDataType | Error>

export const createPromiseThunk = (
  type: typeof GET_POSTS | typeof GET_POST,
  promiseCreator: (param?: number) => Promise<PostDataType[]>
): ((param?: number | undefined) => (dispatch: PostThunkDispatchType) => Promise<void>) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  // thunk 생성 부분
  const thunkCreate = (param?: number) => async (dispatch: PostThunkDispatchType) => {
    // 액션 시작을 알리는 디스패치
    dispatch({ type })
    try {
      // api요청
      const payload = param ? await promiseCreator(param) : await promiseCreator()
      // 요청 성공시
      dispatch({
        type: SUCCESS,
        payload,
      })
    } catch (e) {
      // 요청 실패시
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      })
    }
  }
  return thunkCreate
}

export const createPromiseThunkById = (
  type: typeof GET_POST,
  promiseCreator: (id: number) => Promise<PostDataType | Error>
): ((id: number) => (dispatch: PostThunkDispatchType) => Promise<void>) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  const thunkCreate = (id: number) => async (dispatch: PostThunkDispatchType) => {
    dispatch({ type, meta: id.toString() })
    try {
      const payload = await promiseCreator(id)
      dispatch({ type: SUCCESS, payload, meta: id.toString() })
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true, meta: id.toString() })
    }
  }
  return thunkCreate
}

// 중복되는 코드를 간단히 해주기 위한 reducer
export const handleAsyncActions = (
  type: typeof GET_POSTS | typeof GET_POST,
  key: 'posts' | 'post',
  keepData: boolean | null = null
): ((state: PostsStateType, action: PostsActionType<unknown>) => PostsStateType) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  const reducer = (state: PostsStateType, action: PostsActionType<unknown>): PostsStateType => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: postsReducerUtils.loading(keepData && key === 'posts' ? state[key].data : null),
        }
      case SUCCESS:
        return {
          ...state,
          [key]:
            action.type === GET_POSTS_SUCCESS || action.type === GET_POST_SUCCESS
              ? postsReducerUtils.success(action.payload)
              : null,
        }
      case ERROR:
        return {
          ...state,
          [key]:
            (action.type === GET_POSTS_ERROR || action.type === GET_POST_ERROR) &&
            postsReducerUtils.error(action.payload),
        }
      default:
        return state
    }
  }
  return reducer
}

export const handleAsyncActionsById = (
  type: typeof GET_POST,
  key: 'post' = 'post',
  keepData: boolean
): ((state: PostsStateType, action: PostActionType<unknown>) => PostsStateType) => {
  // const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  const reducer = (state: PostsStateType, action: PostActionType<unknown>): PostsStateType => {
    console.log('action.meta', action.meta)
    const id = action.meta
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: postsReducerUtils.loading(
              keepData ? state[key][id] && state[key][id].data : null
            ),
          },
        }
      case GET_POST_SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: postsReducerUtils.success(action.payload),
          },
        }
      case GET_POST_ERROR: {
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: postsReducerUtils.error(action.payload),
          },
        }
      }
      default:
        return state
    }
  }
  return reducer
}

// state의 중복되는 코드를 간단히 해주기 위한 객체 메소드
export const postsReducerUtils = {
  initial: (): StateObjectType<unknown> => ({
    isLoading: false,
    data: null,
    error: null,
  }),
  loading: (data: PostDataType | PostDataType[] | null = null): StateObjectType<unknown> => ({
    isLoading: true,
    data,
    error: null,
  }),
  success: (data: PostDataType | PostDataType[]): StateObjectType<unknown> => ({
    isLoading: false,
    data,
    error: null,
  }),
  error: (error: unknown): StateObjectType<unknown> => ({
    isLoading: false,
    data: null,
    error,
  }),
}
