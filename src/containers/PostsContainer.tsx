import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { PostDataType } from '../api/posts'

export type PostThunkDispatchType = ThunkDispatch<PostDataType, any, AnyAction>
