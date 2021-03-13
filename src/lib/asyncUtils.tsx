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
} from '../modules/posts'

// 중복되는 코드를 간단히 해주기 위한 thunk 생성함수
// type PostsPromiseType = () => Promise<PostDataType[]>
// type PostPromiseType = (id: number) => Promise<PostDataType | Error>

export const createPromiseThunk = <T extends Function>(
  type: typeof GET_POSTS | typeof GET_POST,
  promiseCreator: T,
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  // thunk 생성 부분
  const thunkCreate = <T extends number>(param?: T) => async (dispatch: PostThunkDispatchType) => {
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

// 중복되는 코드를 간단히 해주기 위한 reducer
export const handleAsyncActions = (
  type: typeof GET_POSTS | typeof GET_POST,
  key: 'posts' | 'post',
  keepData: boolean | null = null,
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  const reducer = (state: PostsStateType, action: PostsActionType) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: postsReducerUtils.loading(keepData ? state[key].data : null),
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
            action.type === GET_POSTS_ERROR || action.type === GET_POST_ERROR
              ? postsReducerUtils.error(action.payload)
              : null,
        }
      default:
        return state
    }
  }
  return reducer
}

// state의 중복되는 코드를 간단히 해주기 위한 객체 메소드

export const postsReducerUtils = {
  initial: () => ({
    isLoading: false,
    data: null,
    error: null,
  }),
  loading: (data: PostDataType | PostDataType[] | null = null) => ({
    isLoading: true,
    data,
    error: null,
  }),
  success: (data: PostDataType | PostDataType[]) => ({
    isLoading: false,
    data,
    error: null,
  }),
  error: (error: object) => ({
    isLoading: false,
    data: null,
    error,
  }),
}
